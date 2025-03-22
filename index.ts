import { checkbox, input } from '@inquirer/prompts';
import JavaScriptObfuscator from 'javascript-obfuscator';
import { statSync } from 'node:fs';

import { readdir, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';
import ora from 'ora';

async function listDirectory(dirPath: string) {
	const files = (await readdir(dirPath, { recursive: true })) as string[];
	return await Promise.all(
		files.map(async (file) => {
			const filePath = join(dirPath, file);
			const fileStat = await stat(filePath);
			return {
				name: file,
				type: fileStat.isDirectory() ? 'directory' : 'file',
				size: fileStat.size,
				path: filePath,
				isDirectory: fileStat.isDirectory(),
			};
		})
	);
}

async function obfuscateFile(filePath: string) {
	try {
		const fileExt = extname(filePath);
		if (!['.js', '.ts'].includes(fileExt)) {
			console.log(`无法混淆 ${filePath}（仅支持 .js 和 .ts 文件）`);
			return;
		}

		// console.log(`🔄  正在混淆: ${filePath}`);
		const code = await Bun.file(filePath).text();
		const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
			compact: true,
			controlFlowFlattening: true,
			selfDefending: true,
			stringArrayThreshold: 0.75,
		}).getObfuscatedCode();

		const outputPath = filePath; //同名替换
		await Bun.file(outputPath).write(obfuscatedCode);
		// console.log(`✅  混淆完成: ${outputPath}`);
	} catch (error) {
		// console.error(`❌  混淆失败: ${error}`);
	}
}

async function main() {
	const dirPath = await input({
		message: '请输入混淆路径:',
		required: true,
		validate: (v) => statSync(v).isDirectory(),
	});
	const files = await listDirectory(dirPath);
	const choices = files
		.filter((v) => !v.isDirectory && extname(v.path) === '.js')
		.map((v) => ({
			name: v.name,
			value: v.path,
		}));
	const selectedFiles = await checkbox({
		message: '请选择需要混淆的js文件',
		required: true,
		choices,
	});
	const total = selectedFiles.length;
	const spinner = ora({
		prefixText: `[0/${total}]`,
		text: `开始混淆文件 (0/${selectedFiles.length})`,
		suffixText: `0%`,
	}).start();
	let completed = 0;

	for (const filePath of selectedFiles) {
		completed++;
		spinner.prefixText = `[${completed}/${total}]`;
		spinner.text = `开始混淆文件-${filePath} (${completed}/${selectedFiles.length})`;
		await obfuscateFile(filePath);
		spinner.suffixText = `${Math.floor(completed / total) * 100}%`;
	}
	spinner.succeed(`所有文件处理完成 (${completed}/${selectedFiles.length})`);
}

main();

# JS Obfuscator CLI

## 中文

---

### 概述

JS Obfuscator CLI 是一个基于 Bun 构建的命令行工具，用于交互式混淆 JavaScript 文件。用户可以从目录中选择文件，并使用 javascript-obfuscator 库进行混淆，同时通过 ora 提供优雅的进度指示。

### 功能

- **交互式文件选择**：通过复选框界面选择要混淆的 .js 文件。
- **代码混淆**：应用高级混淆技术（如控制流平坦化、自我防御）保护代码。
- **跨平台构建**：编译为 Windows、macOS 和 Linux 的独立可执行文件。
- **进度反馈**：实时显示带有旋转动画和详细状态的进度。

### 前置条件

- 安装 - [Bun](https://bun.sh/) installed (`curl -fsSL https://bun.sh/install | bash`).。

### 安装

1. 克隆仓库：

```bash
git clone https://github.com/your-username/js-obfuscator-cli.git
cd js-obfuscator-cli
```

2. 安装依赖：

```bash
bun install
```

### 使用方法

#### 本地运行

##### 使用 Bun 运行工具：

```bash
bun run start
```

- 输入包含 .js 文件的目录路径。
- 从交互式提示中选择要混淆的文件。
- 查看带有进度旋转动画的混淆过程。

##### 构建可执行文件

编译为独立二进制文件：

```bash
# 为所有平台构建
bun run build
```

或为特定平台构建：

```bash
bun run build:win # Windows (.exe)
bun run build:mac # macOS
bun run build:linux # Linux
```

构建完成后，可执行文件（obfuscator.exe、obfuscator-macos、obfuscator-linux）将出现在项目根目录。

### 脚本

```json
"scripts": {
"start": "bun index.ts",
"build": "concurrently --names \"win,mac,linux\" \"bun run build:win\" \"bun run build:mac\" \"bun run build:linux\"",
"build:win": "bun build --compile --minify --target bun-windows-x64 ./index.ts --outfile obfuscator.exe",
"build:mac": "bun build --compile --minify --target bun-darwin-x64 ./index.ts --outfile obfuscator-macos",
"build:linux": "bun build --compile --minify --target bun-linux-x64 ./index.ts --outfile obfuscator-linux"
}
```

### 依赖

- @inquirer/prompts
- javascript-obfuscator
- ora
- concurrently（开发依赖）

### 贡献

1. Fork 本仓库。
2. 创建功能分支（git checkout -b feature/new-feature）。
3. 提交更改（git commit -m "添加新功能"）。
4. 推送分支（git push origin feature/new-feature）。
5. 提交 Pull Request。

### 许可证

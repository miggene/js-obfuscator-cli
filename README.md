# JS Obfuscator CLI

**[English](./README.md) | [中文](./README_CN.md)**

## Overview

A command-line tool built with [Bun](https://bun.sh/) to obfuscate JavaScript files interactively. This tool allows users to select files from a directory and apply obfuscation using the `javascript-obfuscator` library, with a sleek progress indicator powered by `ora`.

## Features

- **Interactive File Selection**: Choose specific `.js` files to obfuscate using a checkbox interface.
- **Obfuscation**: Applies advanced obfuscation techniques (e.g., control flow flattening, self-defending) to protect your code.
- **Cross-Platform Builds**: Compile into standalone executables for Windows, macOS, and Linux.
- **Progress Feedback**: Displays real-time progress with a spinner and detailed status updates.

## Prerequisites

- [Bun](https://bun.sh/) installed (`curl -fsSL https://bun.sh/install | bash`).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/js-obfuscator-cli.git
   cd js-obfuscator-cli
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

## Usage

### Running Locally

#### Run the tool with Bun

```bash
bun run start
```

- Enter the directory path containing your .js files.
- Select files to obfuscate from the interactive prompt.
- Watch the obfuscation process with a progress spinner.

#### Building Executables

Compile into standalone binaries:

```bash
# Build for all platforms
bun run build
```

Or for a specific platform:

```bash
bun run build:win    # Windows (.exe)
bun run build:mac    # macOS
bun run build:linux  # Linux
```

Executables (obfuscator.exe, obfuscator-macos, obfuscator-linux) will be generated in the root directory.

## Scripts

```json
"scripts": {
  "start": "bun index.ts",
  "build": "concurrently --names \"win,mac,linux\" \"bun run build:win\" \"bun run build:mac\" \"bun run build:linux\"",
  "build:win": "bun build --compile --minify --target bun-windows-x64 ./index.ts --outfile obfuscator.exe",
  "build:mac": "bun build --compile --minify --target bun-darwin-x64 ./index.ts --outfile obfuscator-macos",
  "build:linux": "bun build --compile --minify --target bun-linux-x64 ./index.ts --outfile obfuscator-linux"
}
```

## Dependencies

- @inquirer/prompts
- javascript-obfuscator
- ora
- concurrently (dev)

## Contributing

1. Fork the repository.
2. Create a feature branch (git checkout -b feature/new-feature).
3. Commit changes (git commit -m "Add new feature").
4. Push to the branch (git push origin feature/new-feature).
5. Open a Pull Request.

## [License](./LICENSE)

MIT License

Copyright (c) 2025 miggene

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

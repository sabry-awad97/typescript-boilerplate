

# 🚀 Modern TypeScript Boilerplate

A robust and modern TypeScript project boilerplate with essential configurations and development tools pre-configured for seamless development experience.

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![License](https://img.shields.io/badge/license-ISC-blue)

## ✨ Features

- **TypeScript 5.x** - Latest TypeScript features and type safety
- **Fast Development** - Lightning-fast development with `tsx`
- **Testing Ready** - Configured with Vitest for robust testing
- **Hot Reloading** - Automatic reloading with nodemon
- **Cross-Platform** - Works seamlessly across different environments
- **Type Safety** - Enhanced type safety with `@total-typescript/ts-reset`

## 🛠️ Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm package manager

## 🚦 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/sabry-awad97/typescript-boilerplate.git
   cd typescript-boilerplate
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI interface

## 📁 Project Structure

```
typescript-boilerplate/
├── src/                # Source code files
│   ├── index.ts       # Main entry point
│   └── index.test.ts  # Test files
├── package.json       # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
├── vitest.config.ts  # Vitest configuration
└── README.md         # Project documentation
```

## 📦 Dependencies

### Main Dependencies
- `zod` - Schema validation with runtime type checking

### Development Dependencies
- `@total-typescript/ts-reset` - Enhanced TypeScript types
- `@types/node` - Node.js type definitions
- `cross-env` - Cross-platform environment variables
- `nodemon` - Development auto-reloading
- `tsx` - TypeScript execution engine
- `vitest` - Testing framework with first-class TypeScript support

## 🧪 Testing

This boilerplate uses Vitest for testing. Tests can be written in TypeScript and are located in `src/**/*.test.ts` files.

```typescript
import { describe, expect, it } from "vitest";

describe("Example Test", () => {
  it("should work", () => {
    expect(true).toBe(true);
  });
});
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Submit a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)
- [tsx](https://github.com/esbuild-kit/tsx)

---

<p align="center">Made with ❤️ by <a href="https://github.com/sabry-awad97">Sabry Awad</a></p>
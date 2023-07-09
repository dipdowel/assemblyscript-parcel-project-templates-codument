# Your starting point for a new AssemblyScript / WASM web project
- This is a template for AssemblyScript projects that use [Parcel](https://parceljs.org/) as a bundler.
- The template allows to have a working AssemblyScript web project up and running very quickly.
- Here's a [demo](https://wasm.codument.com/basic/) of the template project compiled.

## Quick start
1. Copy this project to a desired directory or use [the generator](https://www.npmjs.com/package/assemblyscript-parcel-project-templates-codument).
2. Run `npm install` / `yarn`
3. Run `npm run start` / `yarn start`
4. Open `http://localhost:1234` in your browser and observe the console output
5. Edit something in `index.as.ts` and check the browser console again


## Feedback
### This template
If something in this template does not work as expected, please [open a github issue](https://github.com/dipdowel/assemblyscript-parcel-project-templates-codument/issues).
If you want to suggest an improvement to this template, please [fork it](https://github.com/dipdowel/assemblyscript-parcel-project-templates-codument/) and open a PR.

### The Parcel transformer
This template relies on the [Parcel transformer for AssemblyScript](https://github.com/dipdowel/parcel-transformer-assemblyscript-codument).
- If something in the Parcel transformer  does not work as expected, please [open an issue in the transformer repo](https://github.com/dipdowel/parcel-transformer-assemblyscript-codument/issues).
- If you want to suggest an improvement to the transformer, please [fork it](https://github.com/dipdowel/parcel-transformer-assemblyscript-codument/) and open a PR.

## AssemblyScript
AssemblyScript is a programming language that allows developers to write high-performance WebAssembly (WASM) modules using a syntax similar to TypeScript. It enables developers to write low-level, efficient code that can be executed in a browser or other environments supporting WebAssembly. AssemblyScript provides a bridge between the higher-level world of TypeScript and the lower-level world of WebAssembly, making it easier to work with low-level operations while retaining the safety and productivity benefits of TypeScript.
Please see the official [AssemblyScript](https://www.assemblyscript.org) site for more details

## Parcel
Parcel Bundler is a web application bundler that simplifies the process of building and packaging web applications. It automatically handles the bundling and optimization of various web assets such as HTML, CSS, JavaScript, and more. With its zero-config approach, developers can quickly set up and start building web applications without the need for complex configuration files, making it beginner-friendly and convenient for rapid development.
Please see the official [Parcel](https://parceljs.org/) site for more details
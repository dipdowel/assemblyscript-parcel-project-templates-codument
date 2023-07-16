# TODO: Write a proper README for the Node project template


# Your starting point for a new AssemblyScript / WASM NodeJS project
- This template for a NodeJS + AssemblyScript projects allows to have a working NodeJS + AssemblyScript project up and running very quickly.
- The template features a watcher based on [nodemon](https://www.npmjs.com/package/nodemon). Each time you change and save the code, it gets recompiled and executed automatically.  
- **NB:** this template **does not** use [Parcel](https://parceljs.org/)!


## Quick start
1. Copy this project to a desired directory or use [the generator](https://www.npmjs.com/package/assemblyscript-parcel-project-templates-codument).
2. Run `npm install` / `yarn`
3. Run `npm run start` / `yarn start`
4. The example code will be compiled and executed and the results will be printed to the terminal.
5. Edit something in `index.as.ts` and check the terminal output to see the results of your changes.

## NPM scripts to use:
### Development
Executing `npm run start` / `yarn start` performs the initial build and starts watching the source TypeScript and AssemblyScript files for changes. 
Each time you save a file, the code will be recompiled and executed automatically.

### Production
Executing `npm run build` / `yarn build` performs a production build with all the optimisations and exits.
The resulting files will be placed in the `build` directory. 

## Feedback
### This template
If something in this template does not work as expected, please [open a github issue](https://github.com/dipdowel/assemblyscript-parcel-project-templates-codument/issues).
If you want to suggest an improvement to this template, please [fork it](https://github.com/dipdowel/assemblyscript-parcel-project-templates-codument/) and open a PR.

## AssemblyScript
AssemblyScript is a programming language that allows developers to write high-performance WebAssembly (WASM) modules using a syntax similar to TypeScript. It enables developers to write low-level, efficient code that can be executed in a browser or other environments supporting WebAssembly. AssemblyScript provides a bridge between the higher-level world of TypeScript and the lower-level world of WebAssembly, making it easier to work with low-level operations while retaining the safety and productivity benefits of TypeScript.
Please see the official [AssemblyScript](https://www.assemblyscript.org) site for more details

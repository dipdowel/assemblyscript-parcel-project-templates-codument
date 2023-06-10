# AssemblyScript Parcel project templates

- A collection of templates that helps to start a new AssemblyScript/WASM-enabled web project very quickly.
- A zero-configuration bundler [Parcel](https://parceljs.org/) is included. It allows to start developing right away. 

## Quick start
1. Create a new directory for your project.  
   **NB: if you have existing project files in the directory where you run this generator, some of your files be overwritten.**
2. In the new directory run the following `npx` command:
```shell
npx -p assemblyscript-parcel-project-templates-codument -c "init-as-parcel"
```
3. Choose a template from the displayed list, enter its number and press 'Enter'.
4.  Run `npm install` or `yarn`
5. Run `npm run start` or  `yarn start`
6. Open `http://localhost:1234` in your browser and observe the loaded page
7. Edit `index.as.ts` (the AssemblyScript / WASM entry point). The changes should be reflected in the browser right away.


## Available templates
As of version 0.1.2, the following templates are available:

### Basic
A simple template with the bare minimum of code to get started with AssemblyScript. 
It contains a single AssemblyScript function (`add`) that adds two numbers.
It also contains a 
The result is displayed in the browser console.


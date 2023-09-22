# AssemblyScript Parcel project templates

- A collection of templates that helps to start a new AssemblyScript/WASM-enabled web project very quickly.
- A zero-configuration bundler [Parcel](https://parceljs.org/) is included. It allows to start developing right away. 

## Quick start
1. Create a new directory for your project.  
   **NB: if you have existing project files in the directory where you run this generator, some of your files will be overwritten.**
2. In the new directory run the following `npx` command:
```shell
npx -p assemblyscript-parcel-project-templates-codument@latest -c "init-as-parcel"
```
3. Choose a template from the displayed list, enter its number and press 'Enter'.
4. Run `npm install` or `yarn`
5. Run `npm run start` or  `yarn start`
6. Open `http://localhost:1234` in your browser and observe the loaded page
7. Edit `index.as.ts` (the AssemblyScript / WASM entry point). The changes should be reflected in the browser right away.



### An important notice on `npx` and caching 
`npx` caches packages, and the next time you call `npx` with the same package name, you might end up using an outdated version.
To work around this issue and ensure that you're getting the latest version, 
please append `@latest` to the package name, as shown in the example below:
`npx -p assemblyscript-parcel-project-templates-codument@latest -c "init-as-parcel"`

## Improved debug output management
You can mark certain blocks of code as debug. You can choose not to include those blocks of code into your production build.
That way you can have all your `console.log()` calls being executed in your development build and being removed from your production build.
  
**Use cases:**

1. When you have complex `.toString()` methods in your AssemblyScript code that you want to use for
   debugging but don't want to include them to your production build.
2. When you want to use some helper functions in your AssemblyScript code for debugging purposes but don't want
   to include them to your production build.
3. When you want to ignore `import` statements in your AssemblyScript code that are used for debugging purposes (e.g.
   for importing functions mentioned in point 2 above).
4. When you want all the `console.log()` and similar calls not to be compiled into your build.

For details please see [debug code preprocessing](https://github.com/dipdowel/parcel-transformer-assemblyscript-codument/blob/master/parcel-transformer-assemblyscript-codument/README.md#debug-code-preprocessing).
  

## Available templates
As of version 0.4.0, the following templates are available:

### Basic
- This template is a bare minimum to get started with an AssemblyScript/WASM-enabled web project.
- Contains a single working AssemblyScript function (`add()`) which is called from TypeScript.
- The result is displayed in the browser console.
- After installation, please consult the [README](https://github.com/dipdowel/assemblyscript-parcel-project-templates-codument/tree/master/template-basic/README.md) of the template for more details.

### Canvas 2d resizable
- This template demonstrates how to use AssemblyScript to draw on a 2d canvas.
- The canvas is resized to be responsive, so try resizing your browser window
- This template demonstrates basics of animation with AssemblyScript
- After installation, please consult the [README](https://github.com/dipdowel/assemblyscript-parcel-project-templates-codument/tree/master/template-canvas-2d-resizable/README.md) of the template for more details.

### Node basic
- This template is a bare minimum to get started with a NodeJS + AssemblyScript/WASM-enabled project.
- The template provides automatic recompilation on file changes.
- Contains a single working AssemblyScript function (`add()`) which is called from TypeScript.
- The result is displayed in the terminal.
- After installation, please consult the [README](https://github.com/dipdowel/assemblyscript-parcel-project-templates-codument/tree/master/template-node-basic/README.md) of the template for more details.


## Feedback
### These templates
If something in this project generator does not work as expected, please [open a github issue](https://github.com/dipdowel/assemblyscript-parcel-project-templates-codument/issues).
If you want to suggest an improvement to this project generator, please [fork it](https://github.com/dipdowel/assemblyscript-parcel-project-templates-codument/) and open a PR.

### The Parcel transformer
This template relies on the [Parcel transformer for AssemblyScript](https://github.com/dipdowel/parcel-transformer-assemblyscript-codument).
- If something in the Parcel transformer  does not work as expected, please [open an issue in the transformer repo](https://github.com/dipdowel/parcel-transformer-assemblyscript-codument/issues).
- If you want to suggest an improvement to the transformer, please [fork it](https://github.com/dipdowel/parcel-transformer-assemblyscript-codument/) and open a PR.

- - - - - - - - - - - - - 
#### For maintainers of this package
Local execution: `npx -c /home/<path-to-project-parent-dir>/assemblyscript-parcel-project-templates-codument/index.js`
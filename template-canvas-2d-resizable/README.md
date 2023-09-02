# AssemblyScript / WASM: your starting point for a web project with 2D graphics and animation
- This is a template for a web project with graphics and animation.
- Please see the [Live Demo](https://wasm.codument.com/canvas-2d-resizable/)
- Rendering is done on a 2D `<canvas />` using AssemblyScript.
- The content of the canvas is responsive, it resizes together with the browser window.
- The template uses [Parcel](https://parceljs.org/) as a bundler.
- The template allows to have a working AssemblyScript web project up and running very quickly.

## Quick start
1. Copy this project to a desired directory or use [the generator](https://www.npmjs.com/package/assemblyscript-parcel-project-templates-codument).
2. Run `npm install` / `yarn`
3. Run `npm run start` / `yarn start`
4. Open `http://localhost:1234` in your browser and observe the console output
5. Edit something in `index.as.ts` and check the browser console again

For details on fine-tuning (including preprocessor for excluding debug code) please see this [README](https://github.com/dipdowel/parcel-transformer-assemblyscript-codument/blob/master/parcel-transformer-assemblyscript-codument/README.md)

## Important notes on memory management
In general, AssemblyScript provides garbage collection and automatic memory management. However, for a faster graphics 
and animation performance it is possible to directly manipulate the area in application memory which maps 
to the 2D canvas (framebuffer). This template contains such a solution. 

## Framebuffer
In computer graphics, a framebuffer refers to a dedicated area of memory that is used to store pixel data for display
purposes. It acts as a buffer or temporary storage space where the graphical content, such as images or rendered scenes,
is constructed before being sent to the display device.

The framebuffer typically represents the entire display area as a grid of pixels, with each pixel containing color
information. It holds the pixel values for each location on the screen, allowing for manipulation and modification
of the image before it is ultimately presented on the screen.

For the rest of this document, we will use the term "framebuffer" to refer to the area in memory which contains pixel
information passed to the 2D canvas in order to be displayed on the screen (video hardware/software professionals, 
please forgive us for such a loose use of the term).

## Memory organization

### Allocating enough manually managed memory. General considerations.

When directly manipulating memory, it's crucial to know about the AssemblyScript compiler's "--memoryBase" flag.
By setting this flag, we can define a memory address after which the memory will be managed by the AssemblyScript runtime. 
All the memory before that address would be under our control, and we would be responsible for managing it manually.

To illustrate that, let's say we want to allocate 1024 bytes of memory to be managed manually: 
```shell
asc --memoryBase 1024 my-module.ts
```

That would result in the following memory structure:
```text
│  mem addresses 0 - 1023  │                  mem  addresses 1024 and above              │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
0     memory managed     1023                       memory managed                       ?
        manually                               by AssemblyScript runtime  
```


So the AssemblyScript runtime will refrain from writing to the memory locations before 1024, 
focusing only on the locations starting from 1024 and above.

### Framebuffer: how to allocate enough memory
The framebuffer is a contiguous area in memory. Roughly speaking, it is an array of pixels, where each pixel is represented by 4 bytes:
- 1 byte for the red channel
- 1 byte for the green channel
- 1 byte for the blue channel
- 1 byte for the alpha channel

We define the minimum and maximum size of the 2D canvas in `styles.scss` as follows:
```scss
{
  // Make the canvas to be minimum 320x240 and maximum 1024x768 pixels.
  // -------------------------------------------------------------------------------------------------------------------
  // NB: These values are important. They are used as the source of truth for allocating WASM memory for the canvas.
  // NB: See `README.md` for more details.
     min-width:  320px;
     min-height: 120px;
     max-width:  1024px;
     max-height: 768px;
}
```

We need to allocate as much memory as the largest possible 2D canvas would require.
The largest possible 2D canvas is 1024x768 pixels, with 4 bytes per pixel. This means that we need to reserve
1024x768x4 bytes of memory. We are reserving this memory by setting the "--memoryBase" flag to 3145728 (1024x768x4).

```shell
asc --memoryBase 3145728 my-module.ts
```
 Which results in the following memory structure:

```text
│       mem addresses 0 - 3145727          │               mem  addresses 3145728 and above              │
├──────────────────────────────────────────┼─────────────────────────────────────────────────────────────┤
0    framebuffer of 1024x768x4 bytes    3145727                       memory managed                     ?
              managed manually                                   by AssemblyScript runtime        
```



Should we happen to allocate less memory, we risk getting our framebuffer to be corrupted by the AssemblyScript runtime
write-to-memory operations or the other ways around: we risk corrupting the AssemblyScript runtime memory by writing to 
the framebuffer.

If you ever bump into an error as the one below, it is very likely that you have allocated less memory than the framebuffer 
requires
```text
index.as.aa946161.wasm:0x28b Uncaught (in promise) RuntimeError: memory access out of bounds
at index.as.aa946161.wasm:0x28b
```

### Setting `--memoryBase` in this project
In this template the AssemblyScript compiler is wrapped into a parcel-transformer, hence `--memoryBase` can be set only
in file `asconfig.json`. It should be set in both `"debug"` and `"release"` sections:
```json5
{
  "targets": {
    "debug": {
      // ...
      "memoryBase": 3145728 //  1024x768x4 bytes
    },
    "release": {
      // ...
      "memoryBase": 3145728 //  1024x768x4 bytes
    }
  },
// ...
}
```
 

### More resources on 2D graphics and memory in AssemblyScript
- [Wasm by example: WebAssembly Linear Memory](https://wasmbyexample.dev/examples/webassembly-linear-memory/webassembly-linear-memory.assemblyscript.en-us.html)
- [Wasm by example: Reading and Writing Graphics]( https://wasmbyexample.dev/examples/reading-and-writing-graphics/reading-and-writing-graphics.assemblyscript.en-us.html). 
- [2D Video Game in AssemblyScript Tutorial](https://blog.ttulka.com/2d-video-game-in-assemblyscript-tutorial/)

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
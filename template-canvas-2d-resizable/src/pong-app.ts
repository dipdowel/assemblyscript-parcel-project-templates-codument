import { WasmModule } from "./wasm-module";
import { getCanvas } from "./lib/get-canvas";
import { CanvasSizeDescriptor } from "./lib/types";

let isInitialized = false;

// The WASM module, typed
let wasm: WasmModule;

// The canvas element where the rendering happens
let screen: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

// `true` if the browser tab with the app is not in focus, `false` otherwise
let isHidden = false;

// `lastRender` and `acc` help maintaining somewhat a constant frame rate
/** The timestamp of the last animation frame */
let lastRender = 0;
/** The accumulated time since the last animation frame */
let acc = 0;

/** Duration of a single frame in milliseconds */
const frameDurationMS = 17; // = 1000 / 60, that's 60 fps

// Values related to the canvas size
let canvasSizes: CanvasSizeDescriptor;

/**
 * Renders one frame of the animation.
 * @param ts
 */
async function animationStep(ts: number) {
  if (lastRender === 0) {
    lastRender = ts;
  }

  acc += ts - lastRender;
  lastRender = ts;

  while (isInitialized && !isHidden && acc >= frameDurationMS) {
    const { width: widthPixels, height: heightPixels } = canvasSizes;

    const actualFrameBufferSizeInBytes = widthPixels * heightPixels * 4;

    wasm.renderFrame(widthPixels, heightPixels);

    // Get access to the whole WASM memory buffer
    const { buffer } = wasm.memory;

    // Create a view into the WASM memory buffer
    // that is suitable for interpreting bytes as pixels
    const pixelBuffer = new Uint8ClampedArray(
      buffer,
      0,
      actualFrameBufferSizeInBytes
    );

    // render the frontBuffer
    const imageData = new ImageData(pixelBuffer, widthPixels, heightPixels);
    ctx.putImageData(imageData, 0, 0);
    acc -= frameDurationMS;
  }
  window.requestAnimationFrame(animationStep);
}

// Start the animation loop
window.requestAnimationFrame(animationStep);

/**
 * @param wasmModule
 * @param canvasSizeDescriptor
 */
export function initPongApp(
  wasmModule: WasmModule,
  canvasSizeDescriptor: CanvasSizeDescriptor
): void {
  // save wasm module for accessing WASM functions in the rest of the app
  wasm = wasmModule;

  // get and save the 2D canvas and its context
  const { canvas, context } = getCanvas("screen");
  screen = canvas;
  ctx = context;

  canvasSizes = canvasSizeDescriptor;

  const {
    maxWidth: maxWidthPixels,
    maxHeight: maxHeightPixels,
    width,
    height,
  } = canvasSizes;

  screen.width = width;
  screen.height = height;

  // Tell the WASM module what the biggest possible screen size is.
  wasm.init(maxWidthPixels, maxHeightPixels);

  isInitialized = true;
}

/**
 * Adapt the canvas size to the new window size.
 * @param canvasWidth
 * @param canvasHeight
 */
export function resizePongApp(canvasWidth: number, canvasHeight: number): void {
  screen.width = canvasWidth;
  screen.height = canvasHeight;
  canvasSizes.width = canvasWidth;
  canvasSizes.height = canvasHeight;
}

/** Toggles the demo mode between FLAT and 3D. */
export function switchModePongApp(): void {
  wasm.switchMode();
}

// This is needed to pause the animation when the browser tab loses focus
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    lastRender = 0;
    acc = 0;
  }
});

// The entry point of your WebAssembly module.

import { drawRect, initDrawRect } from "./lib/high-level/draw-rect";
import { drawGrid } from "./draw-grid";

/**************** [ GENERAL ] ****************/

let maxWidth: u32;
let maxHeight: u32;

// global variables for positioning the square on the screen each time we draw a new frame
let _x: u32 = 10,
  _y: u32 = 16,
  _deltaX: i32 = +1,
  _deltaY: i32 = +1,
  _width: u32,
  _height: u32;

/**************** [ RENDERING MODE SWITCH ] ****************/
const MODE_3D = true;
const MODE_FLAT = false;

/** Rendering mode. Can be `MODE_FLAT` || `MODE_3D`; */
let mode: boolean = MODE_FLAT;

/**
 * Tells the WASM module what the biggest possible screen size is.
 * @param maxFrameBufferWidth
 * @param maxFrameBufferHeight
 */
export function init(
  maxFrameBufferWidth: u32,
  maxFrameBufferHeight: u32
): void {
  maxWidth = maxFrameBufferWidth;
  maxHeight = maxFrameBufferHeight;
}

/**
 * Calculates the next position of the square on the screen
 * and writes it into the global variables `_x` and `_y`.
 * @param width
 * @param height
 * @param side
 */
function calculateXY(width: u32, height: u32, side: u32): void {
  _x += _deltaX;
  _y += _deltaY;

  const heightLimit = height - side - 1;
  const widthLimit = width - side - 1;

  // make the square bounce off the vertical edges
  if (_x > widthLimit || _x < 1) {
    _deltaX = _deltaX * -1;
  }

  // make the square bounce off the horizontal edges
  if (_y > heightLimit || _y < 1) {
    _deltaY = _deltaY * -1;
  }

  // don't let the square go off the screen vertically
  if (_y > height) {
    _y = heightLimit - side;
  }

  // don't let the square go off the screen horizontally
  if (_x > width) {
    _x = widthLimit - side;
  }
}

/**
 * Renders a new frame on the screen.
 * @param width
 * @param height
 */
export function renderFrame(width: u32, height: u32): void {
  if (mode === MODE_FLAT) {
    // clear the screen by filling the maximum possible framebuffer with white pixels
    memory.fill(0, 0xff, 4 * width * height);

    // Draw the dotted grid
    drawGrid(width, height, maxWidth, maxHeight);
  }

  const wasResized = _width != width || _height != height;

  if (mode === MODE_3D && wasResized) {
    // clear the screen by filling the maximum possible framebuffer with white pixels
    memory.fill(0, 0xff, 4 * _width * _height);
  }

  _width = width;
  _height = height;

  const side = <u32>NativeMath.floor(NativeMath.min(width, height) / 16);

  // tell the `drawRect()` function what is the current screen size
  initDrawRect(width, height);

  calculateXY(width, height, side);

  // Defines the size of the shadows and highlights on the square
  const tintFactor = 9;

  let tintedSide = side / tintFactor;
  const isVerySmall = tintedSide < 1;

  if (isVerySmall) {
    tintedSide = 1;
  }

  // Plain boring red square
  drawRect(_x, _y, 0xff_33_33_ff, side);

  // The shadows and highlight on the square
  drawRect(_x, _y, 0xff_88_88_ff, side, tintedSide);
  drawRect(_x, _y, 0xff_00_00_aa, tintedSide, side);
  drawRect(_x + side - tintedSide, _y, 0xff_66_66_ff, tintedSide, side);
  drawRect(_x, _y + side - tintedSide, 0xff_00_00_77, side, tintedSide);
  drawRect(_x, _y, 0xff_66_66_ff, tintedSide, tintedSide);
}

/** Toggles the demo mode between FLAT and 3D. */
export function switchMode(): void {
  // Toggle the mode between  `MODE_3D` and `MODE_FLAT`
  mode = !mode;
  if (mode === MODE_3D) {
    // clear the screen by filling the maximum possible framebuffer with white pixels
    memory.fill(0, 0xff, 4 * _width * _height);
  }
}

const SRC_PIXEL_ADDRESS = 0;

let _canvasWidth: u32, _canvasHeight: u32;

export function initDrawRect(canvasWidth: u32, canvasHeight: u32): void {
  _canvasWidth = canvasWidth;
  _canvasHeight = canvasHeight;
}

/**
 * Draws a rectangle on the screen
 * @param x X coordinate of the top left corner of the rectange
 * @param y Y coordinate of the top left corner of the rectange
 * @param color ABGR color
 * @param sideHorizontal  horizontal side
 * @param sideVertical if omitted, a square with side of `sideHorizontal` is drawn
 */
export function drawRect(
  x: u32,
  y: u32,
  color: u32,
  sideHorizontal: u32,
  sideVertical: u32 = 0
): void {
  if (sideVertical === 0) {
    sideVertical = sideHorizontal;
  }

  // temporarily save the pixel that will be used as source in order to avoid memory corruption
  const pixelToRestore = i32.load(SRC_PIXEL_ADDRESS);

  i32.store(SRC_PIXEL_ADDRESS, color);

  for (let scanline: u32 = 0; scanline < sideVertical; scanline++) {
    memory.repeat(
      _canvasWidth * 4 * (y + scanline) + x * 4,
      SRC_PIXEL_ADDRESS,
      4,
      sideHorizontal
    );
  }

  // restore the pixel that was used as source back to its original value
  i32.store(SRC_PIXEL_ADDRESS, pixelToRestore);
}

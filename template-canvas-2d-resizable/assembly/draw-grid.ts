const DOT_COLORS: u32[] = [
  0xff_00_00_00, 0xff_00_00_00, 0xff_55_55_55, 0xff_77_77_77, 0xff_99_99_99,
  0xff_aa_aa_aa, 0xff_aa_aa_aa,
];

/**
 * Draws the dotted grid on the screen.
 * The distance between grid dots is relative to the screen size.
 * The color of the grid dots is relative to the screen size.
 * @param width - actual screen width
 * @param height - actual screen height
 * @param maxWidth - maximum allowed screen width
 * @param maxHeight - maximum allowed screen height
 */
export function drawGrid(
  width: u32,
  height: u32,
  maxWidth: u32,
  maxHeight: u32
): void {
  // distance between the dots of the grid

  const gridSize = <u32>((width + height) / 80);

  // Calculate which color from the ones defined in `DOT_COLORS` suits the current size of the screen the best
  const colorIndex = <i32>((maxHeight / height + maxWidth / width) / 2);
  const dotColor = DOT_COLORS[colorIndex];

  // draw the first line of the grid
  for (let i: u32 = gridSize; i < width; i += gridSize) {
    i32.store(i * 4, dotColor);
  }

  // Copy the first line of the grid to the rest of the screen
  for (let i: u32 = 0; i < height; i += gridSize) {
    memory.repeat(width * 4 * i, 0, width * 4, 1);
  }
  // Clear the first line of the grid as it looks ugly
  memory.repeat(0, 0, 4, width * 4);
}

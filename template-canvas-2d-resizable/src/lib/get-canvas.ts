export type CanvasAndContext2D = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
};

/**
 * Returns references to 2d canvas and its context
 * @param canvasElementId ID of the canvas element in the HTML document
 */
export function getCanvas(canvasElementId: string): CanvasAndContext2D {
  const canvas: HTMLCanvasElement | undefined = document.getElementById(
    canvasElementId
  ) as HTMLCanvasElement;

  if (!canvas) {
    throw new Error(`HTMLCanvasElement with id ${canvasElementId} not found`);
  }

  let context = canvas.getContext("2d");

  if (!context) {
    throw new Error("No canvas context found");
  }

  return { canvas, context };
}

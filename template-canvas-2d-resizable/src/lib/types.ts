import { ElementSizeRange } from "./get-element-size-range";

/** All the numbers related to canvas sizing  */
export type CanvasSizeDescriptor = ElementSizeRange & {
  width: number;
  height: number;
};

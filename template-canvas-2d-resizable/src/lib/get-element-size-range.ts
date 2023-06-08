export type ElementSizeRange = {
  minWidth: number;
  minHeight: number;
  maxHeight: number;
  maxWidth: number;
};

/**
 *  Returns the minimum and maximum size of the element with the given ID.
 * @param canvasElementId
 */
export function getElementSizeRange(canvasElementId: string): ElementSizeRange {
  const canvasElement = document.getElementById(canvasElementId);
  const styles = window.getComputedStyle(canvasElement);
  const minWidth = styles.getPropertyValue("min-width");
  const minHeight = styles.getPropertyValue("min-height");
  const maxWidth = styles.getPropertyValue("max-width");
  const maxHeight = styles.getPropertyValue("max-height");

  return {
    minWidth: parseInt(minWidth),
    minHeight: parseInt(minHeight),
    maxWidth: parseInt(maxWidth),
    maxHeight: parseInt(maxHeight),
  };
}

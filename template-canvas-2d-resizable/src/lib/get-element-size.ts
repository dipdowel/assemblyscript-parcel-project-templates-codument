/**
 * Get the size of an HTML element
 * @param elementId
 */
export function getElementSize(elementId: string): {
  width: number;
  height: number;
} {
  const screen = document.getElementById(elementId);
  const { clientWidth, clientHeight } = screen;
  return { width: clientWidth, height: clientHeight };
}

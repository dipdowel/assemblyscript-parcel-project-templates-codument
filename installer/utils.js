/**
 * Capitalize the first letter of a string
 * @param str
 * @return {string}
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Replace hyphens with spaces in a string
 * @param str
 * @return {*}
 */
export function replaceHyphensWithSpaces(str) {
  return str.replace(/-/g, " ");
}

export const boldLine = "━".repeat(81);

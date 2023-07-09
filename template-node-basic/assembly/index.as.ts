// The entry point of your WebAssembly module.

import { addTwoNumbers } from "./helpers/add-two-numbers";
import { reportNumber } from "./env";

/**
 * This is a simple addition of two i32 values.
 * Under the hood the addition will be
 * @param a
 * @param b
 */
export function add(a: i32, b: i32): i32 {
  console.log("[WASM] Hi from the WASM world!");

  // Call a JS-function from WASM (via imports)
  reportNumber(54321);

  // Call the function in the helper file
  const result = addTwoNumbers(a, b);

  // AssemblyScript allows printing to the console of your browser
  console.log(`[WASM] add(${a}, ${b}) --> ${result.toString(10)} `);

  // Return the result from WASM to the JavaScript world
  return result;
}

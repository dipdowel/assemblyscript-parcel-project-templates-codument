// The entry point of your WebAssembly module.

import { add16bit } from "./helpers/add-16bit";

/**
 * This is a simple addition of two i32 values
 * @param a
 * @param b
 */
export function add(a: i32, b: i32): i32 {
  console.log("[WASM] Hi from the WASM world!");
  const result = add16bit(<i16>a, <i16>b);
  // const t: i32;

  // AssemblyScript allows printing to the console of your browser
  console.log(`[WASM]    add(${a}, ${b}) --> ${result.toString(10)} `);

  // Return the result from WASM to the JavaScript world
  return result;
}

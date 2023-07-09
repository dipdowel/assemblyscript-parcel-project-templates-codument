import { getWasmModule } from "./get-wasm-module";

(async function main() {
  console.log("\n\n==[ START ]" + "=".repeat(40) + "\n");
  console.log("Loading WASM module...");

  /**
   * JS-functions defined in the `env` will be callable from the WASM module.
   * E.g. `reportNumber()` is called from `assembly/index.as` via `env.reportNumber()`
   */
  const env = {
    reportNumber: (num: number) =>
      console.log("[JS] Number reported from WASM: " + num),
  };

  const instance = await getWasmModule({ env });
  const result = instance.add(22, 33);

  console.log(`[JS] Result from WASM: ${result}`);
  console.log("\n==[ END ]" + "=".repeat(42) + "\n\n");
})();

import { getWasmModule } from "./get-wasm-module";

(async function main() {
  console.log("\n\n==[ START ]" + "=".repeat(40) + "\n");
  console.log("Loading WASM module...");
  const instance = await getWasmModule({ env: { print: console.log } });
  const result = instance.add(22, 33);
  console.log(`[JS] Result from WASM: ${result}`);
  console.log("\n==[ END ]" + "=".repeat(42) + "\n\n");
})();

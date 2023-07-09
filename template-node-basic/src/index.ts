import {getWasmModule} from "./get-wasm-module";

(async function main() {
  const instance = await getWasmModule({env:{print:console.log}});
  const result = instance.add(22, 33);
  console.log(`Result from WASM: ${result}`);
})();


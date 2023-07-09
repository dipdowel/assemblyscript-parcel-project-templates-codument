import * as fs from "fs";
import {instantiate} from "./glue/index.as";
import {WasmModule} from "./wasm-module";

const compiled = new WebAssembly.Module(fs.readFileSync(__dirname + "/../build/index.as.wasm"));


const defaultImports = {
    env: {
        abort(_msg:string, _file:string, line:number, column:number) {
            console.error(`abort(): ${_msg}, file: ${_file}, ${line}:${column} `);
        }
    }
};

export type Imports = {env: any} & Record<string, any>
export async function getWasmModule(imports?:Imports):Promise<WasmModule> {
    return await instantiate(compiled, {...defaultImports, ...imports });
}



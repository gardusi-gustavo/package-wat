import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import wabtFactory from "wabt";

const wat = readFileSync("src/calculator.wat", "utf8");
const wabt = await wabtFactory();
const module = wabt.parseWat("calculator.wat", wat);
const { buffer } = module.toBinary({});
mkdirSync("dist", { recursive: true });
writeFileSync("dist/calculator.wasm", Buffer.from(buffer));
module.destroy();
console.log("wrote dist/calculator.wasm");

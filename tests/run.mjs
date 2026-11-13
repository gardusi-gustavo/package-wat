import { readFileSync } from "node:fs";

const bytes = readFileSync("dist/calculator.wasm");
const { instance } = await WebAssembly.instantiate(bytes);
const add = instance.exports.add;
const multiply = instance.exports.multiply;

const checks = [
  ["add(5, 10) === 15", add(5, 10) === 15],
  ["add(-2, 2) === 0", add(-2, 2) === 0],
  ["multiply(6, 7) === 42", multiply(6, 7) === 42],
  ["multiply(0, 9) === 0", multiply(0, 9) === 0],
];

let failed = 0;
for (const [label, ok] of checks) {
  console.log(`${ok ? "ok  " : "FAIL"} ${label}`);
  if (!ok) failed += 1;
}
if (failed) {
  console.error(`${failed} check(s) failed`);
  process.exit(1);
}
console.log("wasm checks ok");

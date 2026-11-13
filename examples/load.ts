async function loadWasmCalculator(): Promise<{
  add: (a: number, b: number) => number;
  multiply: (a: number, b: number) => number;
}> {
  const response = await fetch("/calculator.wasm");
  const buffer = await response.arrayBuffer();
  const { instance } = await WebAssembly.instantiate(buffer);
  return {
    add: instance.exports.add as (a: number, b: number) => number,
    multiply: instance.exports.multiply as (a: number, b: number) => number,
  };
}

const { add, multiply } = await loadWasmCalculator();
console.log("5 + 10 =", add(5, 10));
console.log("6 * 7 =", multiply(6, 7));

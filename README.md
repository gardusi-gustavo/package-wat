# package-wat

Hand-written WebAssembly Text (`.wat`) source, its build, and a runtime harness.
`.wasm` is an artifact, not a language: it lives in `dist/` or in release assets.

## Layout

```text
src/calculator.wat     source
scripts/build.mjs      WAT -> WASM
tests/run.mjs          instantiate and assert
examples/load.ts       TypeScript consumer
```

## Build and test

```bash
npm install
npm run build     # dist/calculator.wasm
npm test          # add(5,10) == 15, multiply(6,7) == 42
```

`wat2wasm` from wabt also works:

```bash
wat2wasm src/calculator.wat -o dist/calculator.wasm
```

## Why this repository exists

A zero-compiler playground for the WebAssembly instruction set. It is the raw
assembly layer that the higher-level packages compile into:

- `package-rs` / `package-zig` / `package-cpp` — compile to Wasm;
- `package-wat` — write the instruction stream by hand;
- `contract-wit` — the component interface, once a component is implemented.

The first milestone is a **core module** (exports only). The Component Model
layer needs `wit-bindgen` and `jco`, and lands later.

## .wit vs .wat

| File | Layer |
| --- | --- |
| `.wit` | component interface contract |
| `.wat` | core module source (assembly) |
| `.wasm` | compiled artifact |

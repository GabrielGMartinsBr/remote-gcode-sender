import { Options } from 'tsup'

export const tsup: Options = {
    splitting: false,
    sourcemap: true,
    format: ['cjs', 'esm'],
    entry: ['src/index.ts'],
    dts: true,
    clean: true,
    minify: false,
}
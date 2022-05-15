require('esbuild').build({
    entryPoints: ['./src/index.ts'],
    bundle: true,
    platform: 'node',
    outdir: './dist/',
    minify: true
}).catch(() => process.exit(1))
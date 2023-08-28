import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import svelte from 'rollup-plugin-svelte';
import css from 'rollup-plugin-css-only';

export default [
    {
        input: 'test/src/tests.js',
        output: {
            dir: './test/public',
            inlineDynamicImports: true,
        },
        plugins: [
            svelte({
                emitCss: false,
                compilerOptions: {
                    accessors: true,
                    dev: true,
                },
            }),
            css(),
            resolve({
                browser: true,
                exportConditions: ['development'],
            }),
            replace({
                'process.env.NODE_ENV': 'null',
            }),
        ],
    },
];

import pkg from '../package.json';
import babel from 'rollup-plugin-babel';

export default [
    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify
    // `file` and `format` for each target)
    {
        input: 'src/main.js',
        output: [
            {
                name: 'index.cjs.js',
                file: pkg.main,
                format: 'cjs'
            },
            {
                name: 'index.umd.js',
                file: pkg.browser,
                format: 'umd'
            },
            {
                name: 'index.esm.js',
                file: pkg.module,
                format: 'es'
            }
        ],
        plugins: [
            babel()
        ]
    }
];

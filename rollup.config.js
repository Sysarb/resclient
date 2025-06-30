import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

export default {
	input: 'src/index.js',
	output: {
		name: 'resclient',
		format: 'umd',
		exports: 'named'
	},
	plugins: [
		babel({ babelHelpers: 'bundled' }),
		resolve(),
	],
};

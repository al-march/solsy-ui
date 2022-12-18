import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import withSolid from 'rollup-preset-solid';

const packageJson = require('./package.json');

export default withSolid({
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs({
      dynamicRequireTargets: ['node_modules/dayjs/*.js'],
    }),
    typescript({useTsconfigDeclarationDir: true}),
  ],
});

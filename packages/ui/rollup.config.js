import commonjs from '@rollup/plugin-commonjs';
import withSolid from 'rollup-preset-solid';

export default withSolid({
  plugins: [
    commonjs({
      dynamicRequireTargets: ['node_modules/dayjs/*.js'],
    }),
  ],
});

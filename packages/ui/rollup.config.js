import withSolid from "rollup-preset-solid";
import commonjs from '@rollup/plugin-commonjs';

export default withSolid({
    plugins: [commonjs({
        dynamicRequireTargets: [
            'node_modules/dayjs/*.js',
        ]
    })]
});

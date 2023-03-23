import babel from "@rollup/plugin-babel";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import css from "rollup-plugin-import-css";
import {nodeResolve} from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.js',
    output: {
        file: 'public/bundle.js',
        format: 'es'
    },
    plugins: [
        nodeResolve({
            extensions: ['.js', '.jsx',] // 导入jsx文件可以省略后缀名
        }),
        babel({babelHelpers: 'bundled'}),
        serve({
            open: true, // 在浏览器中启动页面
            contentBase: 'public',
            port: 4000,
        }),
        livereload({
            watch: 'public',
        }),
        css(),
    ]
};
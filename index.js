#!/usr/bin/env node
const path = require('path')
const fs = require('fs-extra')
const os = require('os')
const spawn = require("cross-spawn")

const projectName = process.argv[2]
if (projectName === undefined) {
    console.log('未指定项目名')
    process.exit(1)
}

const root = path.resolve(projectName); // 项目绝对路径
console.log('root:', root)

fs.ensureDirSync(root) // 创建项目文件夹

const packageJson = {
    name: projectName,
    version: '0.1.0',
    type: "module",
    scripts: {
        "dev": "rollup -c -w"
    }
};
fs.writeFileSync( // 写入package.json文件
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
);

const originalDirectory = process.cwd();

process.chdir(root); // 切换node 进程的工作目录

// 1.安装新项目所需的依赖性：rollup、babel等
function install() {
    const devDependencies = [
        "freactjs",
        // '@babel/core',
        // "@babel/preset-env",
        // "@babel/preset-react",
        // "@rollup/plugin-babel",
        // "@rollup/plugin-node-resolve",
        // "rollup",
        // "rollup-plugin-import-css",
        // "rollup-plugin-livereload",
        // "rollup-plugin-serve"
    ]
    return new Promise((resolve, reject) => {
        const child = spawn(
            'npm',
            ['install', '--save-dev', ...devDependencies],
            {stdio: 'inherit'}
        );

        child.on('close', code => {
            if (code !== 0) {
                reject('失败');
                return;
            }
            resolve();
        });
    })

}

install().then(() => {
    const CFAPath=path.dirname(
        require.resolve('./package.json')
    );
    console.log(CFAPath)
    // 2.下载新项目基本模板
    // 将template文件夹中的所有内容复制到新项目中
    fs.copySync(path.join(CFAPath, 'template'), root);

    // 3.下载新项目配置文件（rollup、babel）
    fs.copySync(path.join(CFAPath, 'config'), root);

    console.log('创建项目成功')
    console.log('输入：')
    console.log(`cd ./${projectName}`)
    console.log('npm run dev')
})



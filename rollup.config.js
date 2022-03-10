// console.log("process.env.TARGET", process.env.TARGET);

import path, { dirname } from "path";
import json from "@rollup/plugin-json";
import resolvePlugin from "@rollup/plugin-node-resolve";
import ts from "rollup-plugin-typescript2";

// 根据环境变量中的target属性，获取对应模块中的 package.json
const packagesDir = path.resolve(__dirname, "packages");

const packageDir = path.resolve(packagesDir, process.env.TARGET);

console.log("packageDir", packageDir);

const resolve = (p) => path.resolve(packageDir, p);

const pkg = require(resolve("package.json"));
const name = path.basename(packageDir);

// console.log("pkg ===> ", pkg);

// 对打包类型，先做一个映射表，根据你提供的 formats 来格式化需要打包的内容

const outputConfig = {
  "esm-bundler": {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: "es",
  },
  cjs: {
    file: resolve(`dist/${name}.cjs-bundler.js`),
    format: "cjs",
  },
  global: {
    file: resolve(`dist/${name}.global-bundler.js`),
    format: "iife",
  },
};

const options = pkg.buildOptions; // 自己在 package.json 中定义的

function createConfig(options, output) {
  output.name = options.name;
  output.sourcemap = true;

  // 生成 rollup 配置

  return {
    input: resolve(`src/index.ts`),
    output,
    plugins: [
      json(),
      ts({
        // ts 插件
        tsconfig: path.resolve(__dirname, "tsconfig.json"),
      }),
      resolvePlugin(), // 解析第三方插件
    ],
  };
}

export default options.formats.map((format) =>
  createConfig(format, outputConfig[format])
);

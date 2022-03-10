// 吧 package 下的所有包都打包
const fs = require("fs");
const execa = require("execa");
// const execa = require("execa"); // 开启子进程进行打包，还是调用rollup

const targets = fs
  .readdirSync("packages")
  .filter((f) => fs.statSync(`packages/${f}`).isDirectory());
console.log(targets);

// 对目标进行并行打包，并行打包
async function build(source) {
  // console.log(source);
  // rollup -c --environment TARGET:shared
  await execa("rollup", ["-c", "--environment", `TARGET:${source}`], {
    stdio: "inherit", //  将子进程打包信息共享给父进程
  });
}

function runParallel(targets, iteratorFn) {
  const res = [];
  for (const item of targets) {
    const p = iteratorFn(item);
    res.push(p);
  }
  return Promise.all(res);
}

runParallel(targets, build);

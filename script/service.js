// const fs = require('fs')
const path = require('path')
const c = require('ansi-colors')
const exec = require('child_process').exec
const cmdStr = 'npm run start'
const PathBase = path.join(__dirname, '../mysql-web-service');
console.log(PathBase)
const childProcess = exec(cmdStr, {
  cwd: PathBase
}, (err, stdout, stderr) => {
  if (err) {
    // console.log(err)
    // console.log(stderr)
    console.log(c.red(err))
    // 忽略错误
  }
  console.log(stdout)
})

childProcess.stdout.on('data', (data) => {
  console.log(data);
});

const fs = require("fs")
const path = require("path")

const removeDir = (outPath, exclude) => {
  if (fs.existsSync(outPath)) {
    let dir = fs.readdirSync(outPath)
    dir.forEach(file => {
      const curPath = path.join(outPath, file)
      if (!exclude.includes(file)) {
        if (fs.statSync(curPath).isDirectory()) {
          removeDir(curPath, exclude)
        } else {
          fs.unlinkSync(curPath)
        }
      }
    })
  }
}

module.exports = class test {
  constructor(options) {
    this.options = { exclude: [], ...options };
    this.exclude = this.options.exclude
  }
  apply(compiler) {
    compiler.hooks.emit.tapPromise("ClearFile", (compilation) => {
      return new Promise((resolve, reject) => {
        const outputOpts = compiler.options.output;
        removeDir(outputOpts.path, this.exclude)
        resolve()
      })
    });
  }
}
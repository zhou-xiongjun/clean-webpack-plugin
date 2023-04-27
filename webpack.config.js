const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const ClearFile = require("./plugins/ClearFile.js")

module.exports = {
  entry: {
    index: "./src/index.js",
    a: "./src/a.js",
    b: "./src/b.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name]-[hash:5].js"
  },
  plugins: [
    new ClearFile()
  ],
  module: {
    rules: [
    ]
  }
}
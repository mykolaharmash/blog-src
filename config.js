let path = require('path')

let distDir = process.argv.slice(2)[0]

function generateConfig () {
  return {
    distDir: path.resolve(__dirname, distDir || './dist'),
    postsDir: path.resolve(__dirname, './posts'),
    assetsDir: path.resolve(__dirname, './assets'),
    cnameFile: path.resolve(__dirname, './CNAME')
  }
}

module.exports = generateConfig()

let path = require('path')

function generateConfig () {
  return {
    distDir: path.resolve(__dirname, './dist'),
    postsDir: path.resolve(__dirname, './posts')
  }
}

module.exports = generateConfig()

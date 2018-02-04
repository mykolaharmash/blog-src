const fs = require('fs')
const { articlesDir } = require('../config')

function readArticlesList () {
  return fs.readdirSync(articlesDir)
    .filter((item) => {
      return fs.statSync(`${ articlesDir }/${ item }`).isDirectory()
    })
}

module.exports = readArticlesList

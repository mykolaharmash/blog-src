const fs = require('fs')

function readContentIds (contentItemsDir) {
  return fs
    .readdirSync(contentItemsDir)
    .filter(item => {
      return fs.statSync(`${ contentItemsDir }/${ item }`).isDirectory()
    })
}

module.exports = readContentIds

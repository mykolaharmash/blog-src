let template = require('./code-block.template')

module.exports = function codeBlock ({ codeStructure, lang }) {
  return template({ codeStructure, lang })
}



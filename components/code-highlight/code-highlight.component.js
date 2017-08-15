let highlight = require('highlight.js')

module.exports = function codeBlock ({ codeString, lang }) {
  return highlight.highlight(lang, codeString).value.trim()
}



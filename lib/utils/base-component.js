const fs = require('fs')
const path = require('path')

const config = require('../../config')
const expandComponentsTree = require('./expand-components-tree')

class Component {
  expandChildren (html, componentsMap) {
    const ast = expandComponentsTree(html, componentsMap)

    return ast.content.children
  }

  generateStylesUrl (styleName) {
    this.checkComponentDirGetter()

    if (!styleName) {
      throw new Error('No style name provided')
    }

    const componentDirName = path.basename(this.constructor.componentDir)

    return (
      `${ config.componentsPublicUrl }/` +
      `${ componentDirName }/${ styleName }.css`
    )
  }

  readTemplate (templateName) {
    this.checkComponentDirGetter()

    if (!templateName) {
      throw new Error('No template name provided')
    }

    const templatePath = (
      `${ this.constructor.componentDir }/${ templateName }.html`
    )

    return fs.readFileSync(templatePath, 'utf8')
  }

  checkComponentDirGetter () {
    if (!this.constructor.componentDir) {
      throw new Error(
        `Component ${ this.constructor.name } must have ` +
        'static getter "componentDir" with an absolute path to ' +
        'the component\'s folder'
      )
    }
  }
}

module.exports = Component

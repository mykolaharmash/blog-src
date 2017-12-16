const { tokenize, constructTree } = require('hyntax')
const { clearAst } = require('hyntax/lib/helpers')
const {
  NODE_TAG
} = require('hyntax/lib/constants/ast-nodes')

function expandComponents (nodes, componentsMap) {
  const componentsNames = Object.keys(componentsMap)

  return nodes.reduce((precessedNodes, node) => {
    let generatedNodes = [node]

    if (node.content.children) {
      node.content.children = expandComponents(
        node.content.children,
        componentsMap
      )
    }

    if (
      node.nodeType === NODE_TAG &&
      componentsNames.includes(node.content.name)
    ) {
      const attributes = node.content.attributes
      const children = node.content.children
      const component = new componentsMap[node.content.name]()

      generatedNodes = component.render(attributes, children)
    }

    precessedNodes = precessedNodes.concat(generatedNodes)

    return precessedNodes
  }, [])
}

function expandComponentsTree (html, componentsMap = {}) {
  if (!html) {
    throw new Error('No HTML string provided to parse and expand components')
  }

  const { tokens } = tokenize(html)
  const { ast } = constructTree(tokens)
  const cleanAst = clearAst(ast)

  cleanAst.content.children = expandComponents(
    cleanAst.content.children,
    componentsMap
  )

  return cleanAst
}

module.exports = expandComponentsTree

const {
  NODE_DOCUMENT,
  NODE_DOCTYPE,
  NODE_TAG,
  NODE_TEXT,
  NODE_COMMENT,
  NODE_SCRIPT,
  NODE_STYLE
} = require('hyntax/lib/constants/ast-nodes')

function serializeChildren (children = []) {
  return children.map((node) => {
    return serializeNode(node)
  }).join('')
}

function serializeNode (node) {
  switch (node.nodeType) {
    case NODE_DOCUMENT: {
      return serializeDocumentNode(node)
    }

    case NODE_DOCTYPE: {
      return ''
    }

    case NODE_TAG: {
      return serializeTagNode(node)
    }

    case NODE_TEXT: {
      return serializeTextNode(node)
    }

    case NODE_COMMENT: {
      return ''
    }

    case NODE_SCRIPT: {
      return ''
    }

    case NODE_STYLE: {
      return ''
    }

    default: {
      throw new Error(
        `Unexpected node type for serialization: ${ node.nodeType }`
      )
    }
  }
}

function serializeDocumentNode (node) {
  return serializeChildren(node.content.children)
}

function serializeTagNode (node) {
  let attributes = serializeTagAttributes(node.content.attributes)

  if (attributes !== '') {
    attributes = ` ${ attributes }`
  }

  if (node.content.selfClosing) {
    return `<${ node.content.name }${ attributes }/>`
  }

  const children = serializeChildren(node.content.children)

  return (
    `<${ node.content.name }${ attributes }>` +
    children +
    `</${ node.content.name }>`
  )
}

function serializeTagAttributes (attributes = []) {
  return attributes.map((item) => {
    let serialized = ''

    if (item.key !== undefined) {
      serialized += item.key.content
    }

    if (item.value !== undefined) {
      serialized += `="${ item.value.content }"`
    }

    return serialized
  }).join(' ')
}

function serializeTextNode (node) {
  return node.content.value.content
}

function serializeTree (tree) {
  if (Array.isArray(tree)) {
    return serializeChildren(tree)
  }

  if (typeof tree === 'object') {
    return serializeNode(tree)
  }

  throw new Error(
    'Expected array of nodes or a single node ' +
    `for serialization, received ${ typeof tree }`
  )
}

module.exports = serializeTree

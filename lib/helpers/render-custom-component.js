function renderCustomComponent (
  componentConstructor,
  attributes = {},
  nestedHtml = ''
) {
  const component = new componentConstructor()

  return component.render(attributes, nestedHtml)
}

module.exports = renderCustomComponent

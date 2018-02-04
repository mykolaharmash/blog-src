const { renderTemplate } = require('teig')

function renderCustomComponent (
  componentConstructor,
  attributes = {},
  nestedHtml = ''
) {
  const component = new componentConstructor()

  return component.render(attributes, nestedHtml)
}

function customRenderTemplate (template, data, componentsMap) {
  return renderTemplate(
    template,
    data,
    componentsMap,
    renderCustomComponent
  )
}

module.exports = customRenderTemplate

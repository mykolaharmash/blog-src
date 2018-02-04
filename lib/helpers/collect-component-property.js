function collectComponentProperty (componentsMap, propertyKey) {
  return Object
    .values(componentsMap)
    .reduce((result, component) => {
      if (component[propertyKey] !== undefined) {
        result += component[propertyKey]
      }

      if (component.componentsMap !== undefined) {
        result += collectComponentProperty(component.componentsMap, propertyKey)
      }

      return result
    }, '')
}

module.exports = collectComponentProperty

/**
 * Recursively goes through each component
 * in componentsMap and collects a static
 * property into resulting property map.
 */

function collectComponentProperty (componentsMap, propertyKey) {
  return Object
    .keys(componentsMap)
    .reduce((result, componentName) => {
      if (result[componentName] !== undefined) {
        return result
      }

      const component = componentsMap[componentName]

      if (component[propertyKey] !== undefined) {
        result[componentName] = component[propertyKey]
      }

      if (component.componentsMap !== undefined) {
        result = Object.assign(
          result,
          collectComponentProperty(component.componentsMap, propertyKey)
        )
      }

      return result
    }, {})
}

module.exports = collectComponentProperty

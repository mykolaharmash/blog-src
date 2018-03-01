const fs = require('fs')
const path = require('path')

const renderTemplate = require('../../helpers/render-template')
const renderMarkdown = require('../../helpers/render-markdown')
const renderStylesLink = require('../../helpers/render-styles-link')
const Link = require('../link/link.component')
const { moviesDir } = require('../../config')

const ROOT_TEMPLATE = fs.readFileSync(path.resolve(__dirname, './movie.component.html'), 'utf8')

class Movie {
  static get componentsMap () {
    return {
      'blog-link': Link
    }
  }

  static get styles () {
    return renderStylesLink('components/movie/movie.component.css')
  }

  render (attrs) {
    const id = attrs['movie-id']

    if (id === undefined) {
      throw new Error('No "id" attribute was provided for Movie component')
    }

    const mdPath = `${ moviesDir }/${ id }/${ id }.movie.md`
    const movie = renderMarkdown(mdPath, { blockName: 'movie' })

    return renderTemplate(
      ROOT_TEMPLATE,
      {
        title: movie.metadata.title,
        imdbUrl: movie.metadata.imdbUrl,
        posterUrl: movie.metadata.posterUrl,
        posterAlt: movie.metadata.posterAlt,
        comment: movie.html
      },
      Movie.componentsMap
    )
  }
}

module.exports = Movie

const readArticlesList = require('../../helpers/read-articles-list')

class ArticlesArchive {
  groupArticlesByYear (articlesList) {
    const groups = {}

    articlesList.forEach(article => {
      const year = (new Date(article.metadata.publishDate)).getFullYear()

      if (groups[year] === undefined) {
        groups[year] = []
      }

      groups[year].push(article)
    })

    return groups
  }

  render () {
    const articlesList = readArticlesList()
    const groups = this.groupArticlesByYear(articlesList)

    return 'archive'
  }
}

module.exports = ArticlesArchive


const DEV_HOST = 'localhost'
const DEV_PORT = '8080'

function getBlogUrl () {
  return process.env.ENVIRONMENT === 'production'
    ? 'https://nikgarmash.com'
    : `http://${ DEV_HOST }:${ DEV_PORT }`
}

module.exports = {
  title: 'Nikolay Garmash\'s Blog',
  description: 'Articles about frontend development, design and UI stuff in general',
  blogUrl: getBlogUrl(),
  author: 'garmash.nikolay@gmail.com (Nikolay Garmash)',

  // Folder in witch blog is going to be built
  distDir: `${ process.cwd() }/dist`,

  articlesDir: `${ process.cwd() }/content/articles`,
  moviesDir: `${ process.cwd() }/content/movies`,

  // URL which serves assets, like CSS
  // and images, for components, pages, etc.
  assetsUrl: '/assets',

  // URL which serves articles
  // directory containing generated HTML
  // along with the assets like CSS and images
  articlesUrl: '/articles',

  // URL which serves unique pages with a
  // specific purpose like articles archive,
  // movies list, etc. It's a parent URL, whole page
  // URL should be like /pages/archive
  pagesUrl: '/pages',

  rssUrl: '/rss.xml'
}

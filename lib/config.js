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

  articlesDir: `${ process.cwd() }/articles`,

  // URL which will serve assets, like CSS
  // and images, for components and pages
  assetsUrl: '/assets',

  // URL which will serve articles
  // directory containing generated HTML
  // along with the assets like CSS and images
  articlesUrl: '/articles',

  pagesUrl: '/pages',

  rssUrl: '/rss.xml'
}

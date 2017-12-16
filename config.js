module.exports = {
  title: 'Nikolay Garmash\'s Blog',
  description: 'Articles about frontend development, design and UI stuff in general',
  url: 'https://nikgarmash.com',
  author: 'Nikolay Garmash',

  // Folder in witch blog is going to be built
  distDir: `${ process.cwd() }/dist`,

  articlesDir: `${ process.cwd() }/articles`,

  // URL which will serve assets, like CSS
  // and images, for components and pages
  assetsPublicUrl: '/assets',

  // URL which will serve articles
  // directory containing generated HTML
  // along with the assets like CSS and images
  articlesPublicUrl: '/articles',

  rssPublicUrl: '/rss.xml'
}

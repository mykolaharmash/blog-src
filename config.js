module.exports = {
  // Folder in witch blog is going to be built
  distDir: `${ process.cwd() }/dist`,

  articlesDir: `${ process.cwd() }/articles`,

  // URL which will serve raw components
  // directory to access component's assets
  // like styles and images
  componentsPublicUrl: '/components',

  // URL which will serve articles along with
  // assets inside article directory (e.g. images
  // or specific article styles)
  articlesPublicUrl: '/articles'
}

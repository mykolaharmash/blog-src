let header = require('../../components/header/header.component')

function renderStyle (url) {
  return `<link rel="stylesheet" href="${ url }">`
}

function renderStyles (styles) {
  if (!Array.isArray(styles)) {
    return ''
  }

  return styles.reduce((result, url) => {
    result += renderStyle(url)

    return result
  }, '')
}

module.exports = function postRootTemplate (props) {
  let {
    title,
    publishDate,
    styles,
    renderContent
  } = props

  let postStyles = renderStyles(styles)

  return `
    <html lang="en">
      <head>
        <title>${ title }</title>

        <link rel="stylesheet" href="../../assets/global.css">
        <link rel="stylesheet" href="../../assets/post.css">
        
        ${ postStyles }
      </head>
      <body>
        ${ header({ withLink: true }) } 
        
        <article class="post">
          <div class="post__header">
            <h1 class="post__title">${ title }</h1>
            <div class="post__date">${ publishDate }</div>
          </div>
          
          <div class="post__body">
            ${ renderContent() } 
          </div>
        </article>
      </body>
    </html>
  `
}

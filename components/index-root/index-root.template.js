let header = require('../header/header.component')
let postsList = require('../posts-list/posts-list.component')

module.exports = function indexRootTemplate (props) {
  return `
    <html>
      <head>
        <title>Some thing</title> 
      </head>    
      
      <body>
        ${ header({ withLink: false }) } 
        
        ${ postsList(props) }
      </body>
    </html>
  `
}

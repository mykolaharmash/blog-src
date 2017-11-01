let header = require('../header/header.component')
let postsList = require('../posts-list/posts-list.component')

module.exports = function indexRootTemplate (props) {
  return `
    <html lang="en">
      <head>
        <title>Blog — Nikolai Garmash</title> 
        
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,500" rel="stylesheet"> 
        
        <link rel="stylesheet" href="./assets/global.css">
        <link rel="stylesheet" href="./assets/index.css">
      </head>    
      
      <body>
        ${ header({ withLink: false }) } 
        
        <div class="introduction">
          <p class="introduction__paragraph">
            Hey there! My name is Nikolai.
          </p>

          <p class="introduction__paragraph">
            I occasionally write about front-end, design and other UI stuff in
            general.
          </p>
        </div>
        
        ${ postsList(props) }
      </body>
    </html>
  `
}

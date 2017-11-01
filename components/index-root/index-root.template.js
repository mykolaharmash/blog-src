let header = require('../header/header.component')
let postsList = require('../posts-list/posts-list.component')

module.exports = function indexRootTemplate (props) {
  return `
    <html lang="en">
      <head>
        <title>Nikolai Garmash's Blog</title> 
        
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,500" rel="stylesheet"> 
        
        <link rel="stylesheet" href="./assets/global.css">
        <link rel="stylesheet" href="./assets/index.css">
        
        <link rel="alternate" type="application/rss+xml" title="Nikolai Garmash's Blog" href="./rss.xml">
      </head>    
      
      <body>
        ${ header({ withLink: false }) } 
        
        <div class="introduction">
          <p class="introduction__paragraph">
            Hey there! My name is Nikolai.
          </p>

          <p class="introduction__paragraph">
            I occasionally write about frontend development, design and 
            other UI stuff in general.
          </p>
        </div>
        
        ${ postsList(props) }
      </body>
    </html>
  `
}

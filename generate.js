let fs = require('fs-extra')

let config = require('./config')
let indexRoot = require('./components/index-root/index-root.component')

function getPostFilepath (postId, filename) {
  return `${ config.postsDir }/${ postId }/${ filename }`
}

function readPostMetadata (postId) {
  let metadataPath = getPostFilepath(postId, `${ postId }.metadata.json`)
  let hasMetadata = fs.existsSync(metadataPath)

  if (!hasMetadata) {
    throw new Error(`Post ${ postId } does not have metadata file ${ metadataPath }`)
  }

  return fs.readJSONSync(metadataPath)
}

function readPost (postId) {
  let markdownPath = getPostFilepath(postId, `${ postId }.md`)
  let hasMarkdown = fs.existsSync(markdownPath)

  if (!hasMarkdown) {
    throw new Error(`Post ${ postId } does not have markdown file ${ markdownPath }`)
  }

  return {
    contentType: 'markdown',
    content: fs.readFileSync(markdownPath, 'utf8')
  }
}

function readPosts () {
  let list = fs.readdirSync(config.postsDir)

  return list
    .filter((item) => {
      let stat = fs.statSync(`${ config.postsDir }/${ item }`)

      return stat.isDirectory()
    })
    .map((postId) => {
      let userMetadata = readPostMetadata(postId)
      let post = readPost(postId)

      return Object.assign(
        { id: postId },
        userMetadata,
        post
      )
    })
}

function generateIndex (postsList) {
  return indexRoot({ postsList })
}

function saveIndex (indexContent) {
  fs.writeFileSync(`${ config.distDir }/index.html`, indexContent)
}

function generate () {
  fs.removeSync(config.distDir)
  fs.ensureDirSync(config.distDir)

  let postsList = readPosts()
  let indexContent = generateIndex(postsList)

  saveIndex(indexContent)

}

generate()

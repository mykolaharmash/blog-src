let fs = require('fs-extra')

let config = require('./config')
let indexRoot = require('./components/index-root/index-root.component')
let postRoot = require('./components/post-root/post-root.component')

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
  let jsPath = getPostFilepath(postId, `${ postId }.post.js`)
  let hasJs = fs.existsSync(jsPath)

  if (!hasJs) {
    throw new Error(`Post ${ postId } does not have js file ${ jsPath }`)
  }

  return {
    renderContent: require(jsPath)
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

function generateIndexPage (postsList) {
  return indexRoot({ postsList })
}

function saveIndexPage (indexContent) {
  fs.writeFileSync(`${ config.distDir }/index.html`, indexContent)
}

function generatePostPage (post) {
  return postRoot(post)
}

function savePostPage (post, postPageContent) {
  fs.writeFileSync(
    `${ config.distDir }/posts/${ post.id }/${ post.id }.html`,
    postPageContent
  )
}

function copyAssets () {
  fs.copySync(config.assetsDir, `${ config.distDir }/assets`)
}

function copyPosts () {
  fs.copySync(config.postsDir, `${ config.distDir }/posts`)
}

function copyCname () {
  fs.copySync(config.cnameFile, `${ config.distDir }/CNAME`)
}

function generate () {
  fs.ensureDirSync(config.distDir)

  copyAssets()
  copyPosts()
  copyCname()

  let postsList = readPosts()
  let indexPageContent = generateIndexPage(postsList)

  saveIndexPage(indexPageContent)

  postsList.forEach((postItem) => {
    let postPageContent = generatePostPage(postItem)

    savePostPage(postItem, postPageContent)
  })


}

generate()

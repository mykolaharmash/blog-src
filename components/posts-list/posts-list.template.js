function getPostUrl (id) {
  return `./posts/${ id }/${ id }.html`
}

function renderItem (item) {
  return `
    <div class="posts-list__item">
      <a href="${ getPostUrl(item.id) }">
        ${ item.title }
      </a>
      <div class="posts-list__item-date">${ item.publishDate }</div>
    </div>
  `
}

module.exports = function postsListTemplate ({ postsList }) {
  let items = postsList.reduce((result, item) => {
    result += renderItem(item)

    return result
  }, '')

  return `
    <div class="posts-list">
      <div class="posts-list__caption">
        Look, what I've got so far:
      </div>
     
      ${ items } 
    </div>
  `
}

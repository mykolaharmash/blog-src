module.exports = function headerTemplate ({ withLink }) {
  let title

  if (withLink) {
    title = `
      <a
        class="header__title"
        href="../../"
      >N.</a>
    `
  } else {
    title = `
      <div class="header__title">N.</div>
    `
  }

  return `
    <header class="header">
      <nav class="header__logo">
        ${ title }
      </nav>
    </header>
  `
}

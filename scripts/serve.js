const spawn = require('child_process').spawn
const express = require('express')
const app = express()
const router = express.Router({ strict: true })

const CWD = process.cwd()

function generate () {
  return new Promise((resolve, reject) => {
    const generate = spawn('node', [`${ __dirname }/generate.js`])

    generate.stdout.on('data', (data) => {
      console.log(data.toString())
    })

    generate.stderr.on('data', (data) => {
      console.error(data.toString())
    })

    generate.on('error', (err) => {
      reject(err)
    })

    generate.on('close', (code, signal) => {
      console.log(`generate exited with a code ${ code }, signal ${ signal }`)

      resolve({ code, signal })
    })
  })
}

function generatePage (req, res) {
  const startTime = process.hrtime()

  generate()
    .then(() => {
      const time = process.hrtime(startTime)
      console.log(time[0] * 1e3 + time[1] / 1e6)
      const file = `${ CWD }/dist${ req.path }index.html`

      return new Promise((resolve, reject) => {
        res.sendFile(file, (err) => {
          if (err) {
            reject(err)
          }

          resolve()
        })
      })
    })
    .catch((err) => {
      console.log(err)

      res.status(400)
      res.send(err.message)
    })
}

router.get(['/', '/articles/:articleId/', '/pages/:pageId/'], generatePage)
router.use('/', express.static(`${ CWD }/dist`))

app.use('/', router)

const server = app.listen(8080, 'localhost')

server.on('listening', () => {
  console.log('Open http://localhost:8080')
})

server.on('error', (err) => {
  throw err
})

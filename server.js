const express = require('express')
const fs = require('fs')
const manifest = require('./dist/server/ssr-manifest.json')
const path = require('path')
const { renderToString } = require('@vue/server-renderer')
const serialize = require('serialize-javascript')

const PORT = process.env.PORT || 8080
const appPath = path.join(__dirname, './dist', 'server', manifest['app.js'])
const createApp = require(appPath).default

const server = express()

server.use('/img', express.static(path.join(__dirname, './dist/client', 'img')))
server.use('/js', express.static(path.join(__dirname, './dist/client', 'js')))
server.use('/css', express.static(path.join(__dirname, './dist/client', 'css')))
server.use(
  '/favicon.ico',
  express.static(path.join(__dirname, './dist/client', 'favicon.ico'))
)

server.get('*', async (req, res) => {
  const { app, store } = await createApp(req.url)

  const appContent = await renderToString(app)
  console.log(store.state)
  const renderState = `
    <script>
      window.INITIAL_STORE = ${serialize(store.state)}
    </script>`

  fs.readFile(path.join(__dirname, '/dist/client/index.html'), (err, buffer) => {
    if (err) {
      throw err
    }

    const html = buffer
      .toString()
      .replace('<div id="app">', `${renderState}<div id="app">${appContent}`)

    res.setHeader('Content-Type', 'text/html')
    res.send(html)
  })
})

server.listen(PORT, () => {
  console.log(`You can navigate to http://localhost:${PORT}`)
})

import path from 'path'
import { createRequestHandler } from '@remix-run/express'
import { broadcastDevReady, installGlobals } from '@remix-run/node'
import express from 'express'
import sourceMapSupport from 'source-map-support'

// patch in Remix runtime globals
installGlobals()
sourceMapSupport.install()

const BUILD_DIR = path.resolve('./build/index.js')
const app = express()
app.use(express.static('public'))

// and your app is "just a request handler"
app.all('*', createRequestHandler({ build: require(BUILD_DIR) }))

app.listen(3000, async () => {
  if (process.env.NODE_ENV === 'development') {
    broadcastDevReady(require(BUILD_DIR))
  }
  console.log('App listening on http://localhost:3000')
})

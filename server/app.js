import webpack from 'webpack'
import path from 'path'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import express from 'express'
import routes from './routes'
import bodyParser from 'body-parser'
import boom from 'express-boom'
import validator from 'express-validator'

var config = require('../webpack.config')

const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json({ type: 'application/json' }))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get('/hello', function (req, res) {
  res.send('hello world')
})
app.use(validator())
app.use(boom())
app.use(routes)

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
})

export default app

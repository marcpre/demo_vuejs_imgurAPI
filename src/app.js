require('dotenv-safe').load()
const express = require('express')

const app = express()
const path = require('path')
const server = require('http').createServer(app)
const axios = require('axios')
const querystring = require('querystring')
const bodyParser = require('body-parser')
const logger = require('morgan')

process.on('uncaughtException', err =>
  console.error('uncaught exception: ', err))
process.on('unhandledRejection', (reason, p) =>
  console.error('unhandled rejection: ', reason, p))

app.use(logger(process.env.LOG_ENV))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false,
}))
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

const instance = axios.create({
  baseURL: 'https://api.imgur.com/3/',
  headers: {
    Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
  },
})

app.get('/search/:query', (req, res) => {
  const url = `gallery/search/top/0/?${querystring.stringify({ q: req.params.query })}`
  instance.get(url)
    .then((result) => {
      res.send(result.data.data.filter(item => !item.is_album && !item.nsfw && !item.animated))
    })
    .catch((error) => {
      console.log(error)
    })
})

// app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))
app.use(path.join(`${__dirname}/../public`), express.static(path.join(__dirname, 'public')))

if (process.env.NODE_ENV !== 'production') {
  require('reload')(server, app)
}

const port = process.env.APP_PORT || 8080
const host = process.env.APP_HOST || 'localhost'

server.listen(process.env.PORT, () => {
  console.log(`Listening on ${host}:${port}`)
})

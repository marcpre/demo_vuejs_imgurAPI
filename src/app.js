require('dotenv-safe').load()
const express = require('express')
const path = require('path')
const axios = require('axios')
const querystring = require('querystring')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const app = express()

process.on('uncaughtException', err =>
  console.error('uncaught exception: ', err))
process.on('unhandledRejection', (reason, p) =>
  console.error('unhandled rejection: ', reason, p))

app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, '/../public')))
app.use(cookieParser())

app.use(logger(process.env.LOG_ENV))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/views/index.html`))
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

const port = process.env.APP_PORT || 8080
const host = process.env.APP_HOST || 'localhost'

app.listen(port, () => {
  console.log(`Listening on ${host}:${port}`)
})

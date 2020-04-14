// Database user: postgres  pass: none  name: bookmarks
// Database user: postgres  pass: none  name: bookmarks-test

require ('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {NODE_ENV} = require('./config')
const validateBearerToken = require('./validate-bearer-token')
const errorHandler = require('./error-handler')
const bookmarkRouter = require('./bookmarks/bookmark-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common'

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())

app.use(validateBearerToken)


// router handles endpoints
app.use(bookmarkRouter)

app.get('/', (req,res) => {
  res.send('Hello world!')
})

// error handler to hide error details from the public
// once deployed to production environment
app.use(errorHandler) 

module.exports = app


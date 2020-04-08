require ('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {NODE_ENV} = require('./config')
const bookmarkRouter = require('./bookmark-router')
const errorHandler = require('./error-handler')

const app = express()

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common'

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())


//validate API key
app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    logger.error(`Unauthorized request to path: ${req.path}`)
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  // move to the next middleware 
  // app won't move on unless you tell it to
  next()
})

// router handles endpoints
app.use(bookmarkRouter)

app.get('/', (req,res) => {
  res.send('Hello world!')
})

// error handler to hide error details from the public
// once deployed to production environment
app.use(errorHandler) 

module.exports = app


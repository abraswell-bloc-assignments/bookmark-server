const express = require('express')
const uuid = require('uuid/v4')
const {isWebUri} = require('valid-url')
const logger = require('./logger')
const { bookmarks } = require('./store')

const bookmarkRouter = express.Router()
const bodyParser = express.json()


bookmarkRouter
    .route('/bookmarks')
    // return a list of all bookmarks at /bookmarks endpoint
    .get((req, res) => {
        res.json(bookmarks)
    })
    .post(bodyParser,(req, res) => {
        for (const field of ['title', 'url', 'rating']) {
            if (!req.body[field]) {
              logger.error(`${field} is required`)
              return res.status(400).send(`'${field}' is required`)
            }
          }

        const { title, url, description, rating} = req.body
        
        if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
            logger.error(`Invalid rating '${rating}' supplied`)
            return res.status(400).send(`'rating' must be a whole number between 0 and 5`)
          }
      
        if (!isWebUri(url)) {
            logger.error(`Invalid url '${url}' supplied`)
            return res.status(400).send(`'url' must be a valid URL`)
        }
    
        //get an id
        const id = uuid()
    
        const bookmark = {
            id,
            title,
            url,
            description,
            rating
        }
    
        bookmarks.push(bookmark)
    
        logger.info(`Bookmark with id ${id} created`)
    
        res
            .status(201)
            .location(`http://localhost:8000/bookmarks/${id}`)
            .json(bookmark)
    })
    


bookmarkRouter
    .route('/bookmarks/:id')
    // return a single bookmark w/ a given ID  
    // or 404 error if given ID is not valid
    // GET /bookmarks/:id
    .get((req, res) => {
        const { id } = req.params
        const bookmark = bookmarks.find(b => b.id == id)
        // make sure we found a bookmark
        if (!bookmark) {
        logger.error(`Bookmark with id ${id} not found.`);
        return res
            .status(404)
            .send('Bookmark Not Found');
        }
        // return results
        res
        .json(bookmark)
    })
    .delete((req, res) => {
        const {id} = req.params
    
        const bookmarkIndex = bookmarks.findIndex(b => b.id == id)
    
        if (bookmarkIndex === -1) {
        logger.error(`Bookmark with id ${id} not found.`)
        return res
            .status(404)
            .send('Bookmark Not Found')
        }
    
        bookmarks.splice(bookmarkIndex, 1)
    
        logger.info(`Bookmark with id ${id} deleted.`)
    
        res
        .status(204)
        .end()
    })


module.exports = bookmarkRouter
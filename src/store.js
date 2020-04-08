const uuid = require('uuid/v4')

// Sample Data
const bookmarks = [
  {
    id: uuid(),
    title: 'My Title',
    url: 'www.my-site.com',
    description: 'this is my site',
    rating: 4.5,
  },
  {
    id: uuid(),
    title: 'My Title',
    url: 'www.my-site.com',
    description: 'this is my site',
    rating: 3,
  },
  {
    id: uuid(),
    title: 'My Title',
    url: 'www.my-site.com',
    description: 'this is my site',
    rating: 10,
  }
]

  module.exports = {bookmarks}
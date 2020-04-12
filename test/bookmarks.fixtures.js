function makeBookmarksArray() {
    return [
      {
        id: 1,
        title: 'First test bookmark!',
        url: 'http://www.myfakeurl1.com',
        rating: '5',
        description: 'Lorem ipsum dolor sit amet.'
      },
      {
        id: 2,
        title: 'Second test bookmark!',
        url: 'http://www.myfakeurl2.com',
        rating: '2',
        description: 'Lorem ipsum dolor sit amet.'
      },
      {
        id: 3,
        title: 'Third test bookmark!',
        url: 'http://www.myfakeurl3.com',
        rating: '4',
        description: 'Lorem ipsum dolor sit amet.'
      },
      {
        id: 4,
        title: 'Fourth test bookmark!',
        url: 'http://www.myfakeurl4.com',
        rating: '1',
        description: 'Lorem ipsum dolor sit amet.'
      },
    ];
  }
  
  module.exports = {
    makeBookmarksArray,
  }
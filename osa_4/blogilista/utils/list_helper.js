const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (accumulator, currentValue) => {
    return accumulator + currentValue
  }

  const likesArray = blogs.map((item) => {
    return item.likes
  })

  return likesArray.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((item) => item.likes)) // Amount of likes for the most liked blog
  const favoriteBlog = blogs.find((item) => item.likes === mostLikes) // Find and return the object with most likes
  return _.pick(favoriteBlog, ['title', 'author', 'likes'])
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}

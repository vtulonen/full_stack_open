const { countBy } = require('lodash')
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
  return _.pick(favoriteBlog, ['title', 'author', 'likes']) // Return only watned properties
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined

  const authors = blogs.map((item) => {
    return item.author
  })

  const blogAmountsByAuthor = _.countBy(authors)
  const author = _.max(_.keys(blogAmountsByAuthor))
  return {
    author: author,
    blogs: blogAmountsByAuthor[author],
  }
}

const mostLikes = (blogs) => {
  const likes = _.map(blogs, 'likes')
  const authors = _.map(blogs, 'author')

  const combined = _.reduce( // object with authors and summed likes
    authors,
    (obj, key, i) => {
      if (obj[key] === undefined) {
        obj[key] = likes[i]
      } else {
        obj[key] += likes[i]
      }

      return obj
    },
    {}
  )

  const mostLikes = _.max(_.values(combined))
  const entries = Object.entries(combined) // array with entries in array
  const topAuthor = _.find(entries, (item) => item[1] === mostLikes)[0]

  return {
    author: topAuthor,
    likes: mostLikes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}

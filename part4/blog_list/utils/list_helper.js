const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (array) => {

  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return array.length === 0
    ? 0
    : array.reduce(reducer, 0)
}

const favoriteBlog = (array) => {
  const maxLikes = Math.max(...array.map(el => el.likes))
  const favBlog = array.find(el => el.likes === maxLikes)
  const object = {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes
  }
  return object
}

const mostBlogs = (objArray) => {
  const authorArray = _.map(objArray, 'author')
  const maxBlogs = _.chain(authorArray).countBy().toPairs().max(_.last)


  const author = maxBlogs.head().value()
  const numBlogs = maxBlogs.tail().value()

  const object = {
    author: author,
    blogs: numBlogs[0]
  }
  return object
}

const mostLiked = (array) => {
  obj = {}
  _.forEach(array, function (value) {
    if (value.author in obj) {
      obj[value.author] += value.likes
    }
    else {
      obj[value.author] = value.likes
    }
  })

  author = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b)
  likes = obj[author]
  const object = {
    author: author,
    likes: likes
  }
  return object
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLiked
}
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
  const obj = _.chain(authorArray).countBy().toPairs().max(_.last)
  
  
  const author = obj.head().value()
  const numBlogs = obj.tail().value()
  console.log(author)
  const object = {
    author: author,
    blogs: numBlogs[0]
  }
  return object
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
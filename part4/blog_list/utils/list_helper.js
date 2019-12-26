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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}

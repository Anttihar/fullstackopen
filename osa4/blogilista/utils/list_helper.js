const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = blogs => {
    return (
    blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
    )
}

const favoriteBlogs = blogs => {
    return lodash.maxBy(blogs, b => b.likes)
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlogs
  }
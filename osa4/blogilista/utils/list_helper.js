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
    const likes = blogs.map(blog => blog.likes)
    const maxLikes = likes.indexOf(Math.max(...likes))
    return blogs[maxLikes]
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlogs
  }
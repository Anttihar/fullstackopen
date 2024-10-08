const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 }).populate('comments', { comment: 1 })
  res.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
  const body = req.body
  const user = req.user
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
    
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const user = req.user
    
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: 'invalid blog id' })
  } else if (blog.user.toString() === user.id) {
    await Blog.findByIdAndDelete(req.params.id)
    return res.status(204).end()
  } else {
    res.status(401).json({ error: 'not access to delete this blog'})
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const editedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true})
  res.json(editedBlog)
})

blogsRouter.post('/:id/comments', async (req, res) => {
  const body = req.body
  const blog = await Blog.findById(req.params.id)
  const comment = new Comment({
    comment: body.comment,
    blog: blog._id
  })
  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  res.status(201).json(savedComment)
})

module.exports = blogsRouter
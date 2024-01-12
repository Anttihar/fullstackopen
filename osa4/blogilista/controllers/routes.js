const blogRoutes = require('express').Router()
const Blog = require('../models/blog')

blogRoutes.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
    
})

blogRoutes.post('/', async (req, res) => {
    const body = req.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
        
})

module.exports = blogRoutes
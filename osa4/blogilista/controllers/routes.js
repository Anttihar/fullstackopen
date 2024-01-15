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
        likes: body.likes || 0
    })
    
    try {
        const savedBlog = await blog.save()
        res.status(201).json(savedBlog)
    } catch {
        res.status(400).end()
    }     
})

blogRoutes.delete('/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

module.exports = blogRoutes
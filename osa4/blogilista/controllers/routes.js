const blogRoutes = require('express').Router()
const Blog = require('../models/blog')

blogRoutes.get('/', (req, res) => {
    Blog.find({}).then(blogs => {
        res.json(blogs)
    })
    .catch(error => next(error))
})

blogRoutes.post('/', (req, res, next) => {
    const body = req.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
    blog.save()
        .then(savedBlog => {
            res.status(201).json(savedBlog)
        })
})

module.exports = blogRoutes
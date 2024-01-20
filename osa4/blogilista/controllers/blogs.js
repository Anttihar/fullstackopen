const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
    
})

blogsRouter.post('/', async (req, res) => {
    const body = req.body

    const decodedToken = await jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

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

blogsRouter.delete('/:id', async (req, res) => {
    const decodedToken = await jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
        res.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)
    console.log('dekoodattu käyttäjä: ', user.id)

    const blog = await Blog.findById(req.params.id)
    console.log('blogi: ', blog.user.toString())

    if (blog.user.toString() === user.id) {
        await Blog.findByIdAndDelete(req.params.id)
        res.status(204).end()
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

module.exports = blogsRouter
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.testBlogs)
})

test('oikea määrä JSON-muotoisia blogeja', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.testBlogs.length)
})

test('id kentän nimen tarkastus', async () => {
    const blogs = await api.get('/api/blogs')

    blogs.body.every(blog => expect(blog.id).toBeDefined())
})

afterAll(async () => {
    await mongoose.connection.close()
})
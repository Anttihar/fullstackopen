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

test('uuden blogin lisääminen', async () => {
    const newBlog = {
        title: "Raipe kirja",
        author: "Raipe",
        url: "http://raipe.com",
        likes: 100,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.testBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('Raipe kirja')
})

afterAll(async () => {
    await mongoose.connection.close()
})
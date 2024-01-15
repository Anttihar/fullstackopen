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

test('tyhjä likes kenttä saa arvoksi 0', async () => {
    const newBlog = {
        title: "Samin blogi",
        author: "Sami",
        url: "http://saminblogi.fi"
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    expect(response.body.likes).toBe(0)
})

test('kentän title puuttuessa status 400', async () => {
    const newBlog = {
        author: "Pekka",
        url: "http://pekanblogi.fi",
        likes: 3
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('kentän url puuttuessa status 400', async () => {
    const newBlog = {
        title: "Pekan blogi",
        author: "Pekka",
        likes: 3
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('yksittäisen blogin poistaminen', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const noteToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${noteToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
})

afterAll(async () => {
    await mongoose.connection.close()
})
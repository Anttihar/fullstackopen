const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('Blogin lisäämiseen liittyvät testit', () => {
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
        const blogsAtStart = await helper.blogsInDb()
        
        const newBlog = {
            title: "Raipe kirja",
            author: "Raipe",
            url: "http://raipe.com",
            likes: 100
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

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
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    })

    test('yksittäisen blogin muokkaus', async () => {
        const editedBlog = {
            likes: 9
        }
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const updatedBlog = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(editedBlog)
            .expect(200)

        expect(blogToUpdate).not.toEqual(updatedBlog.body)
    })
})

describe('Käyttäjän lisäämiseen liittyvät testit', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('salasana', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('Uuden käyttäjän luominen', async () => {
        const usersAtStart = await helper.usersInDb()

        const user = {
            username: "Pena",
            name: "Pentti Hirvonen",
            password: "salasana"
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(user.username)
    })

    test('Uuden käyttäjän luonti epäonnistuu jos käyttäjänimi jo varattu', async () => {
        const usersAtStart = await helper.usersInDb()

        const user = {
            username: 'root',
            name: 'superuser',
            password: 'salasana'
        }

        const result = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('expected `username` to be unique')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtStart).toHaveLength(usersAtEnd.length)
    })

    test('liian lyhyt käyttäjänimi', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "ma",
            password: "salasana"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('liian lyhyt salasana', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "make",
            password: "sa"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
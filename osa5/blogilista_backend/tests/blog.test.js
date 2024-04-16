const listHelper = require('./list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        const blogs = []
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(0)
    })    
    
    test('when list has only one blog equals the likes of that', () => {
        const listWithOneBlog = [
            {
              _id: '5a422aa71b54a676234d17f8',
              title: 'Go To Statement Considered Harmful',
              author: 'Edsger W. Dijkstra',
              url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
              likes: 5,
              __v: 0
            }
          ]
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('all blogs', () => {
        const result = listHelper.totalLikes(listHelper.blogs)
        expect(result).toBe(36)
    })
})

test('best blog by likes', () => {
    const blogs = listHelper.blogs
    const result = listHelper.favoriteBlogs(blogs)
    expect(result).toEqual(blogs[2])
})
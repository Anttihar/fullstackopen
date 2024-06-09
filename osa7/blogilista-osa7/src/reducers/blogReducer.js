import { createSlice } from "@reduxjs/toolkit"

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    newBlog(state, action) {
      state.push({
        title: action.payload.title,
        author: action.payload.author,
        url: action.payload.url
      })
    },
    likeBlog(state, action) {
      const id = action.payload.id
      const blogToLike = state.find(b => b.id === id)
      const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1 }

      return state.map(blog => blog.id !== id
        ? blog
        : likedBlog
      )
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter(b => b.id !== id)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { newBlog, likeBlog, deleteBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer
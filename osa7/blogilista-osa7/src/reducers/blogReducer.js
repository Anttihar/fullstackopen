import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import { initializeUsers } from "./usersReducer"

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addLike(state, action) {
      const likedBlog = action.payload
      return state.map(blog => blog.id !== likedBlog.id
        ? blog
        : likedBlog
      )
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(b => b.id !== id)
    },
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    }
  }
})

export const { addLike, removeBlog, setBlogs, appendBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(newObject)
    dispatch(appendBlog(newBlog))
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }
}

export const likeBlog = (likedBlog) => {
  return async dispatch => {
    dispatch(addLike(likedBlog))
    await blogService.update(likedBlog)
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    dispatch(removeBlog(id))
    await blogService.remove(id)
    dispatch(initializeUsers())
  }
}

export default blogSlice.reducer
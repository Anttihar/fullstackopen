import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"
import { setNotification } from "./notificationReducer"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const votedAnecdote = action.payload
      return state.map(a => a.id !== votedAnecdote.id
        ? a
        : votedAnecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdotes(state, action) {
      state.push(action.payload)
    }
  }
})

export const { vote, setAnecdotes, appendAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote({ content, votes: 0 })
    dispatch(appendAnecdotes(newAnecdote))
    dispatch(setNotification(`Created ne anecdote: ${newAnecdote.content}`, 5))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.voteAnecdote(anecdote)
    dispatch(vote(votedAnecdote))
    dispatch(setNotification(`You voted anecdote: '${votedAnecdote.content}'`, 5))
  }
}

export default anecdoteSlice.reducer
import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (newAnecdote) => {
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const voteAnecdote = async (votedAnecdote) => {
  const response = await axios.put(`${baseUrl}/${votedAnecdote.id}`, votedAnecdote)
  return response.data
}

export default { getAll, createAnecdote, voteAnecdote }
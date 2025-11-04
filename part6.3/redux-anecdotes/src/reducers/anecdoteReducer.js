import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1
      }
    },
    createAnecdote(state, action) {
      // This action is kept for backward compatibility but will be handled via appendAnecdote after POST
      state.push(action.payload)
    }
  }
})

export const { setAnecdotes, appendAnecdote, voteAnecdote, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
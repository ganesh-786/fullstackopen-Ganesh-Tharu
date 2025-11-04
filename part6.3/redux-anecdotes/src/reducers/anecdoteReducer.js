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
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      )
    }
  }
})

export const { setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions

// Async action creators
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:3001/anecdotes')
    const anecdotes = await response.json()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:3001/anecdotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, votes: 0 })
    })
    const newAnecdote = await response.json()
    dispatch(appendAnecdote(newAnecdote))
    return newAnecdote
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    const anecdoteToVote = state.anecdotes.find(a => a.id === id)
    if (anecdoteToVote) {
      const updatedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      const response = await fetch(`http://localhost:3001/anecdotes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAnecdote)
      })
      const savedAnecdote = await response.json()
      dispatch(updateAnecdote(savedAnecdote))
      return savedAnecdote
    }
  }
}

export default anecdoteSlice.reducer
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { updateAnecdote } from '../services/requests'

const AnecdoteList = ({ anecdotes: allAnecdotes }) => {
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  
  const anecdotes = [...allAnecdotes]
    .filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => b.votes - a.votes)

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch(setNotification(`you voted '${updatedAnecdote.content}'`, 5))
    }
  })

  const vote = (id) => {
    const anecdote = allAnecdotes.find(a => a.id === id)
    if (anecdote) {
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      voteMutation.mutate(updatedAnecdote)
    }
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList


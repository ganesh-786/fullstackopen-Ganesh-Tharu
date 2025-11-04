import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'
import { createAnecdote as createAnecdoteRequest } from '../services/requests'

const AnecdoteForm = () => {
  const setNotification = useNotificationDispatch()
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: createAnecdoteRequest,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      setNotification(`you created '${newAnecdote.content}'`, 5)
    },
    onError: (error) => {
      const errorMessage = error.message || 'too short anecdote, must have length 5 or more'
      setNotification(errorMessage, 5)
    }
  })

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    createMutation.mutate(content)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm


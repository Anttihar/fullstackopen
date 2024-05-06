import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, updateAnecdote } from './requests'
import { useNotiDispatch } from './NotificationContext'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()
  const notiDispatch = useNotiDispatch()

  const voteNoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      console.log('voted: ', updatedAnecdote)
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'], anecdotes.map(a => a.id !== updatedAnecdote.id
          ? a
          : updatedAnecdote
        )
      )
      notiDispatch({ type: 'VOTE', payload: updatedAnecdote.content })
      setTimeout(() => {
        notiDispatch({ type: 'EMPTY' })
      }, 5000);
    }
  })

  const handleVote = (anecdote) => {
    voteNoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1
  })

  if ( isPending ) {
    return <div>loading data...</div>
  }

  if ( isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
    
      {data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

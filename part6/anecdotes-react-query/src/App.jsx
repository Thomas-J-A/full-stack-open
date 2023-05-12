import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchAnecdotes, incrementVotes } from './requests';

import AnecdoteForm from './components/AnecdotesForm/AnecdotesForm';
import Notification from './components/UI/Notification/Notification';

const App = () => {
  const queryClient = useQueryClient();

  const fetchAnecdotesQuery = useQuery({
    queryKey: ['anecdotes'],
    queryFn: fetchAnecdotes,
    retry: 1,
  });

  const incrementVotesMutation = useMutation({
    mutationFn: incrementVotes,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      const updatedAnecdotes = anecdotes.map((a) => (
        a.id === updatedAnecdote.id
          ? updatedAnecdote
          : a
      ));

      queryClient.setQueryData(['anecdotes'], updatedAnecdotes);
    },
  });
  
  const handleVote = (anecdote) => {
    incrementVotesMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
  };

  if (fetchAnecdotesQuery.isLoading) {
    return <div>Loading data...</div>;
  }

  if (fetchAnecdotesQuery.isError) {
    return <div>Anecdote service currently unavailable.</div>
  }

  const anecdotes = fetchAnecdotesQuery.data;

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
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
  );
};

export default App;

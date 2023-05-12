import { useQuery } from '@tanstack/react-query';

import { fetchAnecdotes } from './requests';

import AnecdoteForm from './components/AnecdotesForm/AnecdotesForm';
import Notification from './components/UI/Notification/Notification';

const App = () => {
  const anecdotesQuery = useQuery({
    queryKey: ['anecdotes'],
    queryFn: fetchAnecdotes,
    retry: 1,
  });
  
  const handleVote = (anecdote) => {
    console.log('vote');
  };

  if (anecdotesQuery.isLoading) {
    return <div>Loading data...</div>;
  }

  if (anecdotesQuery.isError) {
    return <div>Anecdote service currently unavailable.</div>
  }

  const anecdotes = anecdotesQuery.data;

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

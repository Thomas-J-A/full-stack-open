import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAnecdote } from '../../requests';

const AnecdoteForm = () => {
  const [ content, setContent ] = useState('');
  const queryClient = useQueryClient();
  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes']);
    },
  });

  const onCreate = (e) => {
    e.preventDefault()

    setContent('');
    createAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addAnecdote } from '../../slices/anecdotesSlice';

const AnecdoteForm = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleAddAnecdote = (e) => {
    e.preventDefault();
    
    dispatch(addAnecdote(content));

    setContent('');
  };

  return (
    <form onSubmit={handleAddAnecdote}>
      <h2>Create New Anecdote</h2>
      <label>
        Content:
        <input
          type="text"
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

export default AnecdoteForm;

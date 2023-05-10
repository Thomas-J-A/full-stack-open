import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addAnecdoteAsync } from '../../slices/anecdotesSlice';
import { showNotificationAsync } from '../../slices/notificationSlice';

const AnecdoteForm = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleAddAnecdote = async (e) => {
    e.preventDefault();
    
    const anecdoteData = {
      content,
      votes: 0,
    };

    dispatch(addAnecdoteAsync(anecdoteData));
    dispatch(showNotificationAsync({
      context: 'create',
      msg: content,
    }, 10));

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

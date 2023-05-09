import { useState } from 'react';
import { useDispatch } from 'react-redux';

import anecdotesService from '../../services/anecdotes.service';

import { addAnecdote } from '../../slices/anecdotesSlice';
import { showNotificationAsync } from '../../slices/notificationSlice';

const AnecdoteForm = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleAddAnecdote = async (e) => {
    e.preventDefault();
    
    const newAnecdote = {
      content,
      votes: 0,
    };

    const returnedAnecdote = await anecdotesService.create(newAnecdote);
    dispatch(addAnecdote(returnedAnecdote));
    dispatch(showNotificationAsync({
      context: 'create',
      msg: content,
    }));

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

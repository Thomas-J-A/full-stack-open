import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { doNewAnecdoteAdded } from '../../reducers/anecdotesReducer';

const AnecdoteForm = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();
    setContent('');

    dispatch(doNewAnecdoteAdded(content));
  };

  return (
    <form onSubmit={addAnecdote}>
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

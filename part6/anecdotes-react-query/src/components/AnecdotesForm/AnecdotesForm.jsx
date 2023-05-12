import { useState } from 'react';

const AnecdoteForm = () => {
  const [ content, setContent ] = useState('');

  const onCreate = (e) => {
    e.preventDefault()

    setContent('');
    console.log('new anecdote')
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

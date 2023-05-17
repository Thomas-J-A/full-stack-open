import { Link } from 'react-router-dom';

import { useGetAnecdotesQuery } from '../../../redux/apiSlice';

const IndexPage = () => {
  const {
    data: anecdotes = [],
    isLoading,
    isError,
  } = useGetAnecdotesQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Soz, an error most unexpected has arisen.</p>;
  }

  const anecdoteListItems = anecdotes.map((anecdote) => (
    <li key={anecdote.id}>
      <Link to={`anecdotes/${anecdote.id}`}>
        {anecdote.content}
      </Link>
    </li>
  ));

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdoteListItems}
      </ul>
    </div>
  );
};

export default IndexPage;

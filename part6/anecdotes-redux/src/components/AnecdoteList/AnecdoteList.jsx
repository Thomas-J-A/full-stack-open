import { useDispatch, useSelector } from 'react-redux';

import AnecdoteItem from '../AnecdoteItem/AnecdoteItem';

import { addVote } from '../../slices/anecdotesSlice';

import selectFilteredAndSortedAnecdotes from '../../selectors/selectFilteredAndSortedAnecdotes';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(selectFilteredAndSortedAnecdotes);

  const handleAddVote = (id) => {
    dispatch(addVote({ id }));
  };

  return (
    anecdotes.map((anecdote) => (
      <AnecdoteItem
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => handleAddVote(anecdote.id)}
      />
    ))
  );
};

export default AnecdoteList;

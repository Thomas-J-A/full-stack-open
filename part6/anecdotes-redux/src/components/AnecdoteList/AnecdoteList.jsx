import { useDispatch, useSelector } from 'react-redux';

import AnecdoteItem from '../AnecdoteItem/AnecdoteItem';

import { doVoteAdded } from '../../reducers/anecdotesReducer';

import selectFilteredAndSortedAnecdotes from '../../selectors/selectFilteredAndSortedAnecdotes';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(selectFilteredAndSortedAnecdotes);

  const vote = (id) => {
    dispatch(doVoteAdded(id));
  };

  return (
    anecdotes.map((anecdote) => (
      <AnecdoteItem
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => vote(anecdote.id)}
      />
    ))
  );
};

export default AnecdoteList;

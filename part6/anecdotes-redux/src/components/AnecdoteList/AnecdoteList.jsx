import { useDispatch, useSelector } from 'react-redux';

import AnecdoteItem from '../AnecdoteItem/AnecdoteItem';

import { doVoteAdded } from '../../reducers/anecdotes.reducer';

import selectSortedAnecdotes from '../../selectors/selectSortedAnecdotes.selector';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(selectSortedAnecdotes);

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

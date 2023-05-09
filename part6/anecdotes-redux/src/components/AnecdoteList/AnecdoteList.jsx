import { useDispatch, useSelector } from 'react-redux';

import AnecdoteItem from '../AnecdoteItem/AnecdoteItem';

import { addVote } from '../../slices/anecdotesSlice';
import { showNotificationAsync } from '../../slices/notificationSlice';

import selectFilteredAndSortedAnecdotes from '../../selectors/selectFilteredAndSortedAnecdotes';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(selectFilteredAndSortedAnecdotes);

  const handleAddVote = (anecdote) => {
    dispatch(addVote({id: anecdote.id }));
    dispatch(showNotificationAsync({
      context: 'vote',
      msg: anecdote.content,
    }));
  };

  return (
    anecdotes.map((anecdote) => (
      <AnecdoteItem
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => handleAddVote(anecdote)}
      />
    ))
  );
};

export default AnecdoteList;

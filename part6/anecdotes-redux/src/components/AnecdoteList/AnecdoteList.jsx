import { useDispatch, useSelector } from 'react-redux';

import AnecdoteItem from '../AnecdoteItem/AnecdoteItem';

import { addVoteAsync } from '../../slices/anecdotesSlice';
import { showNotificationAsync } from '../../slices/notificationSlice';

import selectFilteredAndSortedAnecdotes from '../../selectors/selectFilteredAndSortedAnecdotes';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(selectFilteredAndSortedAnecdotes);

  const handleAddVote = (anecdote) => {
    const newAnecdote = {
      content: anecdote.content,
      votes: anecdote.votes + 1,
    };

    dispatch(addVoteAsync(anecdote.id, newAnecdote));
    dispatch(showNotificationAsync({
      context: 'vote',
      msg: anecdote.content,
    }, 10));
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

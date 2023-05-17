import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  useGetAnecdoteQuery,
  useVoteAnecdoteMutation,
  useRemoveAnecdoteMutation,
} from '../../../redux/apiSlice';
import { showNotificationAsync } from '../../../redux/notificationSlice';

const AnecdoteDetailPage = () => {
  const { anecdoteId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: anecdote,
    isFetching,
  } = useGetAnecdoteQuery(anecdoteId);

  const [voteAnecdote] = useVoteAnecdoteMutation();
  const [removeAnecdote] = useRemoveAnecdoteMutation();

  const handleVote = async () => {
    try {
      await voteAnecdote({
        anecdoteId,
        votes: anecdote.votes + 1,
      }).unwrap();

      dispatch(showNotificationAsync({
        context: 'vote',
        msg: anecdote.content,
      }, 5));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async () => {
    try {
      await removeAnecdote(anecdoteId).unwrap();
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <b>{anecdote.author}</b>
      <p>{anecdote.content}</p>
      <p>{`Votes: ${anecdote.votes}`}</p>
      <button type="button" onClick={handleVote}>Vote</button>
      <button type="button" onClick={handleRemove}>Remove</button>
      <p>
        For more info, visit&nbsp;
        <a href="google.com">{anecdote.url}</a>
      </p>
    </div>
  );
};

export default AnecdoteDetailPage;

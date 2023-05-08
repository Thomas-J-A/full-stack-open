import Button from '../UI/Button/Button';

const AnecdoteItem = ({ anecdote, handleClick }) => (
  <div>
    <p>{anecdote.content}</p>
    <span>{`Votes: ${anecdote.votes}`}</span>
    <Button text="Vote" handleClick={handleClick} />
  </div>
);

export default AnecdoteItem;

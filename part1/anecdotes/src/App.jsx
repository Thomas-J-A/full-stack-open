import { useState } from 'react';

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.',
];

const getRandomNumber = (max) => (
  Math.floor(Math.random() * max)
);

const getIndexHighestValue = (array) => {
  return array.reduce((max, curr, i, arr) => (
    curr > arr[max] ? i : max
  ), 0);
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Likes = ({ likes, selected }) => (
  <p>
    {`${ likes[selected] } ${likes[selected] === 1 ? 'like' : 'likes'}`}
  </p>
);

const AnecdoteOfTheDay = ({ selected, likes }) => (
  <div>
    <h1>Anecdote Of The Day</h1>
    <p>{anecdotes[selected]}</p>
    <Likes likes={likes} selected={selected} />
  </div>
);

const AnecdoteMostVotes = ({ index, likes }) => (
  <div>
    <h2>And the anecdote with the most votes is...</h2>
    <p>{anecdotes[index]}</p>
    <Likes likes={likes} selected={index} />
  </div>
);

const App = () => {
  const [selected, setSelected] = useState(0);
  const [likes, setLikes] = useState(() => new Array(anecdotes.length).fill(0));

  const likeAnecdote = () => {
    const copy = [...likes];
    copy[selected] += 1;
    setLikes(copy);
  };

  const selectNewIndex = () => (
    setSelected(getRandomNumber(anecdotes.length))
  );

  const index = getIndexHighestValue(likes);

  return (
    <div>
      <AnecdoteOfTheDay selected={selected} likes={likes} />
      <Button handleClick={likeAnecdote} text="Like" />
      <Button handleClick={selectNewIndex} text="Random anecdote" />
      <AnecdoteMostVotes index={index} likes={likes} />
    </div>
  );
};

export default App;

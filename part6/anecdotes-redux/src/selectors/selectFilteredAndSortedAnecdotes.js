const selectFilteredAndSortedAnecdotes = ({ anecdotes, filter }) => {
  return anecdotes
    .filter((anecdote) => (
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    ))
    .sort((a, b) => (
      b.votes > a.votes
    ));
};

export default selectFilteredAndSortedAnecdotes;

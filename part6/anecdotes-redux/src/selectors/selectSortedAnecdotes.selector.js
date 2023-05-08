const selectSortedAnecdotes = (state) => {
  return [...state].sort((a, b) => (
    b.votes > a.votes
  ));
};

export default selectSortedAnecdotes;

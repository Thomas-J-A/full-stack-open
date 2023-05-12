import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const fetchAnecdotes = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createAnecdote = async (newAnecdote) => {
  const res = await axios.post(baseUrl, newAnecdote);
  return res.data;
};

const incrementVotes = async (updatedAnecdote) => {
  const res = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote);
  return res.data;
};

export {
  fetchAnecdotes,
  createAnecdote,
  incrementVotes,
};

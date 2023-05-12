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

export {
  fetchAnecdotes,
  createAnecdote,
};

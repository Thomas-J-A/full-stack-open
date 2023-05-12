import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const fetchAnecdotes = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export {
  fetchAnecdotes,
};

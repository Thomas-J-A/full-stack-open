import axios from 'axios';

const baseUrl = '/api/login';

const logIn = async ({ username, password }) => {
  const res = await axios.post(baseUrl, {
    username,
    password,
  });

  return res.data;
};

export default {
  logIn,
};

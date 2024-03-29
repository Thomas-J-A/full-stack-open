import { useState } from 'react';
import PropTypes from 'prop-types';

import blogService from '../../services/blog.service';
import loginService from '../../services/login.service';
import logger from '../../utils/logger.util';

const LoginForm = ({ setUser, setErrorMsg }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userAndToken = await loginService.logIn({
        username,
        password,
      });

      localStorage.setItem(
        'currentUserAndToken',
        JSON.stringify(userAndToken),
      );
      blogService.setToken(userAndToken.token);
      setUser(userAndToken);
      setUsername('');
      setPassword('');
    } catch (err) {
      logger.error('Error:', err.stack);
      setErrorMsg('Wrong credentials');
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">
          Username:
          <input
            id="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">Log In</button>
    </form>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setErrorMsg: PropTypes.func.isRequired,
};

export default LoginForm;

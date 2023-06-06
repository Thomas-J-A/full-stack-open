import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useLogInMutation } from '../../redux/api/apiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { showNotificationAsync } from '../../redux/features/notifications/notificationSlice';

import logger from '../../utils/logger.util';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [logIn] = useLogInMutation();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Log user in on server
      const userAndToken = await logIn({ username, password }).unwrap();

      // Store auth data in redux store
      dispatch(setCredentials(userAndToken));

      // Save auth data to localStorage so it can be retrieved on page refresh
      localStorage.setItem('currentUserAndToken', JSON.stringify(userAndToken));
    } catch (err) {
      logger.error('Error: ', err);

      // Show error message
      dispatch(
        showNotificationAsync({ success: false, msg: 'Wrong credentials' }, 5),
      );
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

export default LoginForm;

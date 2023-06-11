import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Link, useNavigate } from 'react-router-dom';

import LoginForm from './components/LoginForm/LoginForm';
import Notification from './components/UI/Notification/Notification';
import Button from './components/UI/Button/Button';

import { apiSlice } from './redux/api/apiSlice';
import {
  setCredentials,
  clearCredentials,
  selectCurrentUser,
} from './redux/features/auth/authSlice';

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  // If user has token in localStorage, log them in (when refreshing, etc)
  useEffect(() => {
    const currentUserJSON = localStorage.getItem('currentUserAndToken');

    if (currentUserJSON) {
      const userAndToken = JSON.parse(currentUserJSON);
      dispatch(setCredentials(userAndToken));
    }
  }, []);

  const handleLogout = () => {
    // Remove auth data form localStorage so it's not retrieved on refresh
    localStorage.removeItem('currentUserAndToken');

    // Remove auth data from redux store
    dispatch(clearCredentials());

    // Clear entire cache
    dispatch(apiSlice.util.resetApiState());

    navigate('/');
  };

  return (
    <div>
      {!currentUser && (
        <>
          <h1>Blog List App</h1>
          <Notification />
          <h2>Log in to app</h2>
          <LoginForm />
        </>
      )}

      {currentUser && (
        <>
          <nav className="mainNav">
            <ul className="mainNav__list">
              <li className="mainNav__item">
                <Link to="/">Blogs</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
            <span>{`Logged in as ${currentUser.name}`}</span>
            <Button text="Logout" handleClick={handleLogout} />
          </nav>
          <h1>Blog List App</h1>
          <Notification />
          <Outlet />
        </>
      )}
    </div>
  );
};

export default App;

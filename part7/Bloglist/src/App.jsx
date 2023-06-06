import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BlogList from './components/BlogList/BlogList';
import LoginForm from './components/LoginForm/LoginForm';
import NewBlogForm from './components/NewBlogForm/NewBlogForm';
import Toggleable from './components/Toggleable/Toggleable';
import Notification from './components/UI/Notification/Notification';
import Button from './components/UI/Button/Button';

import {
  clearCredentials,
  selectCurrentUser,
} from './redux/features/auth/authSlice';

// import blogService from './services/blog.service';

const App = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const blogFormRef = useRef();

  useEffect(() => {
    const currentUserJSON = localStorage.getItem('currentUserAndToken');

    if (currentUserJSON) {
      const userAndToken = JSON.parse(currentUserJSON);
      // blogService.setToken(userAndToken.token);
      setUser(userAndToken);
    }
  }, []);

  const handleLogout = () => {
    // Remove auth data form localStorage so it's not retrieved on refresh
    localStorage.removeItem('currentUserAndToken');

    // Remove auth data from redux store
    dispatch(clearCredentials());
  };

  return (
    <div>
      <h1>Blog List App</h1>

      <Notification />

      {!currentUser && (
        <div>
          <h2>Log in to app</h2>
          <LoginForm />
        </div>
      )}

      {currentUser && (
        <div>
          <h2>Blogs</h2>
          <p>{`Logged in as ${currentUser.name}`}</p>
          <Button text="Logout" handleClick={handleLogout} />
          <Toggleable buttonLabel="Create New Blog" ref={blogFormRef}>
            <h3>Create New Blog</h3>
            <NewBlogForm ref={blogFormRef} />
          </Toggleable>
          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;

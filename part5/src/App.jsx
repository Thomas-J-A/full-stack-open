import { useState, useEffect } from 'react';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/UI/notification/Notification';
import Error from './components/UI/error/Error';
import Button from './components/UI/button/Button';
import blogService from './services/blog.service';
import logger from './utils/logger.util';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const allBlogs = await blogService.getAll();
        setBlogs(allBlogs);
      } catch (err) {
        logger.error('Error:', err.stack);
        setErrorMsg('Could not fetch blogs');
        setTimeout(() => {
          setErrorMsg(null);
        }, 5000);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const currentUserJSON = localStorage.getItem('currentUserAndToken');

    if (currentUserJSON) {
      const userAndToken = JSON.parse(currentUserJSON);
      blogService.setToken(userAndToken.token);
      setUser(userAndToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUserAndToken');
    setUser(null);
  };

  return (
    <div>
      <h1>Blog List App</h1>

      {notificationMsg && <Notification message={notificationMsg} />}
      {errorMsg && <Error message={errorMsg} />}

      {!user && (
        <div>
          <h2>Log in to app</h2>
          <LoginForm setUser={setUser} setErrorMsg={setErrorMsg} />
        </div>
      )}

      {user && (
        <div>
          <h2>Blogs</h2>
          <p>{`Logged in as ${user.user.name}`}</p>
          <Button text="Logout" handleClick={handleLogout} />
          <h3>Create New Blog</h3>
          <NewBlogForm
            setBlogs={setBlogs}
            setNotificationMsg={setNotificationMsg}
            setErrorMsg={setErrorMsg}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

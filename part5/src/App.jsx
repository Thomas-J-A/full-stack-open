import { useState, useEffect, useRef } from 'react';

import BlogList from './components/BlogList/BlogList';
import LoginForm from './components/LoginForm/LoginForm';
import NewBlogForm from './components/NewBlogForm/NewBlogForm';
import Toggleable from './components/Toggleable/Toggleable';
import Notification from './components/UI/Notification/Notification';
import Error from './components/UI/Error/Error';
import Button from './components/UI/Button/Button';
import blogService from './services/blog.service';
import logger from './utils/logger.util';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const blogFormRef = useRef();

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

  const addBlog = async (newObj) => {
    try {
      const newBlog = await blogService.create(newObj);

      setBlogs((prev) => [...prev, newBlog]);
      blogFormRef.current.toggleVisibility();

      setNotificationMsg(`Blog added: ${newBlog.title} by ${newBlog.author}`);
      setTimeout(() => {
        setNotificationMsg(null);
      }, 5000);
    } catch (err) {
      logger.error('Error:', err.stack);

      setErrorMsg('Failed to create new blog');
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
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
          <Toggleable buttonLabel="Create New Blog" ref={blogFormRef}>
            <h3>Create New Blog</h3>
            <NewBlogForm createBlog={addBlog} />
          </Toggleable>
          <BlogList
            blogs={blogs}
            setBlogs={setBlogs}
            setErrorMsg={setErrorMsg}
            user={user}
          />
        </div>
      )}
    </div>
  );
};

export default App;

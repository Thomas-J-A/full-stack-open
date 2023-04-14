import { useState, useEffect } from 'react';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Notification from './components/UI/notification/Notification';
import Error from './components/UI/error/Error';
import blogService from './services/blog.service';
import loginService from './services/login.service';
import logger from './utils/logger.util';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userAndToken = await loginService.logIn({
        username,
        password,
      });

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
    <div>
      <h1>Blog List App</h1>

      {notificationMsg && <Notification message={notificationMsg} />}
      {errorMsg && <Error message={errorMsg} />}

      {!user && (
        <div>
          <h2>Log in to app</h2>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </div>
      )}

      {user && (
        <div>
          <h2>Blogs</h2>
          <p>{`Logged in as ${user.user.name}`}</p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

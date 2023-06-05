import { useState, useEffect, useRef } from 'react';

import BlogList from './components/BlogList/BlogList';
import LoginForm from './components/LoginForm/LoginForm';
import NewBlogForm from './components/NewBlogForm/NewBlogForm';
import Toggleable from './components/Toggleable/Toggleable';
import Notification from './components/UI/Notification/Notification';
import Button from './components/UI/Button/Button';

import { useGetBlogsQuery } from './redux/apiSlice';

import blogService from './services/blog.service';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const { data: BLOGS = [] } = useGetBlogsQuery();

  // dispatch(
  //   showNotificationAsync(
  //     { success: false, msg: 'Could not fetch blogs' },
  //     5,
  //   ),
  // );

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

      <Notification />

      {!user && (
        <div>
          <h2>Log in to app</h2>
          <LoginForm setUser={setUser} />
        </div>
      )}

      {user && (
        <div>
          <h2>Blogs</h2>
          <p>{`Logged in as ${user.user.name}`}</p>
          <Button text="Logout" handleClick={handleLogout} />
          <Toggleable buttonLabel="Create New Blog" ref={blogFormRef}>
            <h3>Create New Blog</h3>
            <NewBlogForm ref={blogFormRef} />
          </Toggleable>
          <BlogList blogs={BLOGS} setBlogs={setBlogs} user={user} />
        </div>
      )}
    </div>
  );
};

export default App;

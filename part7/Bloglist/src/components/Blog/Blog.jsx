import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Button from '../UI/Button/Button';

import { showNotificationAsync } from '../../redux/notificationSlice';

import blogService from '../../services/blog.service';

import logger from '../../utils/logger.util';

import './Blog.css';

const Blog = ({ blog, setBlogs, user }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  const likeBlog = async () => {
    try {
      const updatedBlog = await blogService.like(blog.id);

      setBlogs((prev) =>
        prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
      );
    } catch (err) {
      logger.error('Error:', err.stack);

      dispatch(
        showNotificationAsync(
          { success: false, msg: 'Failed to like blog' },
          5,
        ),
      );
    }
  };

  const removeBlog = async () => {
    try {
      // eslint-disable-next-line
      const isConfirmed = confirm(
        `Remove blog ${blog.title} by ${blog.author}?`,
      );

      if (isConfirmed) {
        await blogService.remove(blog.id);

        setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
      }
    } catch (err) {
      logger.error('Error:', err.stack);

      dispatch(
        showNotificationAsync(
          { success: false, msg: 'Failed to remove blog' },
          5,
        ),
      );
    }
  };

  return (
    <div className="blog">
      <div>
        {`${blog.title} | ${blog.author}`}
        <Button text="View" handleClick={toggleExpanded} />
      </div>

      {isExpanded && (
        <div>
          <p>{blog.url}</p>
          <p>
            {`Likes: ${blog.likes}`}
            <Button text="Like" handleClick={likeBlog} />
          </p>
          <p>{blog.user.name}</p>
          {blog.user.id === user.user.id && (
            <Button text="Remove" handleClick={removeBlog} />
          )}
        </div>
      )}
    </div>
  );
};

/* eslint-disable */
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.shape({
    user: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
};
/* eslint-enable */

export default Blog;

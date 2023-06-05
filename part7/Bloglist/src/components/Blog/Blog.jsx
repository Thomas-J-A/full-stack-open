import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Button from '../UI/Button/Button';

import {
  useLikeBlogMutation,
  useRemoveBlogMutation,
} from '../../redux/apiSlice';
import { showNotificationAsync } from '../../redux/notificationSlice';

import logger from '../../utils/logger.util';

import './Blog.css';

const Blog = ({ blog, user }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const [likeBlog] = useLikeBlogMutation();
  const [removeBlog] = useRemoveBlogMutation();

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  const handleLikeBlog = async () => {
    try {
      await likeBlog(blog.id).unwrap();
    } catch (err) {
      logger.error('Error:', err.stack);

      // Show error message
      dispatch(
        showNotificationAsync(
          { success: false, msg: 'Failed to like blog' },
          5,
        ),
      );
    }
  };

  const handleRemoveBlog = async () => {
    // eslint-disable-next-line
    const isConfirmed = confirm(`Remove blog ${blog.title} by ${blog.author}?`);

    try {
      if (isConfirmed) {
        await removeBlog(blog.id).unwrap();
      }
    } catch (err) {
      logger.error('Error: ', err);

      // Show error message
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
            <Button text="Like" handleClick={handleLikeBlog} />
          </p>
          <p>{blog.user.name}</p>
          {blog.user.id === user.user.id && (
            <Button text="Remove" handleClick={handleRemoveBlog} />
          )}
        </div>
      )}
    </div>
  );
};

/* eslint-disable */
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.shape({
    user: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
};
/* eslint-enable */

export default Blog;

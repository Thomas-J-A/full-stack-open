import { useState } from 'react';

import Button from './UI/button/Button';

import blogService from '../services/blog.service';

import logger from '../utils/logger.util';

import './blog.css';

const Blog = ({
  blog,
  setBlogs,
  setErrorMsg,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  const likeBlog = async () => {
    try {
      const updatedBlog = await blogService.like(blog.id);

      setBlogs((prev) => prev.map((b) => (
        b.id === updatedBlog.id
          ? updatedBlog
          : b
      )));
    } catch (err) {
      logger.error('Error:', err.stack);

      setErrorMsg('Failed to like blog');
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
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
        </div>
      )}
    </div>
  );
};

export default Blog;

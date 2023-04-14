import { useState } from 'react';

import blogService from '../services/blog.service';
import logger from '../utils/logger.util';

const NewBlogForm = ({
  setBlogs,
  setNotificationMsg,
  setErrorMsg,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createNewBlog = async (e) => {
    e.preventDefault();

    const newObj = {
      title,
      author,
      url,
    };

    try {
      const newBlog = await blogService.create(newObj);

      setTitle('');
      setAuthor('');
      setUrl('');
      setBlogs((prev) => [...prev, newBlog]);
      setNotificationMsg(`Blog added: ${title} by ${author}`);
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
    <form onSubmit={createNewBlog}>
      <div>
        Title:
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL:
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default NewBlogForm;

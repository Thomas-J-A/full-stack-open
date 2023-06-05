import { useState, forwardRef } from 'react';
import { useDispatch } from 'react-redux';

import { useAddNewBlogMutation } from '../../redux/apiSlice';
import { showNotificationAsync } from '../../redux/notificationSlice';

import logger from '../../utils/logger.util';

const NewBlogForm = forwardRef((props, ref) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const [addNewBlog] = useAddNewBlogMutation();

  const addBlog = async (e) => {
    e.preventDefault();

    const blogData = {
      title,
      author,
      url,
    };

    try {
      await addNewBlog(blogData).unwrap();

      // Hide form after successful submission
      ref.current.toggleVisibility();

      // Show success message
      dispatch(showNotificationAsync({ success: true, msg: title }, 5));

      // Clear input fields
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (err) {
      logger.error('Error: ', err);

      // Show error message
      dispatch(
        showNotificationAsync(
          { success: false, msg: 'Failed to create new blog' },
          5,
        ),
      );
    }
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor="title">
          Title:
          <input
            id="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Meditations"
          />
        </label>
      </div>
      <div>
        <label htmlFor="author">
          Author:
          <input
            id="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Marcus Aurelius"
          />
        </label>
      </div>
      <div>
        <label htmlFor="url">
          URL:
          <input
            id="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="meditations-book.co.uk"
          />
        </label>
      </div>
      <button type="submit">Create</button>
    </form>
  );
});

NewBlogForm.displayName = NewBlogForm;

export default NewBlogForm;

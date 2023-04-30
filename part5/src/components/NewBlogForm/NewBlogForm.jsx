import { useState } from 'react';
import PropTypes from 'prop-types';

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async (e) => {
    e.preventDefault();

    const newObj = {
      title,
      author,
      url,
    };

    createBlog(newObj);

    setTitle('');
    setAuthor('');
    setUrl('');
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
};

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default NewBlogForm;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useAddNewAnecdoteMutation } from '../../../redux/apiSlice';
import { showNotificationAsync } from '../../../redux/notificationSlice';

const CreateNewForm = () => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addNewPost] = useAddNewAnecdoteMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const anecdoteData = {
      content,
      author,
      url,
      votes: 0,
    };

    try {
      await addNewPost(anecdoteData).unwrap();

      dispatch(showNotificationAsync({
        context: 'create',
        msg: content,
      }, 5));

      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="content">
        Content:
        <input
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <label htmlFor="author">
        Author:
        <input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>
      <label htmlFor="url">
        URL:
        <input
          id="url "
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateNewForm;

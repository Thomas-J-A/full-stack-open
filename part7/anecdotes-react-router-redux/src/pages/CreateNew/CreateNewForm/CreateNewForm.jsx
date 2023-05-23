import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useField from '../../../hooks/useField';

import { useAddNewAnecdoteMutation } from '../../../redux/apiSlice';
import { showNotificationAsync } from '../../../redux/notificationSlice';

const CreateNewForm = () => {
  const content = useField('text');
  const author = useField('text');
  const url = useField('text');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addNewPost] = useAddNewAnecdoteMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const anecdoteData = {
      content: content.value,
      author: author.value,
      url: url.value,
      votes: 0,
    };

    try {
      await addNewPost(anecdoteData).unwrap();

      dispatch(showNotificationAsync({
        context: 'create',
        msg: content.value,
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
          type={content.type}
          value={content.value}
          onChange={content.onChange}
        />
      </label>
      <label htmlFor="author">
        Author:
        <input
          id="author"
          type={author.type}
          value={author.value}
          onChange={author.onChange}
        />
      </label>
      <label htmlFor="url">
        URL:
        <input
          id="url "
          type={url.type}
          value={url.value}
          onChange={url.onChange}
        />
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateNewForm;

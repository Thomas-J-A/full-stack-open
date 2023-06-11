import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAddCommentMutation } from '../../../redux/api/apiSlice';

import logger from '../../../utils/logger.util';

const CommentForm = () => {
  const [content, setContent] = useState('');
  const { id } = useParams();
  const [addComment] = useAddCommentMutation();

  const handleAddComment = async (e) => {
    e.preventDefault();

    const commentData = { content };

    try {
      await addComment({ blogId: id, commentData }).unwrap();

      setContent('');
    } catch (err) {
      logger.error('Error: ', err);
    }
  };

  return (
    <form onSubmit={handleAddComment}>
      <label htmlFor="content">
        Content:
        <input
          id="content"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="A snappy comment..."
        />
      </label>
      <button type="submit">Add</button>
    </form>
  );
};

export default CommentForm;

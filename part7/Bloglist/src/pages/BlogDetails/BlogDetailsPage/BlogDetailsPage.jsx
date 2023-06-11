import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import Button from '../../../components/UI/Button/Button';
import CommentsSection from '../CommentsSection/CommentsSection';

import {
  useGetBlogsQuery,
  useLikeBlogMutation,
  useRemoveBlogMutation,
} from '../../../redux/api/apiSlice';
import { selectCurrentUser } from '../../../redux/features/auth/authSlice';
import { showNotificationAsync } from '../../../redux/features/notifications/notificationSlice';

import logger from '../../../utils/logger.util';

const BlogDetailsPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: blogs = [], isLoading, isError } = useGetBlogsQuery();
  const [likeBlog] = useLikeBlogMutation();
  const [removeBlog] = useRemoveBlogMutation();

  if (isLoading) {
    return <p>Fetching blog...</p>;
  }

  if (isError) {
    dispatch(
      showNotificationAsync(
        { success: false, msg: 'Could not fetch blogs' },
        5,
      ),
    );

    return null;
  }

  const handleLikeBlog = async () => {
    try {
      await likeBlog(id).unwrap();
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

  const handleRemoveBlog = async (blog) => {
    // eslint-disable-next-line
    const isConfirmed = confirm(`Remove blog ${blog.title} by ${blog.author}?`);

    try {
      if (isConfirmed) {
        await removeBlog(id).unwrap();
        navigate('/');
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

  // Find blog corresponding to :id param from list of all blogs
  const blog = blogs.find((b) => b.id === id);

  // Format `likes` element
  const likes = blog.likes === 1 ? `${blog.likes} like` : `${blog.likes} likes`;

  const comments = blog.comments.map((c) => <li key={c.id}>{c.content}</li>);

  return (
    <div>
      <h1>{`${blog.title} | ${blog.author}`} </h1>
      <a href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </a>
      <div>
        <span>{likes}</span>
        <Button text="Like" handleClick={handleLikeBlog} />
      </div>
      <p>{`Added by ${blog.user.name}`}</p>
      {blog.user.id === currentUser.id && (
        <Button text="Remove" handleClick={() => handleRemoveBlog(blog)} />
      )}
      <CommentsSection comments={comments} />
    </div>
  );
};

export default BlogDetailsPage;

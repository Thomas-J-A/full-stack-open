import { useDispatch } from 'react-redux';

import { useGetBlogsQuery } from '../../redux/api/apiSlice';
import { showNotificationAsync } from '../../redux/features/notifications/notificationSlice';

import Blog from '../Blog/Blog';

const BlogList = () => {
  const dispatch = useDispatch();
  const { data: blogs = [], isLoading, isError } = useGetBlogsQuery();

  if (isLoading) {
    return <p>Fetching blogs...</p>;
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

  return (
    <div>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default BlogList;

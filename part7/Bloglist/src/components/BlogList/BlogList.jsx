import PropTypes from 'prop-types';

import Blog from '../Blog/Blog';

const BlogList = ({ blogs, setBlogs, user }) => (
  <div>
    {blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} />
      ))}
  </div>
);

/* eslint-disable */
BlogList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.shape({
    user: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
};
/* eslint-enable */

export default BlogList;

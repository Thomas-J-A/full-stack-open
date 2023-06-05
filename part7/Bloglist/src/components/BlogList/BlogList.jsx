import PropTypes from 'prop-types';

import Blog from '../Blog/Blog';

const BlogList = ({ blogs, user }) => (
  <div>
    {blogs
      .slice()
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
  </div>
);

/* eslint-disable */
BlogList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    user: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
};
/* eslint-enable */

export default BlogList;

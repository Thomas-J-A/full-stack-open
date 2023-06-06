import PropTypes from 'prop-types';

import Blog from '../Blog/Blog';

const BlogList = ({ blogs }) => (
  <div>
    {blogs
      .slice()
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
  </div>
);

/* eslint-disable */
BlogList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
};
/* eslint-enable */

export default BlogList;

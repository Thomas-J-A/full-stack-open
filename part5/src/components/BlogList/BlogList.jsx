import PropTypes from 'prop-types';

import Blog from '../Blog/Blog';

const BlogList = ({
  blogs,
  setBlogs,
  setErrorMsg,
  user,
}) => (
  <div>
    {blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          setBlogs={setBlogs}
          setErrorMsg={setErrorMsg}
          user={user}
        />
      ))}
  </div>
);

/* eslint-disable */
BlogList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setBlogs: PropTypes.func.isRequired,
  setErrorMsg: PropTypes.func.isRequired,
  user: PropTypes.shape({
    user: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
};
/* eslint-enable */

export default BlogList;

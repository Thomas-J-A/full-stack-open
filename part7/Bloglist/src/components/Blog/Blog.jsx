import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Blog.css';

const Blog = ({ blog }) => (
  <div className="blog">
    <Link to={`/blogs/${blog.id}`}>{`${blog.title} | ${blog.author}`}</Link>
  </div>
);

/* eslint-disable */
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};
/* eslint-enable */

export default Blog;

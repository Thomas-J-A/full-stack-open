import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as S from './Blog.styled';

const Blog = ({ blog }) => (
  <S.BlogPreview>
    <Link to={`/blogs/${blog.id}`}>{`${blog.title} | ${blog.author}`}</Link>
  </S.BlogPreview>
);

/* eslint-disable */
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};
/* eslint-enable */

export default Blog;

import { useRef } from 'react';

import BlogList from '../../../components/BlogList/BlogList';
import NewBlogForm from '../../../components/NewBlogForm/NewBlogForm';
import Toggleable from '../../../components/Toggleable/Toggleable';

const IndexPage = () => {
  const blogFormRef = useRef(null);

  return (
    <div>
      <Toggleable buttonLabel="Create New Blog" ref={blogFormRef}>
        <h3>Create New Blog</h3>
        <NewBlogForm ref={blogFormRef} />
      </Toggleable>
      <BlogList />
    </div>
  );
};

export default IndexPage;

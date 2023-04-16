import Blog from './Blog';

const BlogList = ({
  blogs,
  setBlogs,
  setErrorMsg,
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
        />
      ))}
  </div>
);

export default BlogList;

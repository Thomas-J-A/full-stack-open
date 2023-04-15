import { useState } from 'react';

import Button from './UI/button/Button';

import './blog.css';

const Blog = ({ blog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return (
    <div className="blog">
      <div>
        {`${blog.title} | ${blog.author}`}
        <Button text="View" handleClick={toggleExpanded} />
      </div>

      {isExpanded && (
        <div>
          <p>{blog.url}</p>
          <p>
            {`Likes: ${blog.likes}`}
            <Button text="Like" handleClick={null} />
          </p>
          <p>{blog.user.name}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;

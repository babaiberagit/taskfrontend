import React, { useState } from 'react';

const BlogCard = ({ blog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border p-4 rounded-md shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold">{blog.title}</h2>
      <p className="text-gray-500 text-sm">{new Date(blog.date).toLocaleDateString()}</p>
      <p className="mt-2 text-gray-700">
        {blog.content.slice(0, 50)}...{' '}
        <button
          className="text-blue-500 hover:underline"
          onClick={handleToggle}
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
      </p>

      {isExpanded && (
        <div className="mt-4">
          <p>{blog.content}</p>
          <button
            className="mt-2 text-red-500 hover:underline"
            onClick={handleToggle}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogCard;

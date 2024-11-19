import React, { useEffect, useState } from 'react';
import BaseLayout from '../../Layouts/BaseLayout';
import axios from 'axios';
import { BASE_URL } from '../../Utils/Element';
import BlogCard from '../../Components/Card/BlogCard';
import { Link } from 'react-router-dom';

const HomeComponent = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/blog/all`);
        setBlogs(response?.data?.data);  // assuming response.data is an array of blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <BaseLayout>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

      {blogs.map((blog) => (
        <Link to={`/single-blog/${blog?._id}`}>
          <BlogCard key={blog._id} blog={blog} />
          </Link>
        ))}

      
      </div>
    </BaseLayout>
  );
};

export default HomeComponent;

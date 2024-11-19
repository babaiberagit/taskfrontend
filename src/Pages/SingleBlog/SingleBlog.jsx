import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Utils/Element";
import BaseLayout from "../../Layouts/BaseLayout";
import { useSelector } from "react-redux";
import EditModal from "../../Components/Modal/EditModal";
import DeleteModal from "../../Components/Modal/DeleteModal";


const SingleBlogView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.userId);
// console.log(userId)
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlog(response?.data?.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleEditSave = (updatedBlog) => {
    setBlog(updatedBlog);
  };

  const handleDelete = () => {
    navigate("/");
  };

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <BaseLayout>
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-500 mb-6">{new Date(blog.date).toLocaleDateString()}</p>
        <p className="mb-6">{blog.content}</p>

        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete
          </button>
        </div>

        {isEditModalOpen && (
          <EditModal
            blogId={id}
            initialTitle={blog.title}
            initialContent={blog.content}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleEditSave}
            token={token}
            apiUrl={BASE_URL}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteModal
            blogId={id}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={handleDelete}
            token={token}
            apiUrl={BASE_URL}
          />
        )}
      </div>
    </BaseLayout>
  );
};

export default SingleBlogView;

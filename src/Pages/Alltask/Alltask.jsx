import React, { useEffect, useState } from 'react';
import BaseLayout from '../../Layouts/BaseLayout';
import Edit from '../../Assets/svg/edit.svg';
import Delete from '../../Assets/svg/delete.svg';
import axios from 'axios';
import { BASE_URL } from '../../Utils/Element';
import { useSelector } from "react-redux";
import DeleteModal from '../../Components/Modal/DeleteModal';
import EditModal from '../../Components/Modal/EditModal';
import CreateModal from '../../Components/Modal/CreateModal';

const BlogList = () => {
    const token = useSelector((state) => state.token);
    const [blogs, setBlogs] = useState([]); // Default empty array
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false); // State for CreateModal
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State for Success Modal

    // Fetch blogs from API
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/blog/user/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBlogs(response.data.blogs || []); // Fallback to empty array
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, [token]);

    // Handle Edit Save
    const handleEditSave = (updatedBlog) => {
        setBlogs((prevBlogs) =>
            prevBlogs.map((blog) => (blog._id === updatedBlog._id ? updatedBlog : blog))
        );
    };

    // Handle Delete
    const handleDelete = (id) => {
        setBlogs(blogs.filter((blog) => blog._id !== id));
    };

    // Handle Create Blog
    const handleCreateBlog = (newBlog) => {
        setShowSuccessModal(true); // Show success modal after creating blog
    };

    // Close Success Modal
    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
    };

    return (
        <BaseLayout>
            <div className="container mx-auto p-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
                    onClick={() => setShowCreateModal(true)} // Show Create Blog Modal
                >
                    Create Blog
                </button>

                <div className="space-y-4">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <div key={blog._id} className="bg-white p-4 border rounded-lg shadow-md">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-lg font-semibold text-blue-600 cursor-pointer">
                                            {blog.title}
                                        </h2>
                                        <p className="text-gray-600">{blog.content.slice(0, 100)}...</p>
                                    </div>
                                    <div className="flex space-x-4">
                                        <button onClick={() => { setSelectedBlog(blog); setShowEditModal(true); }}>
                                            <img src={Edit} alt="Edit" className="h-5 w-5" />
                                        </button>
                                        <button onClick={() => { setSelectedBlog(blog); setShowDeleteModal(true); }}>
                                            <img src={Delete} alt="Delete" className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No blogs found.</p>
                    )}
                </div>
            </div>

            {/* Modals */}
            {showCreateModal && (
                <CreateModal
                    onClose={() => setShowCreateModal(false)}
                    onCreate={handleCreateBlog} // Pass handleCreateBlog as a callback
                />
            )}

            {showEditModal && selectedBlog && (
                <EditModal
                    blog={selectedBlog}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleEditSave}
                />
            )}

            {showDeleteModal && selectedBlog && (
                <DeleteModal
                    blogId={selectedBlog._id}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={() => handleDelete(selectedBlog._id)}
                />
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Blog Created Successfully!</h2>
                        <p className="text-gray-600 mb-4">Your new blog has been created successfully.</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={handleCloseSuccessModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </BaseLayout>
    );
};

export default BlogList;
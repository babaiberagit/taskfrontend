import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../Utils/Element';

const CreateModal = ({ onClose, onCreate }) => {
    const token = useSelector((state) => state.token);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');

    const handleCreate = async () => {
        if (!newTitle || !newContent) {
            alert("Please provide both title and content");
            return;
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/blog/create`,
                { title: newTitle, content: newContent },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            onCreate(response.data.blog); // Pass created blog to parent
            onClose();
        } catch (error) {
            console.error("Error creating blog:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Create New Blog</h2>
                <input
                    className="w-full border p-2 mb-4"
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Blog Title"
                />
                <textarea
                    className="w-full border p-2 mb-4"
                    rows="8"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Blog Content"
                />
                <div className="flex justify-end space-x-2">
                    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleCreate}>
                        Create
                    </button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateModal;

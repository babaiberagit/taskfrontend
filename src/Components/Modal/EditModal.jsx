import React, { useState } from "react";
import axios from "axios";

const EditModal = ({ blogId, initialTitle, initialContent, onClose, onSave, token, apiUrl }) => {
  const [editTitle, setEditTitle] = useState(initialTitle);
  const [editContent, setEditContent] = useState(initialContent);

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `${apiUrl}/blog/update/${blogId}`,
        { title: editTitle, content: editContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onSave(response.data.data); // Pass updated blog data back to parent
      onClose();
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
        <input
          className="w-full border p-2 mb-4"
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Blog Title"
        />
        <textarea
          className="w-full border p-2 mb-4"
          rows="8"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          placeholder="Blog Content"
        />
        <div className="flex justify-end space-x-2">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

import React from "react";
import axios from "axios";

const DeleteModal = ({ blogId, onClose, onDelete, token, apiUrl }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/blog/delete/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDelete(); // Notify parent about deletion
      onClose();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Delete Blog</h2>
        <p>Are you sure you want to delete this blog? This action cannot be undone.</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleDelete}
          >
            Delete
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

export default DeleteModal;

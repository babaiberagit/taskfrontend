import React, { useState } from 'react';
import Modal from '../../../Components/Modal/Modal';
import axios from 'axios';
import { BASE_URL } from '../../../Utils/Element';
import { useSelector } from 'react-redux';

const CreateTask = ({ isOpen, onClose, onSave }) => {
    const myToken = useSelector((e) => e.token);
    const [taskName, setTaskName] = useState('');
    const [taskDetails, setTaskDetails] = useState('');
    const [status, setStatus] = useState('pending');
    const [error, setError] = useState('');


    const handleSave = async () => {
        setError('');

        // Validate input
        if (!taskName || !taskDetails) {
            setError("Task name and details are required.");
            return;
        }

        try {
            // Make API call to create a new task
            const response = await axios.post(`${BASE_URL}/taskscreate`, {
                taskName,
                taskDetails,
                status,
            }, {
                headers: {
                    'authorization': `Bearer ${myToken}`,
                },
            });

            if (response.data.success) {
                onClose();
            } else {
                setError(response.data.message || "Failed to create task.");
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error occurred while creating task.');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
            <div className="">
                <input
                    type="text"
                    placeholder="Task Name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    className="w-full mb-3 p-2 border border-gray-300 rounded"
                />
                <textarea
                    placeholder="Task Details"
                    value={taskDetails}
                    onChange={(e) => setTaskDetails(e.target.value)}
                    className="w-full h-32 mb-3 p-2 border border-gray-300 rounded"
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full mb-3 p-2 border border-gray-300 rounded"
                >
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="complete">Complete</option>
                </select>
                <div className="flex justify-end mt-6">
                    <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2">
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default CreateTask;

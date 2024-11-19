import React, { useEffect, useState } from 'react';
import Modal from '../../../Components/Modal/Modal';
import axios from 'axios';
import { BASE_URL } from '../../../Utils/Element';
import { useSelector } from 'react-redux';

const Editmodal = ({ isOpen, onClose, onSave, tasks }) => {
    const myToken = useSelector((e) => e.token);

    const [taskName, setTaskName] = useState('');
    const [taskDetails, setTaskDetails] = useState('');
    const [status, setStatus] = useState('');
    const [taskId, setTaskId] = useState(null);




    useEffect(() => {
        if (isOpen && tasks && tasks.length > 0) {
            const task = tasks[0];


            setTaskName(task.taskName || '');
            setTaskDetails(task.taskDetails || '');
            setStatus(task.status || '');
            setTaskId(task._id || null);
        }
    }, [isOpen, tasks]);

    const handleSave = async () => {
        const updatedTask = {
            taskName,
            taskDetails,
            status,
        };

        try {
            const response = await axios.put(`${BASE_URL}/tasks/${taskId}`, updatedTask, {
                headers: {
                    'authorization': `Bearer ${myToken}`,
                },
            });

            if (response.data.success) {
                onClose();
            } else {
                console.error('Failed to update task');
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Task">
            <div>
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

export default Editmodal;

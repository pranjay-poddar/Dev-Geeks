import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TaskForm = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, description: 'Check Calendar', completed: false },
    { id: 2, description: 'Check insights', completed: false },
    { id: 3, description: 'Check inbox', completed: false },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        description: task,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTask('');
    }
  };

  const handleTaskToggle = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-400 to-blue-500">
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-semibold text-white mb-6">Task Form</h2>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center bg-white rounded-lg p-4 mb-4"
        >
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
            required
            className="w-full rounded-l-md px-4 py-2 focus:outline-none"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md focus:outline-none"
          >
            Add Task
          </motion.button>
        </motion.form>

        <table className="table w-full bg-white rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4">Task ID</th>
              <th className="py-2 px-4">Description</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className={`border-b hover:bg-gray-100 ${
                  task.completed ? 'line-through' : ''
                }`}
              >
                <td className="py-2 px-4">{task.id}</td>
                <td className="py-2 px-4">
                  <span
                    onClick={() => handleTaskToggle(task.id)}
                    className="cursor-pointer"
                  >
                    {task.description}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskForm;

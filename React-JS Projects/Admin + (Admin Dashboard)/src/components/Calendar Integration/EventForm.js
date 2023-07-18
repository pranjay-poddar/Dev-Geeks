import React, { useState } from 'react';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const newEvent = {
      title,
      date,
      time
    };
    setTitle('');
    setDate('');
    setTime('');
    alert("Submitted!")
  };

  return (
    <div className=' min-h-screen py-40 bg-gradient-to-b from-purple-200 to-indigo-200'>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md ">
      <h2 className="text-2xl font-semibold mb-4">Create Event</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:bg-white focus:border-purple-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 font-medium">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:bg-white focus:border-purple-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="time" className="block text-gray-700 font-medium">Time</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:bg-white focus:border-purple-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
      >
        Create
      </button>
    </form>
    </div>
  );
};

export default EventForm;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiClock, FiCalendar, FiSun, FiMoon } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevious = () => {
    if (viewMode === 'month') {
      setSelectedDate(prevDate => {
        const prevMonth = prevDate.getMonth() - 1;
        return new Date(prevDate.getFullYear(), prevMonth, 1);
      });
    } else if (viewMode === 'year') {
      setSelectedDate(prevDate => {
        const prevYear = prevDate.getFullYear() - 1;
        return new Date(prevYear, prevDate.getMonth(), 1);
      });
    }
  };

  const handleNext = () => {
    if (viewMode === 'month') {
      setSelectedDate(prevDate => {
        const nextMonth = prevDate.getMonth() + 1;
        return new Date(prevDate.getFullYear(), nextMonth, 1);
      });
    } else if (viewMode === 'year') {
      setSelectedDate(prevDate => {
        const nextYear = prevDate.getFullYear() + 1;
        return new Date(nextYear, prevDate.getMonth(), 1);
      });
    }
  };

  const handleDayClick = date => {
    setSelectedDate(date);
    setViewMode('day');
  };

  const handleMonthClick = () => {
    setViewMode('month');
  };

  const handleYearClick = () => {
    setViewMode('year');
  };

  const renderDaysOfWeek = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 gap-2 text-center">
      {daysOfWeek.map(day => (
        <div key={day} className="text-purple-600 font-semibold text-3xl">
          {day}
        </div>
      ))}
    </div>    
  
    );
  };

  const renderDaysOfMonth = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="text-gray-400"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const isToday = isSameDay(currentDate, new Date());
      const isSelected = isSameDay(currentDate, selectedDate);
      const dayClassName = `text-center ${
        isToday ? 'bg-blue-500 text-white' : isSelected ? 'bg-purple-500 text-white' : ''
      }`;

      days.push(
        <div key={i} className={dayClassName} onClick={() => handleDayClick(currentDate)}>
          {i}
        </div>
      );
    }

    return <div className="grid grid-cols-7 gap-2 text-center text-3xl text-gray-900">{days}</div>;
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const renderDaySchedule = () => {
    const daySchedule = [
      { time: '9:00 AM', event: 'Meeting' },
      { time: '12:30 PM', event: 'Lunch' },
      { time: '3:00 PM', event: 'Workshop' },
      { time: '6:30 PM', event: 'Dinner' },
    ];

    return (
      <div className="bg-white rounded-lg p-4 mt-4">
        <h3 className="text-lg font-semibold mb-2 text-purple-500">Day Schedule</h3>
        {daySchedule.map((schedule, index) => (
          <div key={index} className="flex items-center mb-2">
            <div className="flex items-center mr-2">
              <FiClock className="text-purple-500 w-4 h-4 mr-1" />
              <span className="text-gray-800 text-lg">{schedule.time}</span>
            </div>
            <div className="flex items-center">
              <FiCalendar className="text-purple-500 w-4 h-4 mr-1" />
              <span className="text-gray-800 text-lg">{schedule.event}</span>
            </div>
          </div>
        ))}
        <div className="mt-4">
          <FiClock className="text-purple-500 w-4 h-4 mr-1" />
          <span className="text-gray-800 text-lg">Current Time: {currentTime.toLocaleTimeString()}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-purple-200 to-indigo-200 min-h-screen">
      <div className="flex items-center justify-between mb-4 py-10">
        <motion.button
          className="text-gray-600 focus:outline-none"
          whileTap={{ scale: 0.9 }}
          onClick={handlePrevious}
        >
          <FiChevronLeft className="w-5 h-5" />
        </motion.button>
        {viewMode === 'month' && (
          <h2
            className="text-lg font-semibold text-gray-900 cursor-pointer"
            onClick={handleMonthClick}
          >
            {selectedDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
          </h2>
        )}
        {viewMode === 'year' && (
          <h2
            className="text-lg font-semibold text-gray-100 cursor-pointer"
            onClick={handleYearClick}
          >
            {selectedDate.getFullYear()}
          </h2>
        )}
        <motion.button
          className="text-gray-600 focus:outline-none"
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
        >
          <FiChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
      {viewMode === 'month' && renderDaysOfWeek()}
      {viewMode === 'month' && renderDaysOfMonth()}
      {viewMode === 'day' && renderDaySchedule()}
      {viewMode === 'month' && (
        <button
          className="mt-2 text-lg text-purple-500 underline"
          onClick={handleDayClick}
        >
          Switch to Day View
        </button>
      )}
      {viewMode === 'day' && (
        <button
          className="mt-2 text-lg text-purple-500 underline text-3xl"
          onClick={handleMonthClick}
        >
          Switch to Month View
        </button>
      )}
      <motion.div
        className="fixed bottom-0 right-0 m-4 p-4 bg-white rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        onClick={() => document.documentElement.classList.toggle('dark')}
      >
        {document.documentElement.classList.contains('dark') ? (
          <FiSun className="text-yellow-500 w-6 h-6" />
        ) : (
          <FiMoon className="text-indigo-500 w-6 h-6" />
        )}
      </motion.div>
      <motion.div>
        <div className="fixed bottom-0 m-4 p-4 bg-white rounded-full shadow-lg">
          <Link to="/event-form">
            Add new Event to Calendar
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Calendar;

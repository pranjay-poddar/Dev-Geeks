import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { FiMenu, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import HomePage from './components/Layout/HomePage';
import Chart from './components/Analytics/Chart';
import Calendar from './components/Calendar Integration/Calendar';
import EventForm from './components/Calendar Integration/EventForm';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Layout/Footer';
import Notifications from './components/Notifications/NotificationList';
import Settings from './components/Settings/Settings';
import UserDetail from './components/User Management/UserDetail';
import UserForm from './components/User Management/UserForm';
import UserList from './components/User Management/UserList';
import Sidebar from './components/Navigation/Sidebar';
import LoginForm from './components/Auth/LoginForm';
import Registration from './components/Auth/Registration';
import PasswordReset from './components/Auth/PasswordReset';
import NotFound from './components/Error Handling/NotFound';
import DataChart from './components/DataManagement/DataChart';
import TaskForm from './components/Tasks/TaskForm';
import Data from './components/DataManagement/Data';
import Users from './components/User Management/Users';
import Inbox from './components/Inbox/Inbox';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        {isSidebarOpen && <Sidebar />}
        <div className="flex-1">
          <button
            className={`fixed top-4 left-4 z-10 bg-gray-500 p-2 rounded-md text-white ${
              isSidebarOpen ? 'hidden' : ''
            }`}
            onClick={toggleSidebar}
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} exact />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chart" element={<Chart />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/event-form" element={<EventForm />} />
              <Route path="/data-chart" element={<DataChart />} />
              <Route path="/data" element={<Data />} />
              <Route path="/footer" element={<Footer />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/user-detail" element={<UserDetail />} />
              <Route path="/user-form" element={<UserForm />} />
              <Route path="/user-list" element={<UserList />} />
              <Route path="/task-form" element={<TaskForm />} />
              <Route path="/user-management" element={<Users />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <button
            className={`fixed top-14 right-4 z-10 bg-gray-500 p-2 rounded-md text-white ${
              !isSidebarOpen ? 'hidden' : ''
            }`}
            onClick={toggleSidebar}
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          <Footer />
          <div className="fixed top-4 right-4 z-10 space-x-4">
            <Link
              to="/login"
              className="text-white hover:text-gray-300 font-semibold"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-500 hover:text-blue-600 font-semibold py-2 px-4 rounded-md"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

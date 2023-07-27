import React, { useEffect, useState } from 'react';

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=10');
      const data = await response.json();
      setUsers(data.results);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="container mx-auto p-10 bg-gradient-to-b from-indigo-400 to-blue-500">
      <h2 className="text-3xl font-semibold mb-6">Users List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.login.uuid}
            className={`bg-white rounded-lg shadow-lg p-4 cursor-pointer ${
              selectedUser === user ? 'bg-blue-200' : ''
            }`}
            onClick={() => handleUserClick(user)}
          >
            <img
              src={user.picture.medium}
              alt={user.name.first}
              className="rounded-full w-20 h-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">
              {user.name.first} {user.name.last}
            </h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
      {selectedUser && (
        <div className="mt-6 bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-xl font-semibold mb-2">
            {selectedUser.name.first} {selectedUser.name.last}
          </h3>
          <p className="text-gray-600">Email: {selectedUser.email}</p>
          <p className="text-gray-600">Phone: {selectedUser.phone}</p>
          <p className="text-gray-600">
            Location: {selectedUser.location.city}, {selectedUser.location.country}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserList;

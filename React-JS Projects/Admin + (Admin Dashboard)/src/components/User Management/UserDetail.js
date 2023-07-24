import React from 'react';

const UserDetail = ({ user }) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6">User Detail</h2>
      {user ? (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <img
            src={user.picture.large}
            alt={user.name.first}
            className="rounded-full w-40 h-40 mx-auto mb-4"
          />
          <h3 className="text-2xl font-semibold mb-2">
            {user.name.first} {user.name.last}
          </h3>
          <p className="text-gray-600 mb-4">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Phone:</strong> {user.phone}
          </p>
          <p className="text-gray-600">
            <strong>Location:</strong> {user.location.city}, {user.location.country}
          </p>
        </div>
      ) : (
        <p className="text-gray-600">Select a user from the list.</p>
      )}
    </div>
  );
};

export default UserDetail;

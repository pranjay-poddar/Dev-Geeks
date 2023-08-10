import React from 'react';

const UserActivity = ({ data }) => {
  return (
    <div className='bg-gray-200 rounded-lg mt-4 p-4'>
      <table className="w-full ">
        <thead>
          <tr>
            <th>Day</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.day}>
              <td>{item.day}</td>
              <td>{item.activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserActivity;

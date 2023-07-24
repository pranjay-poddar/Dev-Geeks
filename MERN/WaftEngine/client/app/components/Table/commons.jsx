import { FaPen, FaTrashAlt, FaPlus } from 'react-icons/fa';

export const Edit = () => {
  return (
    <div className="w-full flex justify-center gap-4">
      <FaPen className="text-blue-600" />
      Edit
    </div>
  );
};

export const Delete = () => {
  return (
    <div className="w-full flex justify-center gap-4">
      <FaTrashAlt className="text-red-600" />
      Delete
    </div>
  );
};

export const Add = () => {
  return (
    <div className="w-full flex justify-center align-middle gap-1">
      <FaPlus className="" />
      Add New
    </div>
  );
};

import { FaTimes } from 'react-icons/fa';
import TextField from '../TextField';

const Tags = ({
  handleAdd,
  handleRemove,
  value,
  handleChange,
  tags,
  label,
  error,
  className,
}) => {
  return (
    <div className={className}>
      <form onSubmit={handleAdd}>
        <TextField
          label={label}
          value={value}
          handleChange={handleChange}
          error={error}
        />
      </form>
      <div className="mt-2">
        {tags &&
          tags.length > 0 &&
          tags.map((tag, index) => {
            return (
              <label
                className="rounded bg-gray-100 inline-flex items-center mt-2 mr-2"
                key={`meta-${tag}-${index}`}
              >
                <span className="text-xs px-2 py-1">{tag}</span>
                <span
                  onClick={handleRemove(index)}
                  className="w-6 hover:bg-red-100 hover:text-red-500 h-full cursor-pointer flex justify-center items-center py-1"
                >
                  <FaTimes />
                </span>
              </label>
            );
          })}
      </div>
    </div>
  );
};

export default Tags;

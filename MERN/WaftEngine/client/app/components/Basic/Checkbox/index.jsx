import React from 'react';
import { FaCheck } from 'react-icons/fa';
import './checkbox.css';

const Checkbox = ({
  label,
  name,
  checked,
  handleChange,
  disabled,
  className,
}) => {
  return (
    <div
      className={`checkbox ${className && className !== '' ? className : ''}`}
    >
      <input
        type="checkbox"
        disabled={disabled === undefined ? false : disabled}
        onChange={handleChange}
        onClick={handleChange}
        id={name}
        name={name}
        checked={checked}
      />
      <label htmlFor={name}>
        <span className="box">
          <FaCheck className="check-icon" />
        </span>
        {(label && label.trim()) || ''}
      </label>
    </div>
  );
};

export default Checkbox;

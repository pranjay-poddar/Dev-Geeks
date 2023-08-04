import React, { useEffect, useRef, useState } from 'react';
import ToolTip from '../ToolTip';
import './textarea.css';

const TextArea = ({
  label,
  value,
  placeholder,
  disabled,
  readOnly,
  error,
  success,
  warning,
  required,
  type,
  id,
  helperText,
  handleChange,
  className,
  tooltip,
  tooltipDirection,
}) => {
  const textAreaRef = useRef(null);
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const [parentHeight, setParentHeight] = useState('auto');

  const parentStyle = {
    minHeight: parentHeight,
  };

  const textAreaStyle = {
    minHeight: 100,
    height: textAreaHeight,
    overflow: 'hidden',
  };

  useEffect(() => {
    setParentHeight(`${textAreaRef.current.scrollHeight}px`);
    setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`);
  }, [value]);

  return (
    <div
      className={`mt-2 ${className && className !== '' ? className : ''}`}
      style={parentStyle}
    >
      <label className="flex items-center mb-px" htmlFor={id}>
        {label}
        {required && <span className="text-red-500 -mt-2 mx-px">*</span>}
        <ToolTip direction={tooltipDirection}>{tooltip}</ToolTip>
      </label>

      <textarea
        readOnly={readOnly || false}
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        disabled={disabled || false}
        ref={textAreaRef}
        style={textAreaStyle}
        className={`textfield ${error ? `error` : ''} ${
          success ? `success` : ''
        } ${warning ? `warning` : ''}`}
      />

      {helperText && helperText !== '' && (
        <div className="text-helper">{helperText}</div>
      )}
      {error && <div className="text-error">{error}</div>}
      {success && <div className="text-success">{success}</div>}
      {warning && <div className="text-warning">{warning}</div>}
    </div>
  );
};

export default TextArea;

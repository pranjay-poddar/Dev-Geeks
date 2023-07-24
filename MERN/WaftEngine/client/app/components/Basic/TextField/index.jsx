import React from 'react';
import './textfield.css';
import ToolTip from '../ToolTip';
const TextField = ({
  label,
  value,
  placeholder,
  disabled,
  autofocus,
  readOnly,
  append,
  prepend,
  error,
  success,
  warning,
  required,
  type,
  id,
  helperText,
  handleChange,
  onKeyDown,
  className,
  tooltip,
  tooltipDirection,
  inverted,
  ...restProps
}) => {
  return (
    <div
      className={`relative ${className && className !== '' ? className : ''}`}
    >
      <label>
        {label}
        {required && <span className="text-red-500 -mt-2 mx-px">*</span>}
        <ToolTip direction={tooltipDirection}>{tooltip}</ToolTip>
        <div className="relative">
          {prepend && prepend !== '' && (
            <div className="prepend">{prepend}</div>
          )}
          <input
            onKeyDown={onKeyDown}
            readOnly={readOnly || false}
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
            disabled={disabled || false}
            autoFocus={autofocus}
            className={`textfield ${inverted ? `inverted` : ''} ${
              typeof error === 'string' && error.trim() !== '' ? `error` : ''
            } ${success ? `success` : ''} ${warning ? `warning` : ''}`}
            {...restProps}
          />
          {append && append !== '' && <div className="append">{append}</div>}
          {helperText && helperText !== '' && (
            <div className="text-helper">{helperText}</div>
          )}
        </div>
        {typeof error === 'string' && error.trim() !== '' && (
          <div className="text-error mt-1 text-xs">{error}</div>
        )}
        {success && <div className="text-success mt-1 text-xs">{success}</div>}
        {warning && <div className="text-warning mt-1 text-xs">{warning}</div>}
      </label>
    </div>
  );
};
export default TextField;

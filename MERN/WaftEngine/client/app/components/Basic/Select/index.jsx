import React from 'react';
import ToolTip from '../ToolTip';
import Select from 'react-select';

const SelectField = ({
  label,
  value,
  disabled,
  placeholder,
  tooltip,
  tooltipDirection,
  errors,
  required,
  onChange,
  onKeyDown,
  options,
  id,
  name,
  className,
  dateFormat,
  ...restProps
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      boxShadow: state.isFocused ? '0 0 0 2px #bee3f8' : 'none',
      borderColor: state.isFocused ? '#63b3ed' : '#e4e4e7',
    }),
    indicatorSeparator: () => {
      display: 'none';
    },
  };

  return (
    <div className={`${className && className !== '' ? className : ''}`}>
      <label className="flex items-center mb-px" htmlFor={id}>
        {label}{' '}
        {required && <span className="text-red-500 -mt-2 mx-px">*</span>}
        <ToolTip className="ml-2" direction={tooltipDirection}>
          {tooltip}
        </ToolTip>
      </label>
      <Select
        id={id}
        value={value}
        onChange={onChange}
        options={options}
        isDisabled={disabled}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        dateFormat={dateFormat}
        name={name}
        styles={customStyles}
        {...restProps}
      />
      {errors && <div className="error text-red-500">{errors}</div>}
    </div>
  );
};

export default SelectField;

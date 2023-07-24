import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

const DatePickerField = (props) => {
  const {
    label,
    errors,
    required,
    type,
    id,
    date,
    placeholder,
    value,
    onChange,
    clearIcon,
    dateFormat,
    timeFormat,
    className,
    ...restProps
  } = props;

  return (
    <div className={`${className && className !== '' ? className : ''}`}>
      <label className="flex items-center mb-px" htmlFor={id}>
        {label}{' '}
        {required && <span className="text-red-500 -mt-2 mx-px">*</span>}
      </label>
      <DatePicker
        id={id}
        onChange={onChange}
        selected={value}
        className="inputbox"
        placeholder={placeholder}
        clearIcon={clearIcon}
        timeFormat={timeFormat}
        dateFormat={dateFormat}
        {...restProps}
      />

      {errors && <div className="error text-red-500">{errors}</div>}
    </div>
  );
};

export default DatePickerField;

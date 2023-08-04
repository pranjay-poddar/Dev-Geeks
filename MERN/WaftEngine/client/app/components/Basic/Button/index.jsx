import React from 'react';
import './button.css';

const Button = ({
  type,
  variant,
  active,
  disabled,
  onClick,
  label,
  name,
  href,
  className,
  ...restProps
}) => {
  return (
    <>
      {href && href !== '' ? (
        <a
          name={name}
          disabled={disabled || false}
          className={`button ${active ? 'active' : ''} ${
            variant && variant !== '' ? variant : 'primary'
          }`}
          href={href}
          {...restProps}
        >
          {restProps.children}
        </a>
      ) : (
        <button
          name={name}
          type={type || 'submit'}
          disabled={disabled || false}
          className={`button ${active ? 'active' : ''} ${
            variant && variant !== '' ? [variant] : 'primary'
          } ${className && className !== '' ? className : ''}`}
          onClick={onClick}
          {...restProps}
        >
          {restProps.children}
        </button>
      )}
    </>
  );
};

export default Button;

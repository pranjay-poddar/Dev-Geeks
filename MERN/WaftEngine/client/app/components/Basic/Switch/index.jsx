import React, { useState } from 'react';
import './switch.css';

const Switch = (props) => {
  const { checked, handleToggle, children, disabled, className } = props;
  const [switchState, setSwitchState] = useState(!!checked);
  const toggle = () => setSwitchState(!switchState);

  const controlledState = typeof checked === 'boolean' ? checked : switchState;
  return (
    <div className={`switch ${className && className !== '' ? className : ''}`}>
      <button
        type="button"
        disabled={disabled}
        className={`button ${controlledState === true ? `checked` : ''}`}
        onClick={() => {
          toggle();
          if (!!handleToggle) {
            handleToggle();
          }
        }}
      >
        <span
          className={`thumb ${controlledState === true ? `checked` : ''}`}
        />
      </button>
      <label
        className="label"
        disabled={disabled}
        onClick={() => {
          toggle();
          if (!!handleToggle) {
            handleToggle();
          }
        }}
      >
        {children}
      </label>
    </div>
  );
};

export default Switch;

import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import './tooltip.css';

const Tooltip = ({ direction, children, className }) => {
  return (
    <>
      {children && children !== '' && (
        <div
          className={`tooltip ${
            className && className !== '' ? className : ''
          }`}
        >
          <FaInfoCircle className="text-gray-300 inline-block" />
          <div
            className={`tooltipBox ${
              direction && direction !== '' ? [direction] : 'top'
            } `}
          >
            <p className="tooltipText">{children}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Tooltip;

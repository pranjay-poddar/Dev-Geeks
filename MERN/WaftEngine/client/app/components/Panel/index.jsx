/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * Panel
 *
 */

import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

const Panel = ({ title, body, open }) => {
  const [panelOpen, setPanelOpen] = useState(false);

  const [openVal, setOpenVal] = useState(open || panelOpen);

  const handlePanel = () => {
    setPanelOpen(!panelOpen);
    if (!open) {
      setOpenVal(!openVal);
    }
  };

  return (
    <div className="border rounded mb-4 bg-white">
      <div
        aria-controls="panel2a-content"
        id="panel2a-header"
        onClick={() => handlePanel()}
      >
        <div className="w-full flex justify-between items-center">
          <h3 className="flex-1 m-0 text-bold text-base px-4 py-2 cursor-pointer select-none">
            {title}
          </h3>
          <span
            className={`transition-transform flex px-4 py-2 ${
              openVal ? 'transform rotate-180' : ''
            }`}
          >
            <FaAngleDown />
          </span>
        </div>
      </div>
      <div
        className={`overflow-auto transition-all duration-300 ease-in-out ${
          openVal ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="bg-white border-t py-2 px-4">{body}</div>
      </div>
    </div>
  );
};

Panel.propTypes = {
  title: PropTypes.any.isRequired,
  body: PropTypes.any.isRequired,
  open: PropTypes.bool,
};

export default Panel;

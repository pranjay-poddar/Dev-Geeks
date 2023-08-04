/**
 *
 * Dialog
 *
 */

import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Modal from '../Modal';
import './dialog.css';

function useComponentVisible(initialIsVisible, setShowList) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    // uses ref to check if outside of Div is clicked
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
      if (setShowList === undefined) {
        console.log('!! onClose function not passed to dialog component. !!');
      } else {
        setShowList(false);
      }
    }
  };

  const handleHideDropdown = (event) => {
    if (event.key === 'Escape') {
      setShowList(false);
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}

const Dialog = ({
  open,
  onClose,
  className,
  title,
  body,
  actions,
  fullScreen,
  forDelete,
  doDelete,
  closeButton,
  confirmButton,
}) => {
  useComponentVisible(open, onClose);

  const handleDialogDelete = () => {
    doDelete();
  };

  const dialogHeight = { maxHeight: 'calc(100vh - 200px)' };

  const children = (
    <>
      <div
        className="w-screen h-screen z-50 fixed top-0 left-0 bg-black bg-opacity-10 overflow-auto"
        onClick={onClose}
      />
      <div
        className={`fixed z-50 shadow-2xl bg-white  
        ${
          fullScreen === true
            ? 'left-0 top-0 w-full h-full'
            : 'left-1/2 top-1/4 transform -translate-x-1/2 -translate-y-1/4 rounded-lg min-w-2xl slide-dialog'
        }
        ${className && className !== '' ? className : ''} `}
      >
        {title !== undefined && (
          <div className="flex flex-wrap items-center justify-between px-6 py-3 bg-gray-100 rounded-tl-lg rounded-tr-lg">
            <h3 className="m-0 text-lg text-black pr-20">{title}</h3>
            <button
              type="button"
              className="text-red-700 hover:text-red-500 text-xl"
              onClick={onClose}
            >
              <FaTimes />
            </button>
          </div>
        )}
        {body !== undefined && (
          <div style={dialogHeight} className="overflow-auto p-4">
            {body}
          </div>
        )}
        {actions !== undefined && (
          <div className="border-t p-2 flex justify-end">
            {actions}
            {forDelete ? (
              <div className="m-4 w-full flex justify-between px-1">
                <button
                  type="button"
                  className="-ml-1 bg-gray-100 w-1/2 border rounded px-3 py-2 text-sm leading-none font-bold hover:bg-gray-300"
                  onClick={onClose}
                >
                  {closeButton ? closeButton : `Don't Delete`}
                </button>
                <button
                  type="button"
                  className="-mr-1 bg-red-100 w-1/2 text-red-600 px-3 py-2 text-sm font-bold leading-none border border-red-300 hover:bg-red-600 hover:text-white rounded"
                  onClick={handleDialogDelete}
                >
                  {confirmButton ? confirmButton : `Delete`}
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        )}
      </div>
    </>
  );

  return open ? <Modal>{children}</Modal> : null;
};

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  title: PropTypes.any,
  body: PropTypes.any,
  actions: PropTypes.any,
};

export default Dialog;

/**
 *
 * DropdownMenu
 *
 */

import { useState } from 'react';

const DropdownMenu = ({ main, items }) => {
  const [open, setOpen] = useState(false);

  const handleMenu = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="my-auto" onClick={() => handleMenu()}>
      <div className="relative px-6">
        {main}
        {open ? (
          <>
            <div
              className="w-screen h-screen z-40 fixed top-0 left-0 overflow-auto"
              onClick={handleClose}
            />

            <div
              className="z-50 shadow absolute right-0 w-56 bg-white border mt-1"
              onClick={() => handleMenu()}
            >
              {items && items}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default DropdownMenu;

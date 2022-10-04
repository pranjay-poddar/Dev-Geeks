import React, { useState, useEffect, useContext } from 'react';

import { RiArrowDownSLine, RiArrowUpSLine, RiCalendarCheckFill } from 'react-icons/ri';
// import headless ui components
import { Menu } from '@headlessui/react';
// import context
import { HouseContext } from './HouseContext';

const DateDropdown = () => {
    const { checkIn, setcheckIn } = useContext(HouseContext);
    //const { price, setPrice } = useContext(HouseContext);
    const [isOpen, setIsOpen] = useState(false);
  
    const checkIns = [
      {
        value: 'Date (any)',
      },
      {
        value: '1/10/2022 - 2/10/2022',
      },
      {
        value: '1/10/2022 - 3/10/2022',
      },
      {
        value: '1/10/2022 - 4/10/2022',
      },
      {
        value: '1/10/2022 - 5/10/2022',
      },
      {
        value: '1/10/2022 - 6/10/2022',
      },
      {
        value: '1/10/2022 - 7/10/2022',
      },
    ];
  
    return (
      <Menu as='div' className='dropdown relative'>
        <Menu.Button
          onClick={() => setIsOpen(!isOpen)}
          className='dropdown-btn w-full'
        >
          <RiCalendarCheckFill className='dropdown-icon-primary' />
          <div>
            <div className='text-[15px] font-medium leading-tight'>{checkIn}</div>
            <div className='text-[13px]'>Choose Date</div>
          </div>
          {isOpen ? (
            <RiArrowUpSLine className='dropdown-icon-secondary' />
          ) : (
            <RiArrowDownSLine className='dropdown-icon-secondary' />
          )}
        </Menu.Button>
  
        <Menu.Items className='dropdown-menu'>
          {checkIns.map((checkIn, index) => {
            return (
              <Menu.Item
                as='li'
                onClick={() => setcheckIn(checkIn.value)}
                key={index}
                className='cursor-pointer hover:text-violet-700 transition'
              >
                {checkIn.value}
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Menu>
    );
  };
    export default DateDropdown;
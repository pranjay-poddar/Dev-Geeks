/**
 *
 * MultiCheck
 *
 */

import React from 'react';
import { FaMinus } from 'react-icons/fa';
import { Checkbox } from '../../../Basic/Checkbox';

const MultiCheck = ({
  selectAll,
  chosen_items,
  allData,
  handleClear,
  handleSelect,
  checker,
}) => {
  return (
    <div className="checkbox" style={{ marginRight: 0 }}>
      {selectAll === false && chosen_items.length > 0 ? (
        <>
          <input
            onChange={
              allData.some((item) => chosen_items.indexOf(item) >= 0)
                ? () => handleClear()
                : () => handleSelect()
            }
            checked={
              allData.some((item) => chosen_items.indexOf(item) >= 0)
                ? 'checked'
                : checker(allData, chosen_items)
                ? 'checked'
                : ''
            }
            type="checkbox"
            name="notcheckall"
            id="notcheckall"
          />
          <label htmlFor="notcheckall">
            <span className="box">
              <FaMinus className="check-icon" />
            </span>
          </label>
        </>
      ) : (
        <>
          <Checkbox
            name={'checkall'}
            checked={checker(chosen_items, allData) ? 'checked' : ''}
            onChange={() => handleSelect()}
          />
        </>
      )}
    </div>
  );
};

export default MultiCheck;

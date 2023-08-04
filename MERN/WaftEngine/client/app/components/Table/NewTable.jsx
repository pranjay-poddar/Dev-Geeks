import { useEffect, useState } from 'react';
import {
  FaBars,
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisV,
} from 'react-icons/fa';
import './table.css';
import Dialog from '../Dialog';
import Button from '../Basic/Button';
import Checkbox from '../Basic/Checkbox';
import DropdownMenu from '../DropdownMenu';
import {
  arrayMove,
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import Checkbox from '../Basic/Checkbox';

/* eslint-disable react/no-array-index-key */

const DragHandle = SortableHandle(() => (
  <span className="hover:bg-blue-100 cursor-move w-8 h-8 inline-flex justify-center items-center rounded-full">
    <FaBars className="" />
  </span>
));

const SortableItem = SortableElement(({ value }) => (
  <div className="bg-gray-50 rounded p-4 border"> {value}</div>
));

const SortableList = SortableContainer(
  ({ items, _this, handleChecked, keys }) => (
    <div>
      {items.map((value, index) => (
        <div
          key={`${value._id}-item-image-${index}`}
          className="w-full z-99999"
        >
          <SortableItem
            index={index}
            _this={_this}
            value={
              <div className="grid grid-cols-3 gap-4" key={index}>
                <DragHandle />

                <div>{value.key}</div>
                <Checkbox
                  checked={keys[index].show}
                  name={value.key}
                  label=" "
                  handleChange={() => handleChecked(index)}
                />
              </div>
            }
          />
        </div>
      ))}
    </div>
  ),
);

function CustomTable({
  classes,
  loading,
  tableHead,
  tableData,
  tableHeaderColor,
  pagination,
  handlePagination,
  emptyDataMsg,
  keyList,
  isSN,
  header,
  tableActions,
  addButton,
  filters,
  handleFilter,
  getBulkValues,
  showBulk,
  ...props
}) {
  const [keys, setKeys] = useState(keyList);
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState([]);

  const handleShow = () => {
    setOpen(true);
  };
  const handleHide = () => {
    setOpen(false);
  };

  const handleChecked = (index) => {
    const tempKeys = [...keys];
    tempKeys[index] = { ...tempKeys[index], show: !tempKeys[index].show };
    setKeys(tempKeys);
  };

  let listKeysNormalized = {};
  const listKeys = keys.map((each) => {
    listKeysNormalized = {
      ...listKeysNormalized,
      [each.key]: each.show,
    };
  });

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    let tempData = [];
    for (let index = 0; index < tableData.length; index++) {
      const element = tableData[index];
      let normalized = {};

      for (let index2 = 0; index2 < element.length; index2++) {
        const row = element[index2];
        normalized = { ...normalized, [row.for]: row.value };
      }
      tempData.push(normalized);
    }
    setDataList(tempData);
  }, [tableData, keyList]);

  let headNormalized = {};
  const headList = tableHead.map((each) => {
    headNormalized = {
      ...headNormalized,
      [each.for]: each.label,
    };
  });

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    setKeys(arrayMove(keys, oldIndex, newIndex));
  };

  const handleSelect = (index) => {
    if (selected.includes(index)) {
      const oldIndex = selected.indexOf(index);
      let tempArray = [...selected];
      tempArray.splice(oldIndex, 1);
      setSelected(tempArray);
    } else {
      setSelected([...selected, index]);
    }
  };

  const handleSelectAll = () => {
    if (selected.length !== tableData.length) {
      let tempArray = [];
      for (let index = 0; index < tableData.length; index++) {
        tempArray.push(index);
      }
      setSelected(tempArray);
    } else {
      setSelected([]);
    }
  };

  useEffect(() => {
    let values = [];
    for (let index = 0; index < selected.length; index++) {
      const element = selected[index];
      values.push(tableData[element]);
    }
    if (getBulkValues) {
      getBulkValues(values);
    }
  }, [selected]);

  useEffect(() => {
    setSelected([]);
  }, [pagination && pagination.page]);

  return (
    <div className="bg-white mt-4">
      <Dialog
        className="w-3/5"
        open={open}
        onClose={handleHide}
        title={'Choose Keys'}
        body={
          <>
            <div className="grid grid-cols-3 gap-4">
              <div>Order</div>
              <div>Key</div>
              <div>Show</div>
            </div>
            <SortableList
              items={keys}
              _this={this}
              useDragHandle
              onSortEnd={handleSortEnd}
              handleChecked={handleChecked}
              keys={keys}
            />
          </>
        }
      />
      <div className="w-full flex justify-between">
        <span className="text-xl font-bold ml-2">{header || ''}</span>
        {addButton && (
          <Button onClick={addButton.onClick}> {addButton.label || ''} </Button>
        )}
      </div>
      <div className="my-2 flex justify-start">
        <Button onClick={handleShow}> Manage Columns </Button>
      </div>
      {filters && filters.length > 0 && (
        <div className="grid grid-cols-5 gap-4 py-2">
          {filters.map((each) => (
            <div>{each}</div>
          ))}
          <Button className={'mt-2'} onClick={handleFilter}>
            Search
          </Button>
        </div>
      )}
      <table className="w-full text-left table table-auto">
        {tableHead !== undefined ? (
          <thead>
            <tr>
              {showBulk && (
                <th
                  className={`text-center py-3 px-2 font-bold text-sm text-gray-500 border-t border-b border-gray-300`}
                  key="Bulk"
                >
                  <Checkbox
                    checked={tableData.length === selected.length}
                    name="SelectAll"
                    handleChange={handleSelectAll}
                  />
                </th>
              )}
              {isSN && (
                <th
                  className={`text-center py-3 px-2 font-bold text-sm text-gray-500 border-t border-b border-gray-300`}
                  key="SerialNo."
                >
                  S.N.
                </th>
              )}
              {keys.map(
                (prop, key) =>
                  listKeysNormalized[prop.key] === true && (
                    <th
                      className="py-2 px-2 font-medium text-sm text-gray-500 border-t border-b border-gray-300"
                      key={key}
                    >
                      {headNormalized[prop.key]}
                    </th>
                  ),
              )}
              {tableActions && tableActions.length > 0 && (
                <th
                  className={`text-center py-3 px-2 font-bold text-sm text-gray-500 border-t border-b border-gray-300`}
                  key="Actions."
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>
        ) : null}
        {loading ? (
          <tbody>
            <tr>
              <td colSpan={tableHead.length} className="py-2 text-center">
                <div className="circular_loader waftloader"></div>
              </td>
            </tr>
          </tbody>
        ) : tableData.length < 1 ||
          (pagination && pagination.totaldata === 0) ? (
          <tbody>
            <tr>
              <td
                colSpan={tableHead.length}
                className="text-center px-2 py-1 text-sm border-gray-200 text-gray-700"
              >
                {emptyDataMsg || 'No Data Found'}
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {tableData.map((prop, key) => (
              <tr key={key}>
                {showBulk && (
                  <td
                    className={`text-center px-2 py-1 text-sm border-gray-300 text-gray-800`}
                  >
                    <Checkbox
                      checked={selected.includes(key)}
                      name={`select-${key}`}
                      handleChange={() => handleSelect(key)}
                    />
                  </td>
                )}
                {isSN && (
                  <td
                    className={`text-center px-2 py-1 text-sm border-gray-300 text-gray-800`}
                    key={`SN-${key}`}
                  >
                    {pagination && pagination.page
                      ? pagination.page * pagination.size +
                        (key + 1) -
                        pagination.size
                      : key + 1}
                  </td>
                )}
                {keys.map(
                  (each, index) =>
                    listKeysNormalized[each.key] && (
                      <td
                        className="px-2 py-1 text-sm border-gray-200 text-gray-700"
                        key={index}
                      >
                        {dataList[key] && dataList[key][each.key]}
                      </td>
                    ),
                )}
                <td className="px-2 py-1 text-sm border-gray-200 text-gray-700 ">
                  {tableActions && tableActions[key].length > 0 && (
                    <DropdownMenu
                      main={
                        <span className="cursor-pointer ">
                          <FaEllipsisV className="" />
                        </span>
                      }
                      items={tableActions[key].map((action, aIndex) => (
                        <div
                          className="w-full p-2 border-b-2 cursor-pointer"
                          onClick={action.onClick}
                          key={`${key}-${aIndex}`}
                        >
                          {action.label}
                        </div>
                      ))}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {pagination && handlePagination && (
        <>
          <div className="flex justify-end items-center pt-2 border-t border-gray-200">
            <div className="inline-flex items-center justify-end ">
              <span className="text-xs text-gray-500">rows per page</span>{' '}
              <select
                className="inputbox text-xs w-12 h-6 p-0 mx-2"
                value={pagination.size || 10}
                onChange={(e) => {
                  handlePagination({ ...pagination, size: e.target.value });
                }}
              >
                {[5, 10, 25, 50, 100].map((each) => (
                  <option value={each} key={each}>
                    {each}
                  </option>
                ))}
              </select>
              <span className="mr-5 text-xs text-gray-500">
                page {pagination.page} of{' '}
                {Math.ceil(pagination.totaldata / pagination.size)}
                <span className="pl-4">
                  total data : {pagination.totaldata}
                </span>
              </span>
              <span
                onClick={() => {
                  if (1 === pagination.page) {
                    return;
                  }
                  handlePagination({
                    ...pagination,
                    page: pagination.page - 1,
                  });
                }}
                className={`${
                  1 === pagination.page
                    ? 'opacity-25 pointer-events-none'
                    : 'hover:bg-blue-500 hover:text-white'
                } w-8 h-8 rounded cursor-pointer inline-flex items-center justify-center ml-1 text-blue-500`}
              >
                <FaChevronLeft />
              </span>
              <span
                onClick={() => {
                  if (
                    Math.ceil(pagination.totaldata / pagination.size) ===
                    pagination.page
                  ) {
                    return;
                  }
                  handlePagination({
                    ...pagination,
                    page: pagination.page + 1,
                  });
                }}
                className={`${
                  Math.ceil(pagination.totaldata / pagination.size) ===
                  pagination.page
                    ? 'opacity-25 pointer-events-none'
                    : 'hover:bg-blue-500 hover:text-white'
                } w-8 h-8 rounded cursor-pointer inline-flex items-center justify-center ml-1 text-blue-500`}
              >
                <FaChevronRight />
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray',
  handlePagination: () =>
    console.log('todo: make handlePagination function!!!'),
};

export default CustomTable;

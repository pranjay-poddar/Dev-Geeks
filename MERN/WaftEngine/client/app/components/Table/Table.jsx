import PropTypes from 'prop-types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './table.css';

/* eslint-disable react/no-array-index-key */
function CustomTable({ ...props }) {
  const {
    classes,
    loading,
    tableHead,
    tableData,
    tableHeaderColor,
    pagination,
    handlePagination,
    emptyDataMsg,
  } = props;
  return (
    <div className="bg-white mt-4">
      <table className="w-full text-left table table-auto">
        {tableHead !== undefined ? (
          <thead>
            <tr>
              {tableHead.map((prop, key) => (
                <th
                  className="py-2 px-2 font-medium text-sm text-gray-500 border-t border-b border-gray-300"
                  key={key}
                >
                  {prop}
                </th>
              ))}
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
                {prop.map((each, index) => (
                  <td
                    className="px-2 py-1 text-sm border-gray-200 text-gray-700"
                    key={index}
                  >
                    {each}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {pagination && handlePagination && (
        <>
          <div className="flex justify-end items-center pt-2 border-t border-gray-200">
            <div className="inline-flex items-center justify-end ">
              <span className="text-xs text-gray-500">Rows per Page</span>{' '}
              <select
                className="border rounded text-xs w-12 h-6 p-0 mx-2"
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
                Page {pagination.page} of{' '}
                {Math.ceil(pagination.totaldata / pagination.size)}
                <span className="pl-4">
                  Total Data : {pagination.totaldata}
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

CustomTable.propTypes = {
  classes: PropTypes.object,
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray',
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node])),
  ),
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
  handlePagination: PropTypes.func,
};

export default CustomTable;

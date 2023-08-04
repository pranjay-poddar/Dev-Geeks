/**
 *
 * Error
 *
 */

import moment from 'moment';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaEye, FaSearch, FaTrash } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from '../../../components/Basic/Button';
import TextField from '../../../components/Basic/TextField';
import DeleteDialog from '../../../components/DeleteDialog';
import Dialog from '../../../components/Dialog/index';
import Loading from '../../../components/Loading';
import PageContent from '../../../components/PageContent/PageContent';
import PageHeader from '../../../components/PageHeader/PageHeader';
// core components
import Table from '../../../components/Table/Table';
import TableFilter from '../../../components/Table/components/Filter';
import { useInjectReducer } from '../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../hooks/useInjectSaga';
import { DATE_FORMAT } from '../../App/constants';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectAll, makeSelectLoading, makeSelectQuery } from './selectors';

const key = 'adminErrorManagePage';

export const Error = (props) => {
  const {
    all: { data, page, size, totalData },
    loadAllRequest,
    errorDeleteRequest,
    deleteAllRequest,
    setQueryValue,
    query,
    loading,
    clearQuery,
  } = props;

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [accessList, setAccessList] = useState([]);
  const [show, setShow] = useState(false);
  const [showId, setShowId] = useState('');
  const [stack, setStack] = useState('');

  const navigate = useNavigate();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadAllRequest(query);
  }, [query.size, query.page]);

  const handlePagination = ({ page, size }) => {
    setQueryValue({ key: 'page', value: page });
    setQueryValue({ key: 'size', value: size });
  };

  const handleOpen = (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  const handleOpenAll = (id) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShow(false);
  };

  const handleCloseAll = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    errorDeleteRequest(id);
    setOpen(false);
    setDeleteId('');
  };

  const handleDeleteAll = () => {
    deleteAllRequest();
    setOpen(false);
  };

  const handleQueryChange = (e) => {
    e.persist();
    setQueryValue({ key: e.target.name, value: e.target.value });
  };

  const handleSearch = () => {
    loadAllRequest(query);
    setQueryValue({ key: 'page', value: 1 });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleShow = (id, stack) => {
    setShowId(id);
    setShow(true);
    setStack(stack);
  };

  const tablePagination = { page, size, totaldata: totalData };
  const tableData = data.map(
    ({
      error_message,
      error_stack,
      error_type,
      added_at,
      count,
      last_added_at,
      _id,
    }) => [
      error_message,
      error_type,
      count,
      moment(added_at).format(DATE_FORMAT),
      last_added_at != null
        ? moment(last_added_at).format(DATE_FORMAT)
        : moment(added_at).format(DATE_FORMAT),
      <div className="flex">
        <span
          className="icon-edit"
          onClick={() => handleShow(_id, error_stack)}
        >
          <FaEye />
        </span>
        <span className="icon-trash" onClick={() => handleOpen(_id)}>
          <FaTrash />
        </span>
      </div>,
    ],
  );
  return (
    <>
      <Dialog
        open={show}
        className="w-5/6"
        onClose={handleClose}
        title={`Error Stack`}
        body={<p>{stack}</p>}
        actions={
          <Button variant="error" onClick={handleClose}>
            Close
          </Button>
        }
      />
      <Helmet>
        <title>Errors</title>
      </Helmet>
      {loading && loading == true ? <Loading /> : <></>}
      <PageHeader
        title="Errors"
        actions={
          <Button onClick={handleOpenAll} variant="error">
            Delete All
          </Button>
        }
      />
      <PageContent loading={loading}>
        <TableFilter col={2}>
          <TextField
            type="text"
            name="find_errors"
            id="find_errors"
            placeholder="Search Errors"
            value={query.find_errors}
            handleChange={handleQueryChange}
          />
          <div>
            <Button variant={'dark'} onClick={handleSearch}>
              <FaSearch className="my-1" />
            </Button>
          </div>
        </TableFilter>

        <Table
          tableHead={[
            'Error Message',
            'Error Type',
            'Count',
            'First Encountered At',
            'Last Encountered At',
            'Actions',
            '',
          ]}
          tableData={tableData}
          loading={loading}
          pagination={tablePagination}
          handlePagination={handlePagination}
        />
      </PageContent>
      <DeleteDialog
        open={open}
        doClose={handleClose}
        doDelete={() =>
          deleteId && deleteId != ''
            ? handleDelete(deleteId)
            : handleDeleteAll()
        }
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Error);

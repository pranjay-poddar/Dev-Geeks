/**
 *
 * AdminRole
 *
 */

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaKey, FaPen, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from '../../../components/Basic/Button';
import TextField from '../../../components/Basic/TextField';
import DeleteDialog from '../../../components/DeleteDialog';
import PageContent from '../../../components/PageContent/PageContent';
import PageHeader from '../../../components/PageHeader/PageHeader';
import TableFilter from '../../../components/Table/components/Filter';
import Table from '../../../components/Table/Table';
import SelectField from '../../../components/Basic/Select';
import { useInjectReducer } from '../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../hooks/useInjectSaga';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectAll, makeSelectLoading, makeSelectQuery } from './selectors';

const key = 'adminRole';

/* eslint-disable react/prefer-stateless-function */
const AdminRole = (props) => {
  const [state, setState] = useState({
    open: false,
    deleteId: '',
  });

  const navigate = useNavigate();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.clearOne();
    props.loadAllRequest(props.query);
  }, [props.query.page, props.query.size]);

  const handlePagination = (paging) => {
    props.setQueryValue({ key: 'page', value: paging.page });
    props.setQueryValue({ key: 'size', value: paging.size });
  };

  const handleAdd = () => {
    props.clearOne();
    navigate('/admin/role-manage/add');
  };

  const handleAccess = (id) => {
    navigate(`/admin/role-manage/access/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin/role-manage/edit/${id}`);
  };

  const handleQueryChange = (event) => {
    event.persist();
    props.setQueryValue({
      key: event.target.name,
      value: event.target.value,
    });
  };

  const handleSearch = () => {
    props.loadAllRequest(props.query);
    props.setQueryValue({ key: 'page', value: 1 });
  };

  const handleQueryDropChange = (name) => (e) => {
    props.setQueryValue({
      key: name,
      value: e.value,
    });
  };

  const activeOptions = [
    { label: 'Active', value: 'true' },
    { label: 'In-Active', value: 'false' },
    { label: 'All', value: '' },
  ];

  let listActiveNormalized = {};
  const listActive = activeOptions.map((each) => {
    const obj = {
      label: each.label,
      value: each.value,
    };

    listActiveNormalized = {
      ...listActiveNormalized,
      [each.value]: obj,
    };
    return obj;
  });

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleOpen = (id) => {
    setState({ open: true, deleteId: id });
  };

  const handleClose = () => {
    setState({ open: false });
  };

  const handleDelete = (id) => {
    props.deleteOneRequest(id);
    setState({ open: false });
  };

  const {
    all: { data, page, size, totaldata },
    query,
    loading,
  } = props;
  const tablePagination = { page, size, totaldata };
  const tableData = data.map(({ _id, role_title, description, is_active }) => [
    role_title,
    description,
    
    <>
    {is_active ? (
      <span className="label-active">Active</span>
    ) : (
      <span className="label-inactive">In-Active</span>
    )}
  </>,

    <div className="flex gap-2">
      <span
        className="icon-button text-success hover:bg-green-100"
        onClick={() => handleAccess(_id)}
      >
        <FaKey className="text-base text-green-500 hover:text-green-600" />
      </span>
      <span className="icon-edit" onClick={() => handleEdit(_id)}>
        <FaPen />
      </span>
      <span className="icon-trash" onClick={() => handleOpen(_id)}>
        <FaTrash />
      </span>
    </div>,
  ]);

  return (
    <>
      <DeleteDialog
        open={state.open}
        doClose={handleClose}
        doDelete={() => handleDelete(state.deleteId)}
      />
      <Helmet>
        <title>Roles</title>
      </Helmet>

      <PageHeader
        title="Roles"
        actions={
          <Button onClick={handleAdd}>
            <FaPlus />
            Add Role
          </Button>
        }
      />

      <PageContent loading={loading}>
        <TableFilter col={2}>

        <SelectField
            value={listActiveNormalized[query.find_is_active]}
            onChange={handleQueryDropChange('find_is_active')}
            options={listActive}
            placeholder="Search by Active"
          />
          <TextField
            type="text"
            name="find_role_title"
            id="role-title"
            placeholder="Search by title"
            value={query.find_role_title}
            onChange={handleQueryChange}
            onKeyDown={handleKeyPress}
          />
          <div>
            <Button onClick={handleSearch} variant="dark">
              <FaSearch className="my-1" />
            </Button>
          </div>
        </TableFilter>

        <Table
          tableHead={['Title', 'Description', 'Is Active', 'Action']}
          tableData={tableData}
          pagination={tablePagination}
          handlePagination={handlePagination}
          loading={loading}
        />
      </PageContent>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminRole);

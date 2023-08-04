/**
 *
 * User
 *
 */

import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FaPen, FaPlus, FaSearch,FaCheck,FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from '../../../components/Basic/Button';
import SelectField from '../../../components/Basic/Select';
import TextField from '../../../components/Basic/TextField';
import PageContent from '../../../components/PageContent/PageContent';
import PageHeader from '../../../components/PageHeader/PageHeader';
import TableFilter from '../../../components/Table/components/Filter';
import Table from '../../../components/Table/Table';
import { useInjectReducer } from '../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../hooks/useInjectSaga';
import { makeSelectLocation } from '../../App/selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectAll,
  makeSelectLoading,
  makeSelectQuery,
  makeSelectRoles,
} from './selectors';

/* eslint-disable react/prefer-stateless-function */

const key = 'adminUserManagePage';

const User = (props) => {
  const {
    loadAllRequest,
    query,
    location: { search },
    setQueryObj,
    all: { data, page, size, totaldata },
    loading,
    roles,
  } = props;

  const navigate = useNavigate();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.loadAllRolesRequest();
  }, []);

  useEffect(() => {
    loadAllRequest(query);
  }, [query.size, query.page]);

  const handlePagination = (paging) => {
    props.setQueryValue({ key: 'page', value: paging.page });
    props.setQueryValue({ key: 'size', value: paging.size });
  };

  const handleAdd = () => {
    props.clearOne();
    navigate('/admin/user-manage/add');
  };

  const handleEdit = (id) => {
    navigate(`/admin/user-manage/edit/${id}`);
  };

  const handleQueryChange = (e) => {
    e.persist();
    props.setQueryValue({
      key: e.target.name,
      value: e.target.value,
    });
  };

  const handleQueryDropChange = (name) => (e) => {
    props.setQueryValue({
      key: name,
      value: e.value,
    });
  };

  const handleSearch = () => {
    props.loadAllRequest(props.query);
    props.setQueryValue({ key: 'page', value: 1 });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const activeOptions = [
    { label: 'Active', value: 'true' },
    { label: 'In-Active', value: 'false' },
    { label: 'All', value: '' },
  ];

  const emailOptions = [
    { label: 'Email Verified', value: 'true' },
    { label: 'Email Not-Verified', value: 'false' },
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

  let listEmailNormalized = {};
  const listEmail = emailOptions.map((each) => {
    const obj = {
      label: each.label,
      value: each.value,
    };

    listEmailNormalized = {
      ...listEmailNormalized,
      [each.value]: obj,
    };
    return obj;
  });

  let listRolesNormalized = {};
  const listRoles = roles.map((each) => {
    const obj = {
      label: each.role_title,
      value: each._id,
    };

    listRolesNormalized = {
      ...listRolesNormalized,
      [each._id]: obj,
    };
    return obj;
  });
  listRoles.unshift({ label: 'All', value: '' });

  const tablePagination = { page, size, totaldata };
  const tableData = data.map(
    ({ _id, email, name, roles, email_verified, is_active }) => [
      email,
      name,
      roles.map((each) => each.role_title).join(', '),
      <>
      {email_verified? (
        <FaCheck className="text-green-600"/>
      ) : (
        <FaTimes className="text-red-600" />
        )}
      </>,
      
      <>
        {is_active ? (
          <span className="label-active">Active</span>
        ) : (
          <span className="label-inactive">In-Active</span>
        )}
      </>,
      <>
        <div className="flex">
          <span className="icon-edit" onClick={() => handleEdit(_id)}>
            <FaPen />
          </span>
        </div>
      </>,
    ],
  );

  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>

      <PageHeader
        title="Users"
        actions={
          <Button variant="primary" onClick={handleAdd}>
            <FaPlus />
            Add User
          </Button>
        }
      ></PageHeader>
      <PageContent loading={loading}>
        <TableFilter col={4}>
          <SelectField
            value={listRolesNormalized[query.find_roles]}
            onChange={handleQueryDropChange('find_roles')}
            options={listRoles}
            placeholder="Search by Role"
          />
            <SelectField
            value={listEmailNormalized[query.find_email_verified]}
            onChange={handleQueryDropChange('find_email_verified')}
            options={listEmail}
            placeholder="Search by Email verified"
          />
          <SelectField
            value={listActiveNormalized[query.find_is_active]}
            onChange={handleQueryDropChange('find_is_active')}
            options={listActive}
            placeholder="Search by Active"
          />
          <TextField
            type="text"
            name="find_name"
            id="user-name"
            placeholder="Search User"
            value={query.find_name}
            onChange={handleQueryChange}
            onKeyDown={handleKeyPress}
          />
          <div>
            <Button onClick={handleSearch} variant="dark">
              <FaSearch className="my-1"/>
            </Button>
          </div>
        </TableFilter>
        <Table
          tableHead={[
            'Email',
            'Name',
            'Roles',
            'Email verified',
            'Active',
            'Action',
          ]}
          tableData={tableData}
          pagination={tablePagination}
          handlePagination={handlePagination}
        />
      </PageContent>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
  location: makeSelectLocation(),
  roles: makeSelectRoles(),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);

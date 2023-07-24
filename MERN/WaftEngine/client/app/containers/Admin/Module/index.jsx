/**
 *
 * AdminModuleManage
 *
 */

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaKey, FaPen, FaPlus, FaSearch } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from '../../../components/Basic/Button';
import SelectField from '../../../components/Basic/Select';
import TextField from '../../../components/Basic/TextField';
import Loading from '../../../components/Loading';
import PageContent from '../../../components/PageContent/PageContent';
import PageHeader from '../../../components/PageHeader/PageHeader';
import TableFilter from '../../../components/Table/components/Filter';
import Table from '../../../components/Table/Table';
import { useInjectReducer } from '../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../hooks/useInjectSaga';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectAll,
  makeSelectLoading,
  makeSelectQuery,
  makeSelectSubModules,
} from './selectors';

const key = 'adminModuleManage';

/* eslint-disable react/prefer-stateless-function */
const AdminModuleManage = (props) => {
  const navigate = useNavigate();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [state, setState] = useState({ tempGroup: null });

  useEffect(() => {
    props.loadAllRequest(props.query);
    props.loadSubModuleRequest();
  }, [props.query.size, props.query.page]);

  const handleAdd = () => {
    props.clearOne();
    navigate('/admin/module-manage/add');
  };

  const handleEdit = (id) => {
    navigate(`/admin/module-manage/edit/${id}`);
  };

  const handleAccessEdit = (id) => {
    navigate(`/admin/module-manage/access/${id}`);
  };

  const handleQueryChange = (e) => {
    e.persist();
    props.setQueryValue({ key: e.target.name, value: e.target.value });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    props.loadAllRequest(props.query);
    props.setQueryValue({ key: 'page', value: 1 });
  };

  const handlePagination = (paging) => {
    props.setQueryValue({ key: 'page', value: paging.page });
    props.setQueryValue({ key: 'size', value: paging.size });
  };

  const handleDropdown = (event) => {
    setState({ tempGroup: event });
    props.setQueryValue({ key: 'find_module_group', value: event.label });
  };

  const {
    classes,
    all: { data, page, size, totaldata },
    query,
    loading,
    groups,
  } = props;

  const tablePagination = { page, size, totaldata };
  const tableData = data.map(
    ({ _id, module_name, description, module_group }) => [
      (module_group && module_group.module_group) || '-',
      module_name,
      description,
      <div className="flex gap-2">
        <span
          className="icon-button text-success hover:bg-green-100"
          onClick={() => handleAccessEdit(_id)}
        >
          <FaKey className="text-base text-green-500 hover:text-green-600" />
        </span>
        <span className="icon-edit" onClick={() => handleEdit(_id)}>
          <FaPen />
        </span>
      </div>,
    ],
  );

  const groupOptions =
    groups && groups.length > 0
      ? groups.map((each) => {
          const obj = { label: each.module_group, value: each._id };
          return obj;
        })
      : [];

  return (
    <>
      <Helmet>
        <title>Module Manage</title>
      </Helmet>
      {loading && loading == true ? <Loading /> : <></>}
      <PageHeader
        title="Module Manage"
        actions={
          <Button onClick={handleAdd}>
            <FaPlus /> Add New
          </Button>
        }
      >
        Module Manage
      </PageHeader>
      <PageContent loading={loading}>
        <TableFilter col={3}>
          <SelectField
            name="find_module_group"
            placeholder="Search by Group"
            value={state.tempGroup}
            onChange={handleDropdown}
            options={groupOptions}
            id="module-group"
            onKeyDown={handleKeyPress}
          />
          <TextField
            type="text"
            id="module-group"
            name="find_module_name"
            placeholder="Search by Name"
            value={query.find_module_name}
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
          tableHead={['Module Group', 'Module Name', 'Description', 'Action']}
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
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
  groups: makeSelectSubModules(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminModuleManage);

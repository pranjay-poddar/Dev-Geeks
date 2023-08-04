/**
 *
 * GlobalSetting
 *
 */

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaPen, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from '../../../components/Basic/Button';
import SelectField from '../../../components/Basic/Select';
import TextField from '../../../components/Basic/TextField';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import PageContent from '../../../components/PageContent/PageContent';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Table from '../../../components/Table';
import TableFilter from '../../../components/Table/components/Filter';
import { useInjectReducer } from '../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../hooks/useInjectSaga';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectLoading,
  makeSelectQuery,
  makeSelectSubTypes,
  makeSelectTypes,
  makeSelectWithdraw,
} from './selectors';

const key = 'globalSetting';

export const GlobalSetting = (props) => {
  const {
    loading,
    withdraw: { data, size, page, totaldata },
    loadWithdrawRequest,
    setQueryValue,
    clearOne,
    query,
    loadTypeRequest,
    loadSubTypeRequest,
    types,
    sub_types,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  useEffect(() => {
    loadWithdrawRequest(query);
    loadTypeRequest();
  }, [props.query.size, props.query.page]);

  const handleChange = (name) => (event) => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };

  const handleAdd = () => {
    clearOne();
    navigate('/admin/global-setting/add');
  };

  const handleEdit = (id) => {
    clearOne();
    navigate(`/admin/global-setting/edit/${id}`);
  };

  const handlePagination = ({ page, size }) => {
    setQueryValue({ key: 'page', value: page });
    setQueryValue({ key: 'size', value: size });
  };

  const handleQueryChange = (name) => (e) => {
    if (name === 'find_type') {
      loadSubTypeRequest(e.value);
      setQueryValue({ key: 'find_sub_type', value: '' });
      setQueryValue({ key: name, value: e.value });
    } else if (e.target === undefined) {
      setQueryValue({ key: name, value: e.value });
    } else {
      setQueryValue({ key: name, value: e.target.value });
    }
  };

  const handleSearch = () => {
    loadWithdrawRequest(query);
    setQueryValue({ key: 'page', value: 1 });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    props.deleteOneRequest(id);
    setOpen(false);
  };

  let listTypeNormalized = {};

  let listType = types.map((each) => {
    let obj = {
      label: each,
      value: each,
    };

    listTypeNormalized = {
      ...listTypeNormalized,
      [each]: obj,
    };
    return obj;
  });

  let listSubTypeNormalized = {};

  let listSubType = sub_types.map((each) => {
    let obj = {
      label: each,
      value: each,
    };
    listSubTypeNormalized = {
      ...listSubTypeNormalized,
      [each]: obj,
    };
    return obj;
  });

  let removeableOptions = [
    { value: true, label: 'Removeable' },
    { value: false, label: 'Not Removeable' },
  ];

  let removeableNormalized = {};

  let listRemoveable = removeableOptions.map((each) => {
    let obj = {
      label: each.label,
      value: each.value,
    };

    removeableNormalized = {
      ...removeableNormalized,
      [each.value]: obj,
    };
    return obj;
  });

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

  const tablePagination = { page, size, totaldata };

  const tableData = data.map(
    ({ key, sub_type, value, type, is_active, is_removable, _id }) => [
      type,
      sub_type,
      key,

      `${value}`,
      
      <>
      {is_active ? (
        <span className="label-active">Active</span>
      ) : (
        <span className="label-inactive">In-Active</span>
      )}
    </>,

      <div className="flex gap-2">
        <span className="icon-edit" onClick={() => handleEdit(_id)}>
          <FaPen />
        </span>
        {is_removable && is_removable === true && (
          <span className="icon-trash" onClick={() => handleOpen(_id)}>
            <FaTrash />
          </span>
        )}
      </div>,
    ],
  );

  return (
    <>
      <Helmet>
        <title>Global Settings </title>
      </Helmet>
      <DeleteDialog
        open={open}
        doClose={handleClose}
        doDelete={() => handleDelete(deleteId)}
      />
      {loading && loading == true ? <Loading /> : <></>}
      <PageHeader
        title="Global Settings"
        actions={
          <Button variant="primary" onClick={handleAdd}>
            <FaPlus />
            <span className="pl-2">Add New</span>
          </Button>
        }
      />

      <PageContent loading={loading}>
        <TableFilter col={5}>
          <SelectField
            value={listTypeNormalized[query.find_type] || ''}
            id="types"
            placeholder="Search by type"
            onChange={handleQueryChange('find_type')}
            options={listType}
          />
          <SelectField
            value={
              query.find_type && query.find_type !== ''
                ? listSubTypeNormalized[query.find_sub_type]
                : ''
            }
            id="sub_types"
            placeholder="Search by SubType"
            onChange={handleQueryChange('find_sub_types')}
            options={listSubType}
          />
          <SelectField
            value={removeableNormalized[query.find_removable] || ''}
            id="find_removeable"
            placeholder="Search Both"
            onChange={handleQueryChange('find_removable')}
            options={listRemoveable}
          />

          <SelectField
            value={listActiveNormalized[query.find_is_active]}
            onChange={handleQueryDropChange('find_is_active')}
            options={listActive}
            placeholder="Search by Active"
          />

          <TextField
            type="text"
            id="module_name"
            placeholder="Search by key"
            value={query.find_key}
            handleChange={handleQueryChange('find_key')}
            onKeyDown={handleKeyPress}
          />
        <div>
        <Button variant={'dark'} onClick={handleSearch}>
            <FaSearch className="my-1"/> 
          </Button>
        </div>
        </TableFilter>
        <Table
          tableData={tableData}
          tableHead={[
            'Type',
            'Sub Type',
            'Key',
            'Value',
            'Is active',
            'Actions',
          ]}
          pagination={tablePagination}
          handlePagination={handlePagination}
        />
      </PageContent>
    </>
  );
};

GlobalSetting.propTypes = {
  loadWithdrawRequest: PropTypes.func.isRequired,
  withdraw: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  withdraw: makeSelectWithdraw(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
  types: makeSelectTypes(),
  sub_types: makeSelectSubTypes(),
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalSetting);

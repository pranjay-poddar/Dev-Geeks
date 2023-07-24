/**
 *
 * SubModules
 *
 */

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaPen, FaPlus, FaSearch } from 'react-icons/fa';
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
import { useInjectReducer } from '../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../hooks/useInjectSaga';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectAll, makeSelectLoading, makeSelectQuery } from './selectors';

const key = 'subModules';

export const SubModules = (props) => {
  const {
    all: { data, page, size, totaldata },
    query,
    loading,
    loadAllRequest,
    clearOne,
    setQueryValue,
    deleteOneRequest,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [deletedId, setDeletedID] = useState('');

  useEffect(() => {
    loadAllRequest(query);
  }, [query.page, query.size]);

  const handleAdd = () => {
    clearOne();
    navigate('/admin/sub-modules/add');
  };

  const handleEdit = (id) => {
    navigate(`/admin/sub-modules/edit/${id}`);
  };

  const handleQueryChange = (e) => {
    e.persist();
    setQueryValue({ key: e.target.name, value: e.target.value });
  };

  const handleOpen = (id) => {
    setOpen(true);
    setDeletedID(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePagination = ({ page, size }) => {
    setQueryValue({ key: 'page', value: page });
    setQueryValue({ key: 'size', value: size });
  };

  const handleSearch = () => {
    loadAllRequest(query);
    setQueryValue({ key: 'page', value: 1 });
  };

  const handleDelete = (id) => {
    deleteOneRequest(id);
    setOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const tablePagination = { page, size, totaldata };

  const tableData = data.map(
    ({ module_group, order, description, _id, module_group_main }) => [
      module_group,
      order,
      description,
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
        <title>Module Group</title>
      </Helmet>
      <DeleteDialog
        open={open}
        doClose={handleClose}
        doDelete={() => handleDelete(deletedId)}
      />
      <PageHeader
        title="Module Group"
        actions={
          <Button className="flex gap-1" onClick={handleAdd}>
            <FaPlus />
            Add New
          </Button>
        }
      ></PageHeader>

      <PageContent loading={loading}>
        <TableFilter col={3}>
          <TextField
            type="text"
            name="find_title"
            id="contents-title"
            placeholder="Search by title"
            value={query.find_title}
            onChange={handleQueryChange}
            onKeyPress={handleKeyPress}
          />
          <div>
            <Button onClick={handleSearch} variant="dark">
              <FaSearch className="my-1" />
            </Button>
          </div>
        </TableFilter>

        <Table
          tableHead={['Module Group', 'Order', 'Description', 'Action']}
          tableData={tableData}
          pagination={tablePagination}
          handlePagination={handlePagination}
        />
      </PageContent>
    </>
  );
};

SubModules.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubModules);

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaPen, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from '../../../components/Basic/Button';
import TextField from '../../../components/Basic/TextField';
import DeleteDialog from '../../../components/DeleteDialog';
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
import { makeSelectAll, makeSelectLoading, makeSelectQuery } from './selectors';

/* eslint-disable react/prefer-stateless-function */
const ContentsListingPage = (props) => {
  const [state, setState] = useState({
    open: false,
    deleteId: '',
    help: false,
  });

  const navigate = useNavigate();

  useInjectReducer({ key: 'contentsListingPage', reducer });
  useInjectSaga({ key: 'contentsListingPage', saga });

  useEffect(() => {
    props.loadAllRequest(props.query);
  }, [props.query.page, props.query.size]);

  const handlePagination = (paging) => {
    props.setQueryValue({ key: 'page', value: paging.page });
    props.setQueryValue({ key: 'size', value: paging.size });
  };

  const handleAdd = () => {
    props.clearOne();
    navigate('/admin/section-content/add');
  };

  const handleEdit = (id) => {
    navigate(`/admin/section-content/edit/${id}`);
    props.clearOne();
  };

  const handleQueryChange = (e) => {
    e.persist();
    props.setQueryValue({
      key: e.target.name,
      value: e.target.value,
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

  const handleOpen = (id) => {
    setState({ ...state, open: true, deleteId: id });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleDelete = (id) => {
    props.deleteOneRequest(id);
    setState({ ...state, open: false });
  };

  const toggleHelp = () => {
    setState({ ...state, help: !state.help });
  };

  const {
    all: { data, page, size, totalData },
    query,
    loading,
    showForm,
  } = props;

  const tablePagination = { page, size, totaldata: totalData };
  const tableData = data.map(
    ({ name, key, is_active, publish_from, publish_to, _id }) => [
      name,
      key,
      <>
        {is_active ? (
          <span className="label-active">active</span>
        ) : (
          <span className="label-inactive">inactive</span>
        )}
      </>,
      <div className="flex gap-2">
        <span className="icon-edit" onClick={() => handleEdit(_id)}>
          <FaPen />
        </span>
        <span className="icon-trash" onClick={() => handleOpen(_id)}>
          <FaTrash />
        </span>
      </div>,
    ],
  );

  return (
    <>
      <DeleteDialog
        open={state.open}
        doClose={handleClose}
        doDelete={() => handleDelete(state.deleteId)}
      />
      <Helmet>
        <title>Section</title>
      </Helmet>
      {loading && loading === true ? <Loading /> : <></>}
      <PageHeader
        title="Section"
        sdf
        actions={
          <Button onClick={handleAdd} variant="primary">
            <FaPlus />
            Add New
          </Button>
        }
      ></PageHeader>

      <PageContent loading={loading}>
        <TableFilter col={3}>
          <TextField
            type="text"
            name="find_name"
            placeholder="Search by name"
            value={query.find_name}
            handleChange={handleQueryChange}
            onKeyDown={handleKeyPress}
          />
          <TextField
            type="text"
            name="find_key"
            placeholder="Search by key"
            value={query.find_key}
            handleChange={handleQueryChange}
            onKeyDown={handleKeyPress}
          />
          <div>
            <Button onClick={handleSearch} variant="dark">
              <FaSearch className="my-1" />
            </Button>
          </div>
        </TableFilter>
        <Table
          tableHead={['Name', 'Key', 'Is Active', 'Action']}
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentsListingPage);

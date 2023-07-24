/**
 *
 * BlogCategory
 *
 */
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaPen, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
import { DATE_FORMAT } from '../../App/constants';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectAll,
  makeSelectCount,
  makeSelectLoading,
  makeSelectQuery,
} from './selectors';

const key = 'BlogCategory';

/* eslint-disable react/prefer-stateless-function */
const BlogCategory = (props) => {
  const {
    all: { data, page, size, totaldata },
    query,
    loading,
    count,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const navigate = useNavigate();

  const [state, setState] = useState({
    open: false,
    deleteId: '',
    confirmOpen: false,
  });

  useEffect(() => {
    props.loadAllRequest(props.query);
  }, [props.query.size, props.query.page]);

  const handlePagination = (paging) => {
    props.setQueryValue({ key: 'page', value: paging.page });
    props.setQueryValue({ key: 'size', value: paging.size });
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

  const handleEdit = (id) => {
    navigate(`/admin/blog-cat-manage/edit/${id}`);
  };

  const handleOpen = (id) => {
    setState({ open: true, deleteId: id });
    props.getCountRequest(id);
  };

  const handleClose = () => {
    setState({ open: false });
  };

  const handleConfirmOpen = () => {
    setState({ confirmOpen: false, open: false });
  };

  const handleConfirmClose = () => {
    setState({ confirmOpen: false, open: false });
  };

  const handleDelete = (id) => {
    props.deleteCatRequest(id);
  };

  const handleAdd = () => {
    props.clearOne();
    navigate('/admin/blog-cat-manage/add');
  };

  const tablePagination = { page, size, totaldata };
  const tableData = data.map(
    ({ title, image, slug_url, is_active, added_at, updated_at, _id }) => [
      <Link
        className="text-blue-500"
        target="_blank"
        to={`/blog/category/${_id}`}
      >
        {title}
      </Link>,
      // (image && image.fieldname) || '',
      <>
        {is_active ? (
          <span className="label-active">Active</span>
        ) : (
          <span className="label-inactive">In-Active</span>
        )}
      </>,
      ,
      moment(added_at).format(DATE_FORMAT),
      moment(updated_at ? updated_at : added_at).format(DATE_FORMAT),
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
      {/* <DeleteDialog
        open={state.open}
        doClose={handleClose}
        doDelete={() => handleConfirmOpen()}
        body={`You have ${count} with this blog category, if you delete this category all blogs including this category will be deleted. are you sure to delete?`}
        closeButton="No"
        confirmButton="Yes"
      /> */}
      <DeleteDialog
        open={state.open}
        doClose={handleConfirmClose}
        doDelete={() => handleDelete(state.deleteId)}
      />
      <Helmet>
        <title>Blog Category</title>
      </Helmet>
      {loading && loading == true ? <Loading /> : <></>}
      <PageHeader
        title="Blog Category"
        actions={
          <Button onClick={handleAdd} variant="primary">
            <FaPlus />
            Add New
          </Button>
        }
      />
      <PageContent loading={loading}>
        <TableFilter col={2}>
          <TextField
            placeholder="Search Category"
            id="doc-title"
            name="find_title"
            type="text"
            value={query.find_title}
            handleChange={handleQueryChange}
            onKeyDown={handleKeyPress}
          />
          <div>
            <Button variant="dark" onClick={handleSearch}>
              <FaSearch className="my-1" />
            </Button>
          </div>
        </TableFilter>

        <Table
          tableHead={[
            'Title',
            'Is Active',
            'Added At',
            'Updated At',
            'Actions',
          ]}
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
  count: makeSelectCount(),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogCategory);

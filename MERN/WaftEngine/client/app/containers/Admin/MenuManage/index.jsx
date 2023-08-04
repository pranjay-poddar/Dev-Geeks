/**
 *
 * MenuManage
 *
 */

// core components
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaBars, FaPen, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from '../../../components/Basic/Button';
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
import { makeSelectAll, makeSelectLoading, makeSelectQuery } from './selectors';

const key = 'menuManage';

export const MenuManage = (props) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [open, setOpen] = useState(false);
  const [deletedId, setDeletedId] = useState('');

  const navigate = useNavigate();

  const {
    all: { data, page, size, totaldata },
    query,
    loading,
    classes,
    loadAllRequest,
  } = props;

  useEffect(() => {
    loadAllRequest(query);
    props.setLoadChild(false);
    props.clearOne();
  }, [props.query.size, props.query.page]);

  const handleAdd = () => {
    props.clearOne();
    navigate('/admin/menu-manage/add');
  };
  const handleEdit = (id) => {
    navigate(`/admin/menu-manage/edit/${id}`);
  };

  const handleChildEdit = (id) => {
    navigate(`/admin/menu-manage/edit/${id}`);
    props.setLoadChild(true);
  };
  const handleView = (slug_url) => {
    navigate(`/blog/${slug_url}`);
  };
  const handleOpen = (id) => {
    setOpen(true);
    setDeletedId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    props.deleteOneRequest(id);
    setOpen(false);
  };

  const handleQueryChange = (e) => {
    e.persist();
    props.setQueryValue({ key: e.target.name, value: e.target.value });
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

  const handlePagination = (paging) => {
    props.setQueryValue({ key: 'page', value: paging.page });
    props.setQueryValue({ key: 'size', value: paging.size });
  };

  const tablePagination = { page, size, totaldata };
  const tableData = data.map(
    ({ title, key: itemKey, order, is_active, _id }) => [
      title || '',
      itemKey || '',
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
        <span onClick={() => handleChildEdit(_id)} className="icon-button">
          <FaBars />
        </span>
        <span className="icon-trash" onClick={() => handleOpen(_id)}>
          <FaTrash />
        </span>
      </div>,
    ],
  );
  return (
    <>
      <div>
        <Helmet>
          <title>Menu</title>
        </Helmet>
      </div>
      <DeleteDialog
        open={open}
        doClose={handleClose}
        doDelete={() => handleDelete(deletedId)}
      />
      {loading && loading === true ? <Loading /> : <></>}
      <PageHeader
        title="Menu"
        actions={
          <Button onClick={handleAdd} variant="primary">
            <FaPlus />
            Add New
          </Button>
        }
      />
      <PageContent loading={loading}>
        <TableFilter col={3}>
          <TextField
            id="contents-name"
            name="find_title"
            placeholder="Search by title"
            value={query.find_title}
            handleChange={handleQueryChange}
            onKeyDown={handleKeyPress}
            type="text"
          />
          <TextField
            id="contents-key"
            name="find_key"
            type="text"
            placeholder="Search by key"
            value={query.find_key}
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
          tableHead={['Title', 'Key', 'Is Active', 'Action']}
          tableData={tableData}
          pagination={tablePagination}
          handlePagination={handlePagination}
        />
      </PageContent>
    </>
  );
};

MenuManage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuManage);

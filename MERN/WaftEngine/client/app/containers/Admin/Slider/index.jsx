import moment from 'moment';
import qs from 'query-string';
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
import { DATE_FORMAT } from '../../App/constants';
import { makeSelectLocation } from '../../App/selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectAll, makeSelectLoading, makeSelectQuery } from './selectors';

const key = 'sliderManagePage';

/* eslint-disable react/prefer-stateless-function */
const SliderPage = (props) => {
  const {
    loadAllRequest,
    query,
    location: { search },
    setQueryObj,
    all: { data, page, size, totalData },
    loading,
    setQueryValue,
  } = props;

  const [state, setState] = useState({
    display: false,
    open: false,
    deleteId: '',
    help: false,
  });

  const navigate = useNavigate();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    let queryObj = { ...query };
    if (search) {
      queryObj = qs.parse(search);
      setQueryObj(queryObj);
    }

    loadAllRequest(query);
  }, [query.size, query.page]);

  const handlePagination = (paging) => {
    setQueryValue({ key: 'page', value: paging.page });
    setQueryValue({ key: 'size', value: paging.size });
  };

  const handleAdd = () => {
    props.clearOne();
    navigate('/admin/slider-manage/add');
  };

  const handleEdit = (id) => {
    props.clearOne();
    navigate(`/admin/slider-manage/edit/${id}`);
  };

  const handleQueryChange = (e) => {
    e.persist();
    setQueryValue({
      key: e.target.name,
      value: e.target.value,
    });
  };

  const handleSearch = (e) => {
    loadAllRequest(props.query);
    setQueryValue({ key: 'page', value: 1 });
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

  const handleToggle = () => {
    setState((state) => ({ display: !state.display }));
  };

  const toggleHelp = () => {
    setState({ ...state, help: !state.help });
  };

  const { display } = state;

  const tablePagination = { page, size, totaldata: totalData };
  const tableData = data.map(
    ({ slider_name, slider_key, images, added_at, _id }) => [
      slider_name,
      slider_key,
      images.length,
      moment(added_at).format(DATE_FORMAT),
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
        <title>Slider</title>
      </Helmet>
      {loading && loading == true ? <Loading /> : <></>}

      <PageHeader
        title="Slider"
        actions={
          <Button variant="primary" onClick={handleAdd}>
            <FaPlus />
            Add New
          </Button>
        }
      ></PageHeader>

      <PageContent loading={loading}>
        <TableFilter col={2}>
          <TextField
            type="text"
            name="find_slider_name"
            id="slider-name"
            placeholder="Search Slider"
            value={query.find_slider_name}
            onChange={handleQueryChange}
            onKeyDown={handleKeyPress}
          />
          <div className="h-full">
            <Button onClick={handleSearch} variant="dark">
              <FaSearch className="my-1" />
            </Button>
          </div>
        </TableFilter>

        <Table
          tableHead={[
            'Slider Name',
            'Slider Key',
            'Images',
            'Added at',
            'Actions',
          ]}
          tableData={tableData}
          pagination={tablePagination}
          handlePagination={handlePagination}
          emptyDataMsg="No Slider Found"
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SliderPage);

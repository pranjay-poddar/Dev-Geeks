/**
 *
 * Subscribe
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
import { makeSelectAll, makeSelectLoading, makeSelectQuery } from './selectors';

const key = 'adminSubscribePage';

/* eslint-disable react/prefer-stateless-function */
const Subscribe = (props) => {
  const [state, setState] = useState({
    open: false,
    deleteId: '',
  });

  const navigate = useNavigate();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.loadSubscriberRequest(props.query);
  }, [props.query.page, props.query.size]);

  const handlePagination = (paging) => {
    props.setQueryValue({ key: 'page', value: paging.page });
    props.setQueryValue({ key: 'size', value: paging.size });
  };

  const handleView = (id) => {
    props.push(`/admin/subscribe-manage/view/${id}`);
  };

  const handleQueryChange = (e) => {
    e.persist();
    props.setQueryValue({
      key: e.target.name,
      value: e.target.value,
    });
  };

  const handleSearch = () => {
    props.loadSubscriberRequest(props.query);
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

  const {
    all: { data, page, size, totaldata },
    query,
    loading,
  } = props;
  const tablePagination = { page, size, totaldata };
  const tableData = data.map(({ _id, email, is_subscribed, added_at }) => [
    email,
    `${is_subscribed}`,
    moment(added_at).format(DATE_FORMAT),
    <div className="flex gap-2">
      <span className="icon-edit" onClick={() => handleView(_id)}>
        <FaEye />
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
        <title>Subscribes</title>
      </Helmet>
      <PageHeader title="Subscribes" />
      <PageContent loading={loading}>
        <TableFilter col={2}>
          <TextField
            type="text"
            name="find_email"
            id="email"
            placeholder="Search Subscriber"
            value={query.find_email}
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
          tableHead={['Email', 'Is Subscribed', 'Added at', 'Actions']}
          tableData={tableData}
          loading={loading}
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

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);

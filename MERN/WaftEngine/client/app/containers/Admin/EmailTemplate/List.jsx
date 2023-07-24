/**
 *
 * Template
 *
 */

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaPen, FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from '../../../components/Basic/Button';
import Loading from '../../../components/Loading';
import PageContent from '../../../components/PageContent/PageContent';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Table from '../../../components/Table/Table';
import { useInjectReducer } from '../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../hooks/useInjectSaga';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectAll, makeSelectLoading, makeSelectOne } from './selectors';

const key = 'adminTemplateListingPage';

export function Template({
  classes,
  loadAllRequest,
  loadOneRequest,
  addEditRequest,
  setOneValue,
  clearOne,
  all,
  one,
  loading,
  push,
}) {
  const [data, setData] = useState('');

  const navigate = useNavigate();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    clearOne();
    loadAllRequest();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data) {
      addEditRequest();
    }
  };
  const handleTemplateChange = (e) => {
    // if template is not loaded call api
    // else load template to one from store
    const { value } = e.target;
    setData(value);
    value && loadOneRequest(value);
  };
  const handleChange = (e) => {
    setOneValue({ key: e.target.name, value: e.target.value });
  };

  const handleAdd = () => {
    clearOne();
    navigate(`/admin/template-manage/add`);
  };
  const handleEdit = (id) => {
    clearOne();
    navigate(`/admin/template-manage/edit/${id}`);
  };

  const tableData = all.map(({ template_name, template_key, _id }) => [
    template_name,
    template_key,
    <div className="flex">
      <span className="icon-edit" onClick={() => handleEdit(_id)}>
        <FaPen />
      </span>
    </div>,
  ]);
  return (
    <>
      <Helmet>
        <title>Email Template</title>
      </Helmet>

      {loading && loading == true ? <Loading /> : <></>}
      <PageHeader
        title="Email Template"
        actions={
          <Button onClick={handleAdd}>
            <FaPlus />
            Add Template
          </Button>
        }
      >
        Email Template
      </PageHeader>

      <PageContent>
        <Table
          tableData={tableData}
          tableHead={['Name', 'Key', 'Actions']}
          pagination={{ totaldata: all.length, page: 1, size: all.length }}
        />
      </PageContent>
    </>
  );
}

Template.propTypes = {
  all: PropTypes.array.isRequired,
  one: PropTypes.object.isRequired,
  classes: PropTypes.object,
  addEditRequest: PropTypes.func.isRequired,
  loadAllRequest: PropTypes.func.isRequired,
  clearOne: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  one: makeSelectOne(),
  loading: makeSelectLoading(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Template);

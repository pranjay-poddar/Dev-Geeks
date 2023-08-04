/**
 *
 * Template
 *
 */

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from '../../../components/Basic/Button';
import TextField from '../../../components/Basic/TextField';
import WECkEditior from '../../../components/CkEditor';
import Loading from '../../../components/Loading';
import PageContent from '../../../components/PageContent/PageContent';
import PageHeader from '../../../components/PageHeader/PageHeader';
import { useInjectReducer } from '../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../hooks/useInjectSaga';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectAll, makeSelectLoading, makeSelectOne } from './selectors';

const key = 'adminTemplateListingPage';

export function Template({
  loadAllRequest,
  loadOneRequest,
  addEditRequest,
  setOneValue,
  all,
  one,
  loading,
}) {
  const [data, setData] = useState('');
  const { key: routeKey } = useParams();
  const navigate = useNavigate();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    if (routeKey) {
      loadOneRequest(routeKey);
      setData(routeKey);
    }
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

  const handleGoBack = () => {
    navigate('/admin/template-manage');
  };

  const handleChange = (e) => {
    setOneValue({ key: e.target.name, value: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Email Template</title>
      </Helmet>
      {loading && loading == true ? <Loading /> : <></>}

      <PageHeader
        title={`${routeKey ? 'Edit' : 'Add'} Email Template`}
        back="/admin/template-manage"
        actions={
          <>
            <Button onClick={handleGoBack} variant="secondary">
              <FaTimes /> Cancel
            </Button>
            <Button variant="success" onClick={handleSubmit}>
              <FaCheck />
              Save
            </Button>
          </>
        }
      />
      <PageContent>
        <TextField
          className="md:w-1/2 pb-4"
          id="template-name"
          name="template_name"
          label="Template Name"
          type="text"
          value={one.template_name || ''}
          onChange={handleChange}
        />

        <TextField
          className="md:w-1/2 pb-4"
          id="template-key"
          name="template_key"
          label="Template Key"
          type="text"
          value={one.template_key || ''}
          onChange={handleChange}
          disabled={`${routeKey ? true : false}`}
        />

        <TextField
          className="md:w-1/2 pb-4"
          id="informations"
          name="information"
          label="Informations"
          type="text"
          value={one.information || ''}
          onChange={handleChange}
        />

        <TextField
          className="md:w-1/2 pb-4"
          id="variables"
          name="variables"
          label="Variables"
          type="text"
          value={one.variables || ''}
          onChange={handleChange}
        />

        <TextField
          className="md:w-1/2 pb-4"
          id="from_email"
          name="from"
          label="From"
          type="text"
          value={one.from || ''}
          onChange={handleChange}
        />

        <TextField
          className="md:w-1/2 pb-4"
          id="subject_email"
          name="subject"
          label="Subject"
          type="text"
          value={one.subject || ''}
          onChange={handleChange}
        />

        <TextField
          className="md:w-1/2 pb-4"
          id="alternate_text"
          name="alternate_text"
          label="Alternate Text"
          type="text"
          value={one.alternate_text || ''}
          onChange={handleChange}
        />

        <div className="md:w-1/2 pb-4">
          <label className="label">Body</label>
          <WECkEditior
            description={one.body || ''}
            setOneValue={setOneValue}
            is_body
          />
        </div>
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
  loadOneRequest: PropTypes.func.isRequired,
  setOneValue: PropTypes.func.isRequired,
  clearOne: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  one: makeSelectOne(),
  loading: makeSelectLoading(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Template);

import PropTypes from 'prop-types';
import { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from '../../../../components/Basic/Button';
import TextArea from '../../../../components/Basic/TextArea';
import TextField from '../../../../components/Basic/TextField';
import Loading from '../../../../components/Loading';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import { useInjectReducer } from '../../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../../hooks/useInjectSaga';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectErrors,
  makeSelectLoading,
  makeSelectOne,
} from '../selectors';

const key = 'subModules';

const AddEdit = (props) => {
  const {
    clearErrors,
    loadOneRequest,
    one,
    loading,
    errors,
    setOneValue,
    addEditRequest,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const navigate = useNavigate();
  const { id: routeID } = useParams();

  useEffect(() => {
    clearErrors();
    if (routeID) {
      loadOneRequest(routeID);
    }
  }, []);

  const handleChange = (name) => (event) => {
    event.persist();
    if (name === 'value' && event.target.value < 0) {
      setOneValue({ key: name, value: 0 });
    } else {
      setOneValue({ key: name, value: event.target.value });
    }
  };

  const handleGoBack = () => {
    navigate('/admin/sub-modules');
  };

  const handleSave = () => {
    if (one.module_group === '') {
      props.setErrors({ key: 'module_group', value: 'This field is required' });
    } else {
      addEditRequest();
    }
  };

  const handleCheckedChange = (name) => (event) => {
    event.persist();
    setOneValue({ key: name, value: event.target.checked });
  };

  return loading && loading == true ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>{routeID ? 'Edit Group Module' : 'Add Group Module'}</title>
      </Helmet>
      <div>
        <PageHeader
          title={routeID ? 'Edit Group Module' : 'Add Group Module'}
          back="/admin/sub-modules"
          actions={
            <>
              <Button onClick={handleGoBack} variant="secondary">
                <FaTimes /> Cancel
              </Button>
              <Button variant="success" onClick={handleSave}>
                <FaCheck /> Save Changes
              </Button>
            </>
          }
        ></PageHeader>
        <PageContent>
          <TextField
            className="md:w-1/2 pb-4"
            label="Module Group"
            id="grid-group"
            type="text"
            value={one.module_group}
            onChange={handleChange('module_group')}
            error={errors.module_group}
          />

          <TextField
            className="md:w-1/2 pb-4"
            label="Order"
            id="grid-value"
            type="text"
            value={one.order}
            onChange={handleChange('order')}
            error={errors.order}
          />

          <TextArea
            className="md:w-1/2 pb-4"
            label="Description"
            value={one.description || ''}
            handleChange={handleChange('description')}
            placeholder="Enter Description"
          />
        </PageContent>
      </div>
    </>
  );
};

AddEdit.propTypes = {
  loadOneRequest: PropTypes.func.isRequired,
  addEditRequest: PropTypes.func.isRequired,
  setOneValue: PropTypes.func.isRequired,

  one: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEdit);

import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from '../../../../components/Basic/Button';
import Checkbox from '../../../../components/Basic/Checkbox';
import TextArea from '../../../../components/Basic/TextArea';
import TextField from '../../../../components/Basic/TextField';
import Loading from '../../../../components/Loading';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import '../../../../components/Table/table.css';
import { useInjectReducer } from '../../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../../hooks/useInjectSaga';
import * as mapDispatchToProps from '../actions';
// core components
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectErrors,
  makeSelectLoading,
  makeSelectOne,
} from '../selectors';

const key = 'adminRole';

const AddEdit = (props) => {
  const navigate = useNavigate();
  const { id: routeID } = useParams();

  useEffect(() => {
    props.clearErrors();
    if (routeID) {
      props.loadOneRequest(routeID);
    }
  }, []);

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const handleChange = (name) => (event) => {
    event.persist();
    props.setOneValue({ key: name, value: event.target.value });
  };

  const handleChecked = (name) => (event) => {
    event.persist();
    props.setOneValue({ key: name, value: event.target.checked });
  };

  const handleSave = () => {
    props.addEditRequest();
  };

  const handleBack = () => {
    navigate('/admin/role-manage');
  };

  const { classes, one, match, loading, errors } = props;
  return loading && loading == true ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>
          {match && match.params && match.params.id ? 'Edit Role' : 'Add Role'}
        </title>
      </Helmet>
      <PageHeader
        title={
          match && match.params && match.params.id ? 'Edit Role' : 'Add Role'
        }
        back="/admin/role-manage"
        actions={
          <div className="flex gap-2">
            <Button onClick={handleBack} variant="secondary">
              <FaTimes /> Cancel
            </Button>
            <Button variant="success" onClick={handleSave}>
              <FaCheck />
              Save
            </Button>
          </div>
        }
      />
      <PageContent>
        <TextField
          className="md:w-1/2 pb-4"
          label="Role Title"
          id="role_title"
          type="text"
          value={one.role_title}
          onChange={handleChange('role_title')}
          error={errors && errors.role_title}
        />
        <TextArea
          className="md:w-1/2"
          label="Description"
          value={one.description}
          handleChange={handleChange('description')}
          required
          placeholder="Enter Description"
        />

        <Checkbox
          label="Is Active"
          id="is_active"
          name="is_active"
          handleChange={handleChecked('is_active')}
          checked={one.is_active || false}
        />
      </PageContent>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEdit);

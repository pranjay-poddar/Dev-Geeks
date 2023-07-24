/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FaCheck, FaExchangeAlt, FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from '../../../../components/Basic/Button';
import SelectField from '../../../../components/Basic/Select';
import TextField from '../../../../components/Basic/TextField';
import Loading from '../../../../components/Loading';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
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
  makeSelectSubModules,
} from '../selectors';
import PathComponent from './components/Path';

const key = 'adminModuleManage';

const AddEdit = (props) => {
  const { id: routeID } = useParams();
  const navigate = useNavigate();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.clearErrors();
    if (routeID) {
      props.loadOneRequest(routeID);
    }
    props.loadSubModuleRequest();
  }, []);

  const handleChange = (name) => (event) => {
    event.persist();
    props.setOneValue({ key: name, value: event.target.value });
  };

  const handleDropdownChange = (name) => (event) => {
    props.setOneValue({ key: name, value: event.value });
  };

  const handleChecked = (name) => (event) => {
    event.persist();
    props.setOneValue({ key: name, value: event.target.checked });
  };

  const handleAddPath = (event) => {
    event.persist();
    props.setOneValue({
      key: 'path',
      value: [
        ...props.one.path,
        { access_type: '', admin_routes: [], server_routes: [] },
      ],
    });
  };

  const handleRemovePath = (pathIndex) => (event) => {
    event.persist();
    props.setOneValue({
      key: 'path',
      value: [
        ...props.one.path.slice(0, pathIndex),
        ...props.one.path.slice(pathIndex + 1),
      ],
    });
  };

  const handleAccessTypeChange = (pathIndex) => (event) => {
    event.persist();

    props.setAccessTypeChange({ pathIndex, data: event.target.value });
  };

  const handleAdminRoutesChange = (pathIndex, index) => (event) => {
    event.persist();

    props.setAdminRoutes({ pathIndex, index, data: event.target.value });
  };

  const handleRemoveAdminRoute = (pathIndex, index) => (event) => {
    event.persist();

    props.removeAdminRoutes({
      pathIndex,
      index,
      data: event.target.value,
    });
  };

  const handleAddAdminRoute = (pathIndex) => (event) => {
    event.persist();

    props.addAdminRoutes({
      pathIndex,
      data: event.target.value,
    });
  };

  const handleServerRoutesMethodChange = (pathIndex, index) => (event) => {
    props.setServerRouteMethod({
      pathIndex,
      index,
      data: event.value,
    });
  };

  const handleServerRoutesRouteChange = (pathIndex, index) => (event) => {
    event.persist();

    props.setServerRouteChange({
      pathIndex,
      index,
      data: event.target.value,
    });
  };

  const handleChangeAccess = () => {
    props.clearOne();

    navigate(`/admin/module-manage/access/${routeID}`);
  };

  const handleAddServerRoute = (index) => (event) => {
    event.persist();

    props.addServerRoutes({
      index,
    });
  };

  const handleRemoveServerRoute = (pathIndex, index) => (event) => {
    event.persist();

    props.removeServerRoutes({
      pathIndex,
      index,
      data: event.target.value,
    });
  };

  const handleSave = () => {
    props.addEditRequest();
  };

  const handleBack = () => {
    navigate('/admin/module-manage');
  };

  const { one, loading, errors, sub_modules } = props;

  let listSubModulesNormalized = {};
  const listSubModules = sub_modules.map((each) => {
    const obj = {
      label: each.module_group,
      value: each._id,
    };
    listSubModulesNormalized = {
      ...listSubModulesNormalized,
      [each._id]: obj,
    };
    return obj;
  });

  return loading && loading == true ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>{routeID ? 'Edit' : 'Add'} Module</title>
      </Helmet>
      <PageHeader
        className="backbtn"
        back="/admin/module-manage"
        title={routeID ? `Edit for ${one.module_name}` : 'Add Module'}
        actions={
          <>
            <Button onClick={handleBack} variant="error">
              <FaTimes /> Cancel
            </Button>
            {routeID && (
              <Button variant="primary" onClick={handleChangeAccess}>
                <FaExchangeAlt />
                <span>Change Access</span>
              </Button>
            )}
            <Button variant="success" onClick={handleSave}>
              <FaCheck /> Save
            </Button>
          </>
        }
      />
      <PageContent loading={loading}>
        <TextField
          label="Module Name"
          id="module_name"
          value={one.module_name || ''}
          handleChange={handleChange('module_name')}
          type="text"
          error={errors.module_name && errors.module_name}
          className="md:w-1/2 pb-2"
        />

        <TextField
          label="Description"
          id="description"
          value={one.description || ''}
          handleChange={handleChange('description')}
          type="text"
          error={errors.description && errors.description}
          className="md:w-1/2 pb-2"
        />

        <div className="md:w-1/2 pb-2">
          <SelectField
            label="Sub Module"
            value={listSubModulesNormalized[one.module_group] || null}
            placeholder="Choose"
            id="category"
            onChange={handleDropdownChange('module_group')}
            options={listSubModules}
            isSearchable
          />
        </div>

        {one.path.map((each, pathIndex) => (
          <PathComponent
            key={`${each._id}-${pathIndex}`}
            each={each}
            pathIndex={pathIndex}
            handleAccessTypeChange={handleAccessTypeChange}
            handleAdminRoutesChange={handleAdminRoutesChange}
            handleRemoveAdminRoute={handleRemoveAdminRoute}
            handleAddAdminRoute={handleAddAdminRoute}
            handleServerRoutesMethodChange={handleServerRoutesMethodChange}
            handleServerRoutesRouteChange={handleServerRoutesRouteChange}
            handleRemoveServerRoute={handleRemoveServerRoute}
            handleAddServerRoute={handleAddServerRoute}
            handleRemovePath={handleRemovePath}
          />
        ))}
        <Button className="mt-4" variant="primary" onClick={handleAddPath}>
          Add Access Type
        </Button>
      </PageContent>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  sub_modules: makeSelectSubModules(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEdit);

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaRegEye, FaRegEyeSlash, FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from '../../../../components/Basic/Button';
import Checkbox from '../../../../components/Basic/Checkbox';
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
  makeSelectRoles,
} from '../selectors';

const key = 'adminUserManagePage';

const AddEdit = (props) => {
  const [state, setState] = useState({
    isSecure: true,
    tab: 'basic',
  });

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const navigate = useNavigate();
  const { id: routeID } = useParams();

  useEffect(() => {
    props.clearErrors();
    if (routeID) {
      props.loadOneRequest(routeID);
    }
    props.loadAllRolesRequest();
  }, []);

  const handleChange = (name) => (event) => {
    event.persist();
    const tempUser = { ...props.one.users };
    tempUser[name] = event.target.value;
    props.setOneValue({ key: 'users', value: tempUser });
  };

  const handleChecked = (name) => (event) => {
    event.persist();
    const tempUser = { ...props.one.users };
    tempUser[name] = event.target.checked;
    props.setOneValue({ key: 'users', value: tempUser });
  };

  const handleRolesChecked = (roleid) => {
    const tempUser = { ...props.one.users };
    if (tempUser.roles.includes(roleid)) {
      const index = tempUser.roles.indexOf(roleid);
      tempUser.roles = [
        ...tempUser.roles.slice(0, index),
        ...tempUser.roles.slice(index + 1),
      ];
    } else {
      tempUser.roles = [...tempUser.roles, roleid];
    }
    props.setOneValue({ key: 'users', value: tempUser });
  };

  const handleTogglePassword = () => {
    setState({ ...state, isSecure: !state.isSecure });
  };

  const handleSave = () => {
    props.addEditRequest();
  };

  const handleUpdate = () => {
    props.updatePasswordRequest();
  };

  const handleBack = () => {
    navigate('/admin/user-manage');
  };

  const handleTab = (tabVal) => {
    setState({ ...state, tab: tabVal });
  };

  const {
    one: { users, rolesNormalized, roles },
    roless,
    loading,
    errors,
  } = props;
  return loading && loading == true ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>{routeID ? 'Edit User' : 'Add User'}</title>
      </Helmet>

      <PageHeader
        back="/admin/user-manage"
        title={routeID ? `Edit ${'User'}` : `Add ${'User'}`}
        actions={
          <div className="flex gap-2 items-center pt-2">
            <Button onClick={handleBack} variant="error">
              <FaTimes className="mr-1" /> Cancel
            </Button>

            {state.tab === 'reset' ? (
              <Button
                onClick={handleUpdate}
                variant="primary"
                className="block btn"
              >
                {routeID ? 'Update Password' : 'Save'}
              </Button>
            ) : (
              <Button onClick={handleSave} variant="primary">
                Save
              </Button>
            )}
          </div>
        }
      ></PageHeader>

      <PageContent>
        {window.location.pathname.includes('edit') && (
          <div className="flex border border-b-0 Waft_Tab">
            <Button
              onClick={() => handleTab('basic')}
              variant="light"
              className={`block py-2 px-4 hover:text-primary border-r ${
                state.tab === 'basic' ? 'active' : ''
              }`}
            >
              Basic Info
            </Button>

            <Button
              variant="light"
              className={`block py-2 px-4 hover:text-primary border-r ${
                state.tab === 'reset' ? 'active' : ''
              }`}
              onClick={() => handleTab('reset')}
            >
              Reset Password
            </Button>
          </div>
        )}
        {state.tab === 'basic' && (
          <div className="p-4 border">
            <div>
              {window.location.pathname.includes('edit') ? null : (
                <h3 className="text-lg font-bold mb-2">Basic Information</h3>
              )}
            </div>

            <TextField
              className="md:w-1/2 pb-4"
              label={'Email'}
              type="text"
              value={users.email || ''}
              onChange={handleChange('email')}
              error={errors && errors.email}
            />

            <TextField
              className="md:w-1/2 pb-4"
              label={'Name'}
              type="text"
              value={users.name || ''}
              onChange={handleChange('name')}
              errors={errors.name}
            />

            <TextField
              className="md:w-1/2 pb-4"
              label={'Bio'}
              type="text"
              value={users.bio || ''}
              onChange={handleChange('bio')}
              errors={errors.bio}
            />

            {roless.map((each) => (
              <Checkbox
                label={each.role_title || ''}
                name={each._id}
                handleChange={() => handleRolesChecked(each._id)}
                checked={users.roles.includes(each._id)}
                error={errors && errors.roles}
              />
            ))}

            <Checkbox
              label="Email Verified"
              name="email_verified"
              handleChange={handleChecked('email_verified')}
              checked={users.email_verified || false}
            />

            <Checkbox
              label="Active?"
              name="is_active"
              handleChange={handleChecked('is_active')}
              checked={users.is_active || false}
            />

            {window.location.pathname.includes('add') ? (
              <>
                <h3 className="text-lg font-bold mt-3">
                  {window.location.pathname.includes('edit')
                    ? 'Reset '
                    : 'New '}
                  Password
                </h3>

                <div className="md:w-1/2 pb-4">
                  <TextField
                    label={'Password'}
                    type={state.isSecure ? 'password' : 'text'}
                    value={users.password || ''}
                    onChange={handleChange('password')}
                    append={state.isSecure ? <FaRegEye /> : <FaRegEyeSlash />}
                    onClick={handleTogglePassword}
                    error={errors.password || ''}
                  />
                </div>
              </>
            ) : null}
          </div>
        )}
        {state.tab === 'reset' && (
          <div className="p-4 border">
            <div className="md:w-1/2 pb-4">
              <TextField
                label={'Password'}
                type={state.isSecure ? 'password' : 'text'}
                value={users.password || ''}
                onChange={handleChange('password')}
                append={state.isSecure ? <FaRegEye /> : <FaRegEyeSlash />}
                onClick={handleTogglePassword}
                error={errors.password || ''}
              />
            </div>

            <div className="mt-4"></div>
          </div>
        )}
      </PageContent>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  roless: makeSelectRoles(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEdit);

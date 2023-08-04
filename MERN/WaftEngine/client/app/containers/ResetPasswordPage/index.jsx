/**
 *
 * ResetPasswordPage
 *
 */

import { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../hooks/useInjectReducer';
import { useInjectSaga } from '../../hooks/useInjectSaga';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectDefaultData,
  makeSelectErrors,
  makeSelectLoading,
  reduxKey,
} from './selectors';

export const ResetPasswordPage = (props) => {
  const {
    loadResetRequest,
    setData,
    clearErrors,
    defaultData,
    loading,
    errors,
  } = props;
  const { email, code } = useParams();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  useEffect(() => {
    if (email !== '') {
      setData({ key: 'email', value: email });
    }
    if (code !== undefined && code !== '') {
      setData({ key: 'code', value: code });
    } else {
      setData({ key: 'code', value: '' });
    }
  }, []);

  const handleChange = (e) => {
    e.persist();
    setData({ key: e.target.name, value: e.target.value });
  };

  const handleSubmit = () => {
    loadResetRequest();
  };

  return (
    <div className="max-w-lg mx-auto p-16">
      <h1 className="text-2xl font-bold">Reset your password</h1>
      <input
        className="inputbox w-full"
        id="email"
        name="email"
        type="text"
        value={defaultData.email}
        placeholder="Enter email"
        onChange={handleChange}
        disabled
      />
      <div className="error">{errors && errors.email}</div>

      <input
        className="inputbox w-full"
        id="code"
        name="code"
        type="text"
        value={defaultData.code}
        placeholder="Enter code"
        onChange={handleChange}
      />
      <div className="error">{errors && errors.code}</div>
      <input
        className="inputbox w-full mt-4"
        id="password"
        name="password"
        type="password"
        value={defaultData.password}
        placeholder="Enter password"
        onChange={handleChange}
      />
      <div className="error">{errors && errors.password}</div>
      <input
        className="inputbox w-full mt-4"
        id="confirm-password"
        name="confirm_password"
        type="password"
        value={defaultData.confirm_password}
        placeholder="Confirm password"
        onChange={handleChange}
      />
      <div className="error">{errors && errors.confirm_password}</div>
      <button
        className="py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
        onClick={handleSubmit}
      >
        {loading ? '...' : 'SUBMIT'}
      </button>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  defaultData: makeSelectDefaultData(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(ResetPasswordPage);

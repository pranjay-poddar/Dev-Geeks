/**
 *
 * ForgotPasswordUser
 *
 */

import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../hooks/useInjectReducer';
import { useInjectSaga } from '../../hooks/useInjectSaga';
import * as mapDispatchToProps from './actions';
import UsernameInput from './components/UsernameInput';
import reducer from './reducer';
import saga from './saga';
import { makeSelectErrors, reduxKey } from './selectors';

const ForgotPasswordUser = ({
  classes,
  forgotPasswordRequest,
  error,
  clearError,
}) => {
  useInjectReducer({ key: reduxKey, reducer: reducer });
  useInjectSaga({ key: reduxKey, saga: saga });
  useEffect(() => {
    clearError();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPasswordRequest();
  };
  return (
    <div className="max-w-lg mx-auto p-16">
      <h1 className="text-2xl font-bold">Forgot your password?</h1>
      <p>
        Don’t worry! Just fill in your email and we’ll help you reset your
        password.
      </p>
      <form className="my-4" onSubmit={handleSubmit}>
        <UsernameInput error={error.email} />

        <button
          className="py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
          type="submit"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

ForgotPasswordUser.propTypes = {
  forgotPasswordRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectErrors(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordUser);

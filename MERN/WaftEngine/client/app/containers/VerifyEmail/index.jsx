/**
 *
 * VerifyEmail
 *
 */

import { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../hooks/useInjectReducer';
import { useInjectSaga } from '../../hooks/useInjectSaga';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectLoading, reduxKey } from './selectors';

export const VerifyEmail = (props) => {
  const { loading } = props;

  const { email, code } = useParams();

  const [formEmail, setEmail] = useState('');
  const [formCode, setCode] = useState('');

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  useEffect(() => {
    if (email !== '' && code !== undefined) {
      props.loadVerifyEmailRequest({ email, code });
    }
    if (email !== '') {
      setEmail(email);
    }
    if (code !== undefined && code !== '') {
      setCode(code);
    }
  }, []);
  const handleVerify = () => {
    if (formCode !== '' && formEmail !== '') {
      props.loadVerifyEmailRequest({ email: formEmail, code: formCode });
    }
  };

  const handleEmail = () => (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleCode = () => (event) => {
    const { value } = event.target;
    setCode(value);
  };

  const handleResend = () => {
    if (formEmail !== '') {
      props.resendMailRequest({ email: formEmail });
    }
  };

  return (
    <div>
      {loading ? (
        <h2>Verifying...</h2>
      ) : (
        <div className="mt-4">
          <div className="m-auto w-1/2">
            <label htmlFor="email">Email</label>
            <input
              className="inputbox"
              onChange={handleEmail('email')}
              value={formEmail}
              id="email"
              type="text"
              name="Email"
            />
          </div>
          <div className="m-auto w-1/2 mt-2">
            <label htmlFor="code">Code</label>
            <input
              className="inputbox"
              onChange={handleCode('code')}
              value={formCode}
              id="code"
              type="text"
              name="Code"
            />
          </div>
          <div className="m-auto w-1/2 mt-4">
            <button
              className="inline-block align-baseline text-xs text-blue-700 hover:text-blue-700-darker"
              onClick={handleResend}
              type="button"
            >
              Resend code.
            </button>
          </div>
          <div className="m-auto w-1/2">
            <button
              className="py-2 px-6 rounded mt-2 text-sm text-white bg-blue-600 hover:bg-blue-700 btn-theme"
              onClick={handleVerify}
              type="button"
            >
              Verify
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(VerifyEmail);

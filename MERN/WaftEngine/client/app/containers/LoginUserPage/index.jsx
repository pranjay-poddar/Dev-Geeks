/**
 *
 * LoginUserPage
 *
 */

import { useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from '../../components/Basic/Button';
import Modal from '../../components/Modal';
import { useInjectReducer } from '../../hooks/useInjectReducer';
import { useInjectSaga } from '../../hooks/useInjectSaga';
import { FB_APP_FIELDS, FB_APP_ID, GOOGLE_CLIENT_ID } from '../App/constants';
import * as mapDispatchToProps from './actions';
import PasswordInput from './components/PasswordInput';
import UsernameInput from './components/UsernameInput';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectEmailError,
  makeSelectErrors,
  makeSelectHelperObj,
  makeSelectLoading,
  makeSelectLoadingObj,
  makeSelectPasswordError,
  makeSelectTwoFactor,
} from './selectors';

const LoginUserPage = (props) => {
  const {
    classes,
    loginRequest,
    loginWithFbRequest,
    loginWithGoogleRequest,
    loading,
    errors,
    emailErr,
    passwordErr,
    twoFactor,
    loadingObj: { loggingUser, sendingCode },
    helperObj: { showEmailTwoFactor, showGoogleTwoFactor },
    setOpen,
  } = props;

  useInjectReducer({ key: 'loginUserPage', reducer });
  useInjectSaga({ key: 'loginUserPage', saga });

  const handleClose = () => {
    props.setValue({
      name: 'helperObj',
      key: 'showEmailTwoFactor',
      value: false,
    });
    props.setValue({
      name: 'helperObj',
      key: 'showGoogleTwoFactor',
      value: false,
    });
  };

  useEffect(() => {
    handleClose();
    props.clearStore({ name: 'errors' });
  }, []);

  const handleChange = (e, name) => {
    props.setValue({
      name: 'twoFactor',
      key: 'multi_fa',
      value: {
        ...twoFactor.multi_fa,
        [name]: {
          ...twoFactor.multi_fa[name],
          [e.target.name]: e.target.value,
        },
      },
    });
    props.setValue({
      name: 'errors',
      key: 'multi_fa',
      value: {
        ...errors.multi_fa,
        [name]: { ...errors.multi_fa[name], [e.target.name]: '' },
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginRequest();
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();
    props.addTwoFactorRequest();
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Modal
        open={showEmailTwoFactor || showGoogleTwoFactor}
        handleClose={handleClose}
        handleUpdate={handleSubmitCode}
        buttonLabel2={
          sendingCode ? (
            <>
              <div className="flex text-center justify-center">
                <div className="loading_wrapper">
                  <span className="font-bold mr-2 my-auto text-white">
                    Sending
                  </span>
                  <div className="dot-elastic" />{' '}
                </div>
              </div>
            </>
          ) : (
            'Continue'
          )
        }
        width="sm"
      >
        {showEmailTwoFactor && (
          <div className="border p-2 m-2">
            <label>Enter the code</label>
            <label className="text-xs">Check inbox for the code</label>
            <input
              id="code"
              name="code"
              value={twoFactor && twoFactor.email && twoFactor.email.code}
              onChange={(e) => handleChange(e, 'email')}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmitCode(e)}
            />
            <div className="error">
              {errors && errors.multi_fa && errors.multi_fa.email.code}
            </div>
          </div>
        )}

        {showGoogleTwoFactor && (
          <div className="border p-2 m-2">
            <label>Enter the code</label>
            <label className="text-xs">
              Copy code from Google Authentication App
            </label>
            <input
              id="code"
              name="code"
              value={
                twoFactor &&
                twoFactor.google_authenticate &&
                twoFactor.google_authenticate.code
              }
              onChange={(e) => handleChange(e, 'google_authenticate')}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmitCode(e)}
            />
            <div className="error">
              {errors &&
                errors.multi_fa &&
                errors.multi_fa.google_authenticate.code}
            </div>
          </div>
        )}
      </Modal>
      <div className="py-40 h-full bg-gray-50">
        <div className="mx-auto max-w-md p-5 lg:p-10 bg-white shadow-2xl rounded-lg">
          <h1 className="font-bold text-2xl">LOGIN</h1>
          <form className="mt-4" onSubmit={handleSubmit}>
            <UsernameInput />
            <PasswordInput />
            <Button className="w-full my-4" showLoader>
              Login
            </Button>
          </form>
          <Link
            className="inline-block align-baseline text-xs text-blue-700 hover:text-blue-700-darker"
            to="/signup"
          >
            Don't Have Account? Register
          </Link>
          <p className="text-muted text-center mt-4 mb-4 text-xs">
            OR LOGIN WITH
          </p>
          <div className="mt-5 mb-5 grid grid-cols-2">
            <FacebookLogin
              appId={FB_APP_ID}
              textButton="Facebook"
              autoLoad={false}
              fields={FB_APP_FIELDS}
              callback={loginWithFbRequest}
              onFailure={(err) => {
                console.log('something went wrong!', err);
              }}
              containerStyle={{
                textAlign: 'center',
                backgroundColor: '#3b5998',
                borderColor: '#3b5998',
                flex: 1,
                color: '#fff',
                cursor: 'pointer',
              }}
              buttonStyle={{
                flex: 1,
                textTransform: 'none',
                padding: '12px',
                background: 'none',
                border: 'none',
                fontSize: '13px',
              }}
              icon="fa-facebook"
            />
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Google"
              onSuccess={loginWithGoogleRequest}
              onFailure={(err) => {
                console.log('something went wrong!', err);
              }}
              cookiePolicy="single_host_origin"
              buttonStyle={{
                flex: 1,
                textTransform: 'none',
                padding: '12px',
                background: 'none',
                border: 'none',
                fontSize: '13px',
                boxShadow: 'none',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  emailErr: makeSelectEmailError(),
  passwordErr: makeSelectPasswordError(),
  twoFactor: makeSelectTwoFactor(),
  helperObj: makeSelectHelperObj(),
  loadingObj: makeSelectLoadingObj(),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginUserPage);

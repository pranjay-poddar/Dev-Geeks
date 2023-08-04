/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FaCheck, FaEnvelopeOpenText, FaRegEnvelopeOpen } from 'react-icons/fa';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Dialog from '../../../components/Dialog';
import { useInjectSaga } from '../../../hooks/useInjectSaga';
import * as mapDispatchToProps from '../actions';
import saga from '../saga';
import TextField from '../../../components/Basic/TextField';
import Google from '../google.png';

import {
  makeSelectErrors,
  makeSelectHelperObj,
  makeSelectLoading,
  makeSelectLoadingObj,
  makeSelectTwoFactor,
} from '../selectors';

const key = 'userPersonalInformationPage';

export const TwoFactor = (props) => {
  const {
    classes,
    twoFactor,
    errors,
    helperObj: { showGoogleTwoFactor },
    loading,
    loadingObj: { loadTwoFactor, addEmailAuth, addGoogleAuth, setGoogleCode },
  } = props;
  useInjectSaga({ key, saga });

  const handleClose = () => {
    props.setValue({
      name: 'helperObj',
      key: 'showGoogleTwoFactor',
      value: false,
    });
  };

  useEffect(() => {
    handleClose();
    props.clearError();
    props.loadTwoFactorRequest();
  }, []);

  const handleChecked = (event) => {
    // console.log(event.target.checked);

    props.setValue({
      name: 'twoFactor',
      key: event.target.name,
      value: {
        is_authenticate: event.target.checked,
      },
    });

    if (event.target.name === 'email') {
      // console.log(event.target.name, 'this is email');
      props.addEmailTwoFactorRequest({
        is_authenticate: event.target.checked,
      });
    } else if (event.target.name === 'google_authenticate') {
      // console.log(event.target.name, 'this is google');
      props.addGoogleTwoFactorRequest({
        is_authenticate: event.target.checked,
      });
    }
  };

  const handleChange = (event, name) => {
    props.setValue({
      name: 'twoFactor',
      key: name,
      value: {
        ...twoFactor.google_authenticate,
        [event.target.name]: event.target.value,
      },
    });
    props.clearData({ name: 'errors' });
  };

  const handleSubmitCode = () => {
    props.setGoogleTwoFactorRequest();
  };

  return loadTwoFactor ? (
    <div className="p-4 ">Loading</div>
  ) : (
    <>
      <Dialog
        open={showGoogleTwoFactor}
        className="max-w-sm text-sm"
        onClose={handleClose}
        title={`Two Factor Authorization`}
        body={
          <>
            <div>
              <label>Google Two factor authorization code</label>
              <input
                id="two_factor_authorization"
                name="two_factor_authorization"
                disabled
                readOnly
                value={
                  twoFactor && twoFactor.google_authenticate.auth_secret_setup
                }
              />
              <div className="error">{errors.two_fa_ga_auth_secret}</div>
            </div>
            <div className="m-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                fill="true"
              >
                <path
                  d={
                    twoFactor &&
                    twoFactor.google_authenticate &&
                    twoFactor.google_authenticate.qrcode &&
                    twoFactor.google_authenticate.qrcode.path
                  }
                  style={{ transform: 'scale(4)' }}
                />
              </svg>
            </div>
            <div>
              <label>Enter Your Code From Authentication App</label>
              <TextField
                id="code"
                name="code"
                value={twoFactor && twoFactor.code}
                onChange={(e) => handleChange(e, 'google_authenticate')}
              />
              <div className="error">{errors.code}</div>
            </div>
          </>
        }
      />

      <div className="p-4 border rounded">
        <FaRegEnvelopeOpen className="text-4xl text-gray-500" />
        <h3 className="text-lg mt-2">E-mail Authentication</h3>
        <p>
          Checking your E-mail for authentication will help secure your account
          from unauthorized access.
        </p>
        <div className="checkbox">
          <input
            checked={twoFactor.email.is_authenticate}
            id="email"
            type="checkbox"
            name="email"
            onChange={handleChecked}
          />
          <label htmlFor="email">
            <span className="box">
              <FaCheck className="check-icon" />
            </span>
            Enable Email Authentication
          </label>
        </div>
      </div>

      {/* {addEmailAuth && 'Loading...'} */}
      <div className="mt-4 p-4 border rounded">
        <img className="h-12 w-12" src={Google} />
        <h3 className="text-lg mt-2">Google Authentication</h3>
        <p>
          Google Authenticator is a software-based authenticator by Google that
          implements two-step verification services.
        </p>
        <div className="checkbox">
          <input
            checked={twoFactor.google_authenticate.is_authenticate}
            id="google_authenticate"
            name="google_authenticate"
            type="checkbox"
            onChange={handleChecked}
          />
          <label htmlFor="google_authenticate">
            <span className="box">
              <FaCheck className="check-icon" />
            </span>
            Enable Google Authentication
          </label>
        </div>
      </div>
      {/* {addGoogleAuth && 'Loading...'} */}
    </>
  );
};

TwoFactor.propTypes = {
  loadTwoFactorRequest: PropTypes.func,
  addTwoFactorRequest: PropTypes.func,
  setValue: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  twoFactor: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  twoFactor: makeSelectTwoFactor(),
  loading: makeSelectLoading(),
  helperObj: makeSelectHelperObj(),
  loadingObj: makeSelectLoadingObj(),
});

export default connect(mapStateToProps, mapDispatchToProps)(TwoFactor);

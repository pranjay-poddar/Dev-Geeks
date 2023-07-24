import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../hooks/useInjectReducer';
import { useInjectSaga } from '../../hooks/useInjectSaga';
import { RECAPTCHA_SITE_KEY } from '../App/constants';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectContactDetail,
  makeSelectError,
  makeSelectErrorMsg,
  makeSelectIsRequesting,
  makeSelectSuccess,
} from './selectors';

const ContactUs = (props) => {
  useInjectReducer({ key: 'contactUs', reducer });
  useInjectSaga({ key: 'contactUs', saga });

  const recaptchaRef = useRef(null);
  const [state, setState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    reCaptcha: '',
  });

  const handleChange = (name) => (event) => {
    setState((prev) => ({ ...prev, [name]: event.target.value }));
  };

  useEffect(() => {
    if (props.success) {
      setState({ name: '', email: '', subject: '', message: '' }, () => {
        window.grecaptcha && window.grecaptcha.reset();
      });
    }
  }, [props.success]);

  const handleSave = () => {
    props.saveContactRequest(state);
  };

  const onSubmit = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    props.onSubmit(recaptchaValue);
  };

  const onChange = (e) => {
    setState((prev) => ({ ...prev, reCaptcha: e }));
  };

  const { isRequesting, contactDetail, errors, errorMsg } = props;
  const { name, email, subject, message } = state;

  return (
    <div className="">
      <Helmet>
        <title>Contact</title>
      </Helmet>
      <div className="container mx-auto py-10 px-5 sm:px-0">
        <div className="max-w-xl">
          <h1 className="text-2xl">Contact</h1>
          <div className="mt-4">
            <div>
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs mb-2 text-black"
                htmlFor="name"
              >
                Name
              </label>
              <input
                onChange={handleChange('name')}
                value={name}
                className="inputbox"
                id="name"
                type="text"
              />
              {errors && errors.name && (
                <div className="error">{errors.name}</div>
              )}
            </div>
            <div className="mt-4">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs mb-2 text-black"
                htmlFor="email"
              >
                Email
              </label>
              <input
                value={email}
                onChange={handleChange('email')}
                className="inputbox"
                id="email"
                type="text"
              />
              {errors && errors.email && (
                <div className="error">{errors.email}</div>
              )}
            </div>
          </div>
          <div className="mt-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2 text-black"
              htmlFor="subject"
            >
              Subject
            </label>
            <input
              value={subject}
              onChange={handleChange('subject')}
              className="inputbox"
              id="subject"
              type="text"
            />
            {errors && errors.subject && (
              <div className="error">{errors.subject}</div>
            )}
          </div>
          <div className="w-full mt-4">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs mb-2 text-black"
              htmlFor="subject"
            >
              Message
            </label>
            <textarea
              rows="4"
              value={message}
              onChange={handleChange('message')}
              className="inputbox"
              id="message"
              type="text"
            />
            {errors && errors.message && (
              <div className="error">{errors.message}</div>
            )}
          </div>
          <div className="mt-4">
            {isRequesting && isRequesting == true ? (
              <>Loading</>
            ) : (
              <form onSubmit={onSubmit}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={onChange}
                />
              </form>
            )}
            {errorMsg && errorMsg !== '' && (
              <div className="error">{errorMsg}</div>
            )}
          </div>
          <button
            type="button"
            className="block btn text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
            disabled={isRequesting}
            onClick={handleSave}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isRequesting: makeSelectIsRequesting(),
  success: makeSelectSuccess(),
  errorMsg: makeSelectErrorMsg(),
  errors: makeSelectError(),
  contactDetail: makeSelectContactDetail(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);

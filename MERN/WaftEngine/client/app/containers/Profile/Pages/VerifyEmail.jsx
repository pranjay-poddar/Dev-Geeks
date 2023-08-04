import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../hooks/useInjectSaga';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectCode } from '../selectors';

const VerifyEmail = (props) => {
  useInjectReducer({ key: 'userPersonalInformationPage', reducer });
  useInjectSaga({ key: 'userPersonalInformationPage', saga });

  const handleChange = (name) => (event) => {
    event.persist();
    props.setCodeValue({ key: name, value: event.target.value });
  };

  const handleVerify = () => {
    props.verifyEmailRequest(props.code);
  };

  const handleResend = () => {
    props.resendCodeRequest();
  };

  const { code } = props;
  return (
    <>
      <div className="flex">
        <label className="block uppercase tracking-wide text-gray-800 p-2 mr-2">
          Code
        </label>
        <input
          className="inputbox mr-2"
          id="code"
          type="text"
          value={code || ''}
          onChange={handleChange('code')}
        />
        <button
          className="py-2 px-6 rounded text-sm text-white bg-primary uppercase btn-theme"
          onClick={handleVerify}
        >
          Verify
        </button>
      </div>
      OR click the button to resend verification code.
      <button
        className="ml-2 py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
        onClick={handleResend}
      >
        Resend
      </button>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  code: makeSelectCode(),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);

import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import TextField from '../../../components/Basic/TextField';
import * as mapDispatchToProps from '../actions';
import { makeSelectPassword, makeSelectPasswordError } from '../selectors';

const PasswordInput = (props) => {
  const { password, setStoreValue, errors, classes } = props;
  const [isSecure, setIsSecure] = useState();

  const handleTogglePassword = () => {
    setIsSecure((state) => !state);
  };

  const handleChange = (e) =>
    setStoreValue({ key: 'password', value: e.target.value });
  const hasError = Boolean(errors);
  return (
    <div className="mt-4">
      <TextField
        label="Password"
        onChange={handleChange}
        value={password}
        id="Password"
        type={isSecure ? 'text' : 'password'}
        append={
          <span
            className="h-full cursor-pointer inline-flex justify-center items-center"
            onClick={handleTogglePassword}
          >
            {isSecure ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        }
        error={errors}
      />
      <Link
        className="inline-block align-baseline text-xs text-blue-700 hover:text-blue-700-darker"
        to="/forgot-password-user"
      >
        Forgot Password?
      </Link>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  password: makeSelectPassword(),
  errors: makeSelectPasswordError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordInput);

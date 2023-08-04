import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import TextField from '../../../components/Basic/TextField';
import * as mapDispatchToProps from '../actions';
import { makeSelectPassword, makeSelectPasswordError } from '../selectors';

const PasswordInput = (props) => {
  const { password, setStoreValue, error, classes } = props;
  const [isSecure, setIsSecure] = useState();

  const handleTogglePassword = () => {
    setIsSecure((state) => !state);
  };

  const handleChange = (e) =>
    setStoreValue({ key: 'password', value: e.target.value });
  const hasError = Boolean(error);
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
        error={error}
      />
    </div>
  );
};

PasswordInput.propTypes = {
  password: PropTypes.string.isRequired,
  setStoreValue: PropTypes.func.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  password: makeSelectPassword(),
  error: makeSelectPasswordError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(PasswordInput);

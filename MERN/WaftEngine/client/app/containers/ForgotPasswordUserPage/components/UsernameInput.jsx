import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as mapDispatchToProps from '../actions';
import { makeSelectEmail, makeSelectEmailError } from '../selectors';

const EmailInput = (props) => {
  const { email, setStoreValue, error } = props;
  const handleChange = (e) =>
    setStoreValue({ key: 'email', value: e.target.value });
  return (
    <>
      <input
        className="inputbox w-full"
        id="grid-last-name"
        type="text"
        value={email}
        placeholder="Enter Email"
        onChange={handleChange}
      />
      {error && <div className="error">{error}</div>}
    </>
  );
};

EmailInput.propTypes = {
  email: PropTypes.string.isRequired,
  setStoreValue: PropTypes.func.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  error: makeSelectEmailError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailInput);

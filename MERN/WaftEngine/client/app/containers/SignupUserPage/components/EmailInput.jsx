import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import TextField from '../../../components/Basic/TextField';
import * as mapDispatchToProps from '../actions';
import { makeSelectEmail, makeSelectEmailError } from '../selectors';

const EmailInput = (props) => {
  const { email, setStoreValue, error } = props;
  const handleChange = (e) =>
    setStoreValue({ key: 'email', value: e.target.value });
  const hasError = Boolean(error);
  return (
    <>
      <div className="mt-4">
        <TextField
          label="Email"
          onChange={handleChange}
          value={email}
          error={error}
        />
      </div>
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

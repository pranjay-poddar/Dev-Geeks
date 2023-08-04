import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import TextField from '../../../components/Basic/TextField';
import * as mapDispatchToProps from '../actions';
import { makeSelectName, makeSelectNameError } from '../selectors';

const NameInput = (props) => {
  const { name, setStoreValue, error } = props;
  const handleChange = (e) =>
    setStoreValue({ key: 'name', value: e.target.value });
  const hasError = Boolean(error);
  return (
    <div className="mt-4">
      <TextField
        label="Name"
        onChange={handleChange}
        value={name}
        error={error}
      />
    </div>
  );
};

NameInput.propTypes = {
  name: PropTypes.string.isRequired,
  setStoreValue: PropTypes.func.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  name: makeSelectName(),
  error: makeSelectNameError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(NameInput);

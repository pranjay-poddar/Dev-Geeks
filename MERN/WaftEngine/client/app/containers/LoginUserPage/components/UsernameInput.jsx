import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import TextField from '../../../components/Basic/TextField';
import * as mapDispatchToProps from '../actions';
import { makeSelectEmail, makeSelectEmailError } from '../selectors';

const EmailInput = (props) => {
  const { email, setStoreValue, errors } = props;
  const handleChange = (e) =>
    setStoreValue({ key: 'email', value: e.target.value });
  const hasError = Boolean(errors);
  return (
    <div className="mt-4">
      <TextField
        autofocus
        label="Email"
        onChange={handleChange}
        value={email}
        id="username"
        error={errors}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  errors: makeSelectEmailError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailInput);

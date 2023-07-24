import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as mapDispatchToProps from '../actions';
import { makeSelectErrors } from '../selectors';
import Button from '../../../components/Basic/Button';

export const ChangePassword = (props) => {
  const [state, setState] = useState({
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    props.clearError();
  }, []);

  useEffect(() => {
    setErrors(props.errors);
  }, [props.errors]);

  const handleChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const errors = {};
    const { oldPassword, newPassword, newPassword2 } = state;
    if (!oldPassword) errors.oldPassword = "Can't be empty";
    if (!newPassword) errors.newPassword = "Can't be empty";
    if (!newPassword2) errors.newPassword2 = "Can't be empty";
    return { errors, isValid: !Object.keys(errors).length };
  };

  const handleSave = (e) => {
    e.preventDefault();
    const { errors, isValid } = validate();
    setErrors(errors);
    if (isValid) {
      const { oldPassword, newPassword, newPassword2 } = state;
      props.changePasswordRequest({
        oldPassword,
        newPassword,
        newPassword2,
      });
    }
  };

  const { oldPassword, newPassword, newPassword2 } = state;
  const { classes } = props;

  return (
    <>
      <div className="md:w-1/2 pb-4">
        <label className="label" htmlFor="oldPassword">
          Old Password
        </label>
        <input
          className="inputbox"
          id="oldPassword"
          name="oldPassword"
          value={oldPassword}
          onChange={handleChange}
          type={showPassword ? 'text' : 'password'}
        />
        {errors.oldPassword && (
          <div className="error">{errors.oldPassword}</div>
        )}
      </div>

      <div className="md:w-1/2 pb-4">
        <label className="label" htmlFor="newPassword">
          New Password
        </label>
        <input
          className="inputbox"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={handleChange}
          type={showPassword ? 'text' : 'password'}
        />
        {errors.newPassword && (
          <div className="error">{errors.newPassword}</div>
        )}
      </div>

      <div className="md:w-1/2 pb-4">
        <label className="label" htmlFor="newPassword">
          Confirm New Password
        </label>
        <input
          className="inputbox"
          id="newPassword2"
          name="newPassword2"
          value={newPassword2}
          onChange={handleChange}
          type={showPassword ? 'text' : 'password'}
        />
        {errors.newPassword2 && (
          <div className="error">{errors.newPassword2}</div>
        )}
      </div>

      <Button onClick={handleSave}>Change Password</Button>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

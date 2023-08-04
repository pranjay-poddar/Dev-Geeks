import { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { createStructuredSelector } from 'reselect';
import { removeSnackbar } from '../actions';
import { makeSelectNotifications } from '../selectors';

const Notifier = (props) => {
  useEffect(() => {
    if (props.notifications.length > 0) {
      const { message, options } =
        props.notifications[props.notifications.length - 1];
      if (options?.variant) {
        toast[options.variant](message, options);
      } else if (options) {
        toast(message, options);
      } else {
        toast(message);
      }
      props.removeSnackbar();
    }
  }, [props.notifications]);
  return null;
};

const mapStateToProps = createStructuredSelector({
  notifications: makeSelectNotifications(),
});

export default connect(mapStateToProps, { removeSnackbar })(Notifier);

import { Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useInjectSaga from '../../hooks/useInjectSaga';
import RoutesAdmin from '../../layouts/admin';
import RoutesPublic from '../../layouts/public';
import RoutesUser from '../../layouts/user';
import Notifier from './components/Notifier';
import saga from './saga';
import Dialog from '../../components/Dialog';
import { createStructuredSelector } from 'reselect';
import { makeSelectShowExpired } from './selectors';
import { connect } from 'react-redux';
import * as mapDispatchToProps from './actions';

const App = (props) => {
  useInjectSaga({ key: 'global', saga });
  console.log(props);

  const handleClose = () => {
    props.setExpired(false);
  };
  return (
    <div className="flex flex-col min-h-screen text-xs lg:text-sm 2xl:text-base">
      <Routes>
        <Route path="admin/*" element={<RoutesAdmin />} />
        <Route path="user/*" element={<RoutesUser />} />
        <Route path="*" element={<RoutesPublic />} />
      </Routes>
      <Notifier />
      <Dialog
        title={'Session Expired'}
        open={props.showExpired}
        body={<div>You Have Been Logged out of this Session.</div>}
        actions={
          <Link
            to="/login"
            className="px-2 py-1 bg-primary rounded text-white"
            onClick={handleClose}
          >
            Re-Login
          </Link>
        }
        onClose={handleClose}
      />
      <ToastContainer hideProgressBar position="bottom-left" />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  showExpired: makeSelectShowExpired(),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

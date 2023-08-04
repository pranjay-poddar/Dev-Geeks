import PropTypes from 'prop-types';
import { FaCheck, FaEnvelopeOpenText, FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../hooks/useInjectSaga';
import { makeSelectUser } from '../../App/selectors';
import '../profile.css';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectToken } from '../selectors';

function App(props) {
  useInjectReducer({
    key: 'userPersonalInformationPage',
    reducer,
  });
  useInjectSaga({ key: 'userPersonalInformationPage', saga });

  const { user, token } = props;
  return (
    <>
      <div>
        {token || user.email_verified ? (
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="relative inline-block">
              <FaEnvelopeOpenText className="text-5xl text-gray-300" />
              <div className="flex absolute -right-2 -bottom-2 h-6 w-6 rounded-full bg-success">
                <FaCheck className="m-auto text-white" />
              </div>
            </div>
            <div className=" mt-2 font-bold">
              <p className="text-success">Your Email is Verified</p>
            </div>
          </div>
        ) : (
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="relative inline-block">
              <FaEnvelopeOpenText className="text-5xl text-gray-300" />
              <div className="flex absolute -right-2 -bottom-2 h-6 w-6 rounded-full bg-red-500">
                <FaTimes className="m-auto text-white" />
              </div>
            </div>
            <div className="mt-2 font-bold">
              <p>Your Email address is not verified</p>
            </div>
            <NavLink
              className="inline-block mt-2 bg-red-500 border border-red-600 text-white px-4 py-1 hover:bg-red-600 rounded"
              to="/user/profile/verify"
            >
              Verify Your Email
            </NavLink>
          </div>
        )}
        <h2 className="text-2xl mb-2 font-bold mt-4">Profile</h2>
        <div className="ProfileNav">
          <NavLink
            className="mb-2 bg-white rounded-lg py-3 px-4 block text-black"
            to="/user/profile/information"
          >
            Information
          </NavLink>
          <NavLink
            className="mb-2 bg-white rounded-lg py-3 px-4 block text-black"
            to="/user/profile/change-password"
          >
            Change Password
          </NavLink>
          <NavLink
            className="mb-2 bg-white rounded-lg py-3 px-4 block text-black"
            to="/user/profile/two-factor"
          >
            Two Factor Authentication
          </NavLink>
        </div>
      </div>
    </>
  );
}

App.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  token: makeSelectToken(),
});

export default connect(mapStateToProps)(App);

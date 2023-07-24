import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import DropdownMenu from '../../../components/DropdownMenu';
import StaticMenu from '../../../components/StaticMenu/index';
import { logoutRequest } from '../../../containers/App/actions';
import { IMAGE_BASE } from '../../../containers/App/constants';
import {
  makeSelectToken,
  makeSelectUser,
} from '../../../containers/App/selectors';

const logo = new URL('../../../assets/img/logo.svg', import.meta.url);

const Header = (props) => {
  let navigate = useNavigate();
  const { token, user, logoutRequest: logout } = props;
  const [checked, setChecked] = useState('');

  const handleToggle = () => {
    checked === '' ? setChecked('checked') : setChecked('');
  };
  const redirectToLogin = () => {
    navigate('/login');
  };

  const redirectToRegister = () => {
    navigate('/signup');
  };
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="border-b">
      <div className="container mx-auto flex justify-between flex-wrap relative">
        <div className="h-12 flex items-center p md:w-1/2 lg:w-1/6 order-2 md:order-none">
          <Link to="/">
            <img src={logo} alt="WaftEngine" />
          </Link>
        </div>
        <div className="flex-1 flex items-center">
          <StaticMenu menuKey="main-menu" />
        </div>
        {!token ? (
          <div className="w-full text-base flex flex-wrap justify-end header_right pb-2 border-b px-5 md:w-1/2 md:border-b-0 md:pb-0 lg:w-1/3">
            <button
              onClick={redirectToRegister}
              className="items-center hover:text-primary"
            >
              Register <span className="ml-2 mr-2"> | </span>
            </button>
            <button
              onClick={redirectToLogin}
              className="items-center hover:text-primary"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="w-full text-base flex flex-wrap justify-end header_right pb-2 border-b px-5 md:w-1/2 md:border-b-0 md:pb-0 lg:w-1/3">
            <DropdownMenu
              main={
                <button>
                  <div className="text-base flex items-center">
                    <span className="ml-2 mr-2">{user.name} | </span>
                    {user.image && user.image.path ? (
                      <img
                        src={`${IMAGE_BASE}${user.image.path}`}
                        className="w-8 h-8 rounded-full overflow-hidden"
                      />
                    ) : (
                      <FaUserAlt className="text-base" />
                    )}
                  </div>
                </button>
              }
              items={
                <>
                  {user.isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      style={{ textDecoration: 'none', color: 'black' }}
                      className="py-2 block px-4 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                    >
                      <p>Dashboard</p>
                    </Link>
                  )}
                  <Link
                    to="/user/profile"
                    style={{ textDecoration: 'none', color: 'black' }}
                    className="py-2 block px-4 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                  >
                    <p>Profile</p>
                  </Link>
                  <p
                    className="py-2 block px-4 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Log Out
                  </p>
                </>
              }
            />
          </div>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  logoutRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
  user: makeSelectUser(),
});

export default connect(mapStateToProps, { logoutRequest })(Header);

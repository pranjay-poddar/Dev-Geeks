import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FaAngleDown, FaExternalLinkAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Logo from '../../assets/img/logo-white.svg';
import DropdownMenu from '../../components/DropdownMenu';
import { logoutRequest } from '../../containers/App/actions';
import { APP_NAME, IMAGE_BASE } from '../../containers/App/constants';
import {
  makeSelectRoles,
  makeSelectUser,
} from '../../containers/App/selectors';
import NotFoundPage from '../../containers/NotFoundPage';
import routes from '../../routes/admin';
import MainListItems from './components/MainListItem';

const switchRoutes = (roles) => {
  const route = window.localStorage.getItem('routes');
  const arr = route ? JSON.parse(route) : [];
  const availableRoutes = arr;

  const hasAccess = (path) => {
    const available = [];
    availableRoutes.map(
      (each) =>
        each.admin_routes &&
        each.admin_routes.length &&
        each.admin_routes.map((e) => available.push(e)),
    );
    return available.includes(`/admin/${path}`);
  };

  return (
    <Routes>
      {routes
        .filter((each) => hasAccess(each.path))
        .map((prop) => (
          <Route key={prop.path} {...prop} />
        ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const AdminLayout = ({ classes, logoutRequest: logout, roles, users }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <div className="flex overflow-y-hidden bg-gray-100">
        <div className="scrollbar inverted w-64 h-screen bg-gray-900 overflow-auto">
          <div className="flex items-center px-4 py-3 fixed top-0 z-40 w-64 bg-gray-800">
            <Link target="_blank" to="/">
              <img className="h-8" src={Logo} alt={APP_NAME} />
            </Link>
            <p className="text-xs text-white opacity-25 leading-none ml-2">
              v2.0.0
            </p>
          </div>

          <MainListItems />
        </div>
        <main className="flex-1 flex flex-col justify-between bg-gray-100 h-screen overflow-auto relative">
          <div className="bg-white border-b flex top-0 justify-between absolute w-full z-40">
            <div className="flex-1 flex items-center h-14">
              <Link
                target="_blank"
                className="rounded px-2 py-2 ml-6 leading-none flex items-center text-sm bg-dark text-white hover:bg-primary"
                to="/"
              >
                Visit Site
                <FaExternalLinkAlt className="ml-2 text-xs" />
              </Link>
              <a
                className="pl-8 text-sm"
                target="_blank"
                href="https://waftengine.org/documentation/2019-6-16-introduction-to-waftengine"
              >
                Docs
              </a>
              <a
                className="pl-8 text-sm"
                target="_blank"
                href="https://waftengine.org/blog"
              >
                Blog
              </a>
              <a
                className="pl-8 text-sm"
                target="_blank"
                href="https://gitter.im/waftengine/community"
              >
                Support
              </a>
              <div className="flex-1 text-center -mt-6">
                <a
                  className="py-1 px-4 text-sm inline-block bg-yellow-100 border border-yellow-200 rounded-b-lg"
                  href="https://github.com/WaftTech/WaftEngine"
                  target={'_blank'}
                >
                  Give ⭐ on Github
                </a>
              </div>
            </div>

            <DropdownMenu
              main={
                <button className="flex items-center justify-end h-14 px-6 hover:bg-gray-100">
                  <img
                    className="w-8 h-8 rounded-full overflow-hidden"
                    src={
                      users.image && users.image.path
                        ? `${IMAGE_BASE}${users.image.path}`
                        : null
                    }
                    alt="profile image"
                  />
                  <div className="px-3 text-left">
                    <span className="block capitalize text-sm">
                      {users.name}
                    </span>
                    <span className="block leading-none truncate capitalize text-xs text-gray-400">
                      {users.roles &&
                      users.roles[0] &&
                      users.roles[0].role_title
                        ? users.roles[0].role_title
                        : ''}
                    </span>
                  </div>
                  <FaAngleDown className="opacity-50" />
                </button>
              }
              items={
                <>
                  <Link
                    to="/admin/dashboard"
                    style={{ textDecoration: 'none', color: 'black' }}
                    className="py-2 block px-4 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                  >
                    <p>Dashboard</p>
                  </Link>
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
          <div className="flex-1 mx-6 my-2 relative">{switchRoutes(roles)}</div>
        </main>
      </div>
    </>
  );
};

AdminLayout.propTypes = {
  logoutRequest: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  roles: makeSelectRoles(),
  users: makeSelectUser(),
});
const mapDispatchToProps = {
  logoutRequest: logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);

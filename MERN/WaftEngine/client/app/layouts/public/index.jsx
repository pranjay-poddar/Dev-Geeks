import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { makeSelectLocation } from '../../containers/App/selectors';
import NotFoundPage from '../../containers/NotFoundPage';
import routes from '../../routes/public';
import Footer from './components/Footer';
import Header from './components/Header';

const switchRoutes = (
  <Routes>
    {routes.map((prop) => (
      <Route key={prop.path} {...prop} />
    ))}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

const checkPathname = (pathname) => {
  switch (pathname) {
    case '/editor-file-select':
      return false;
    default:
      break;
  }
  return true;
};
const PublicLayout = ({ location, open, setOpen }) => {
  const { pathname } = location;
  const showHeaderAndFooter = checkPathname(pathname);

  return (
    <>
      {showHeaderAndFooter && <Header />}
      <div className="flex-1">{switchRoutes}</div>
      {showHeaderAndFooter && <Footer />}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PublicLayout);

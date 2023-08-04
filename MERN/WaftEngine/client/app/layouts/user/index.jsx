import { Route, Routes } from 'react-router-dom';
import NotFoundPage from '../../containers/NotFoundPage';
import routes from '../../routes/user';
import Footer from '../public/components/Footer';
import Header from '../public/components/Header';

const switchRoutes = (
  <Routes>
    {routes.map((prop) => (
      <Route key={prop.path} {...prop} />
    ))}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

const UserLayout = () => (
  <>
    <Header />
    <div className="flex-1">
      <div>{switchRoutes}</div>
    </div>
    <Footer />
  </>
);

export default UserLayout;

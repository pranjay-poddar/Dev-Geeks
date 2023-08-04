import { Route, Routes } from 'react-router-dom';
import { useInjectReducer } from '../../hooks/useInjectReducer';
import { useInjectSaga } from '../../hooks/useInjectSaga';
import Layout from './Components/Layout';
import {
  ChangePasswords,
  Information,
  TwoFactor,
  VerifyEmail,
} from './Pages/Loadable';
import reducer from './reducer';
import saga from './saga';

const key = 'userPersonalInformationPage';

const Profile = (props) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <>
      <Layout>
        <Routes>
          <Route exact path={'verify'} element={<VerifyEmail />} />
          <Route exact path={'change-password'} element={<ChangePasswords />} />
          <Route exact path={'two-factor'} element={<TwoFactor />} />
          <Route path={'information'} element={<Information />} />
          <Route path={'*'} element={<Information />} />
        </Routes>
      </Layout>
    </>
  );
};

export default Profile;

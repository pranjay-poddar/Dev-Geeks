/**
 *
 * Asynchronously loads the component for BlogPage
 *
 */

import Loading from '../../../components/Loading';
import loadable from '../../../utils/loadable';

export const Information = loadable(() => import('./Information'), {
  fallback: <Loading />,
});
export const ChangePasswords = loadable(() => import('./ChangePassword'), {
  fallback: <Loading />,
});
export const VerifyEmail = loadable(() => import('./VerifyEmail'), {
  fallback: <Loading />,
});
export const TwoFactor = loadable(() => import('./2FactorAuthentication'), {
  fallback: <Loading />,
});

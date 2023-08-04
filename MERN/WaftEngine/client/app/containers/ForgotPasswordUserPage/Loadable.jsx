/**
 *
 * Asynchronously loads the component for ForgotPasswordUser
 *
 */

import Loading from '../../components/Loading';
import loadable from '../../utils/loadable';

export default loadable(() => import('./index'), { fallback: <Loading /> });

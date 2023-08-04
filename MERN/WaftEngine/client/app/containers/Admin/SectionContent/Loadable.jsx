/**
 *
 * Asynchronously loads the component for AdminRole
 *
 */

import Loading from '../../../components/Loading';
import loadable from '../../../utils/loadable';

export default loadable(() => import('./index'), { fallback: <Loading /> });

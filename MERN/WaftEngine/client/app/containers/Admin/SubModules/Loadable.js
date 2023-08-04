/**
 *
 * Asynchronously loads the component for SubModules
 *
 */

import loadable from '../../../utils/loadable';
import Loading from '../../../components/Loading';

export default loadable(() => import('./index'), { fallback: <Loading /> });

import loadable from '../../../../utils/loadable';
import Loading from '../../../../components/Loading';

export default loadable(() => import('./index'), { fallback: <Loading /> });

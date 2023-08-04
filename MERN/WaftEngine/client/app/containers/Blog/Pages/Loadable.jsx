/**
 *
 * Asynchronously loads the component for BlogPage
 *
 */

import Loading from '../../../components/Loading';
import loadable from '../../../utils/loadable';

export const BlogList = loadable(() => import('./BlogList'), {
  fallback: <Loading />,
});
export const BlogsByAuthor = loadable(() => import('./BlogsByAuthor'), {
  fallback: <Loading />,
});
export const BlogsByTag = loadable(() => import('./BlogsByTag'), {
  fallback: <Loading />,
});
export const BlogDetail = loadable(() => import('./BlogDetail'), {
  fallback: <Loading />,
});
export const CategoryDetail = loadable(() => import('./CategoryDetail'), {
  fallback: <Loading />,
});
export const BlogDate = loadable(() => import('./BlogDate'), {
  fallback: <Loading />,
});

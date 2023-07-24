/**
 *
 * Asynchronously loads the component for StaticMenu
 *
 */

import Loading from 'components/Loading';
import React from 'react';
import loadable from 'utils/loadable';

export default loadable(() => import('./index'), { fallback: <Loading /> });

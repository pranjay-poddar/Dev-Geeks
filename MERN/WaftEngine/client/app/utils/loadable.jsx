import { lazy, Suspense } from 'react';

export const loadable = (
  importFunc,
  { fallback = null } = { fallback: null },
) => {
  const LazyComponent = lazy(importFunc);

  return (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;

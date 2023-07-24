import { useContext, useEffect } from 'react';
import { ReactReduxContext } from 'react-redux';
import getInjectors from '../utils/sagaInjectors';

export const useInjectSaga = ({ key, saga, mode }) => {
  const context = useContext(ReactReduxContext);
  useEffect(() => {
    const injectors = getInjectors(context.store);
    injectors.injectSaga(key, { saga, mode });

    return () => {
      injectors.ejectSaga(key);
    };
  }, []);
};

export default useInjectSaga;

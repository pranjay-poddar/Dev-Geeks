/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import globalReducer from './containers/App/reducer';

const history = createBrowserHistory();
const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history,
    //other options if needed
  });

export { createReduxHistory, routerMiddleware };

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    router: routerReducer,
    ...injectedReducers,
  });

  return rootReducer;
}

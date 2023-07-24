/*
 *
 * AdminRole reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
    msg: '',
  },
  one: {
    module_name: '',
    description: '',
    path: [],
    module_group: '',
  },
  access: {
    Access: [],
    Module: {
      path: [],
    },
    Roles: [],
  },
  query: { find_module_name: '' },
  loading: false,
  errors: { module_name: '', description: '' },
  sub_module: [],
};

/* eslint-disable default-case, no-param-reassign */
const adminRoleReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        draft.errors[action.payload.key] = ' ';
        break;
      case types.SET_ACCESS_VALUE:
        draft.access[action.payload.key] = action.payload.value;
        break;
      case types.ADD_EDIT_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.CLEAR_ERRORS:
        draft.errors = initialState.errors;
        break;
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        break;
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.loading = false;
        draft.all = {
          ...draft.all,
          ...action.payload,
          totaldata: action.payload.totalData,
        };
        break;
      case types.LOAD_ALL_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.loading = false;
        draft.one = { ...initialState.one, ...action.payload.data };
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_ACCESS_SUCCESS:
        draft.loading = false;
        draft.access = action.payload.data;
        break;
      case types.LOAD_ACCESS_REQUEST:
        draft.loading = true;
        break;
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;

      case types.LOAD_SUB_MODULE_SUCCESS:
        draft.sub_module = action.payload.data;
        break;

      case types.SET_ACCESS_TYPE_CHANGE:
        draft.one.path[action.payload.pathIndex].access_type =
          action.payload.data;
        break;

      case types.SET_ADMIN_ROUTES:
        draft.one.path[action.payload.pathIndex].admin_routes[
          action.payload.index
        ] = action.payload.data;
        break;

      case types.REMOVE_ADMIN_ROUTES:
        let tempPath = [...draft.one.path];
        tempPath[action.payload.pathIndex].admin_routes = [
          ...tempPath[action.payload.pathIndex].admin_routes.slice(
            0,
            action.payload.index,
          ),
          ...tempPath[action.payload.pathIndex].admin_routes.slice(
            action.payload.index + 1,
          ),
        ];
        draft.one.path = tempPath;
        break;

      case types.ADD_ADMIN_ROUTES:
        let tempPath2 = [...draft.one.path];
        tempPath2[action.payload.pathIndex].admin_routes = [
          ...tempPath2[action.payload.pathIndex].admin_routes,
          '',
        ];
        draft.one.path = tempPath2;
        break;

      case types.SET_SERVER_ROUTE_METHOD:
        draft.one.path[action.payload.pathIndex].server_routes[
          action.payload.index
        ].method = action.payload.data;
        break;

      case types.SET_SERVER_ROUTE_CHANGE:
        draft.one.path[action.payload.pathIndex].server_routes[
          action.payload.index
        ].route = action.payload.data;
        break;

      case types.ADD_SERVER_ROUTES:
        draft.one.path[action.payload.index] = {
          ...draft.one.path[action.payload.index],
          server_routes: [
            ...draft.one.path[action.payload.index].server_routes,
            { route: '', method: 'GET' },
          ],
        };
        break;

      case types.REMOVE_SERVER_ROUTES:
        let tempPath3 = [...draft.one.path];
        tempPath3[action.payload.pathIndex].server_routes = [
          ...tempPath3[action.payload.pathIndex].server_routes.slice(
            0,
            action.payload.index,
          ),
          ...tempPath3[action.payload.pathIndex].server_routes.slice(
            action.payload.index + 1,
          ),
        ];
        draft.one.path = tempPath3;
        break;

      case types.SET_ACCESS_UPDATE:
        const pathIndex = action.payload.module_id.indexOf(
          action.payload.singlePath,
        );

        if (pathIndex > -1) {
          action.payload.module_id.splice(pathIndex, 1);
        } else {
          action.payload.module_id.push(action.payload.singlePath);
        }

        let tempAccess = [...draft.access.Access];
        const index = tempAccess.findIndex(
          each =>
            each.module_id === action.payload.ModuleId &&
            each.role_id === action.payload.roleId,
        );
        if (index > -1) {
          tempAccess[index].access_type = [...action.payload.module_id];
        } else {
          tempAccess = [
            ...tempAccess,

            {
              access_type: [...action.payload.module_id],
              module_id: action.payload.ModuleId,
              role_id: action.payload.roleId,
            },
          ];
        }
		 draft.access.Access = tempAccess //tuanv2t fixbug
        break;
    }
  });

export default adminRoleReducer;

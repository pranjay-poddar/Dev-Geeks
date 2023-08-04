/*
 *
 * EditorFileSelect reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    files: {
      data: [],
      totaldata: 0,
    },
    folders: {
      data: [],
      totaldata: 0,
    },
    self: {
      name: 'Root',
      path: [],
    },
  },
  folderOne: {
    name: '',
    is_root: false,
  },
  folderAddRequest: false,
  folderRename: false,
  loading: false,
  chosen: [],
  chosen_files: [],
  chosen_folders: [],
  rename_file: {
    renamed_name: '',
    _id: '',
  },
  showRename: false,
  fileRenameLoading: false,
  query: { search: '' },
  errors: {},
};

/* eslint-disable default-case, no-param-reassign */
const editorFileSelectReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_FILES_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_FILES_SUCCESS:
        draft.loading = false;
        draft.all = action.payload.data;
        break;
      case types.LOAD_FILES_FAILURE:
        draft.loading = false;
        break;
      case types.SET_NAME_VALUE:
        draft.folderOne[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_VALUE:
        draft.folderOne.name = initialState.folderOne.name;
        break;

      case types.LOAD_NEW_FOLDER_REQUEST:
        draft.folderAddRequest = true;
        break;
      case types.LOAD_NEW_FOLDER_SUCCESS:
        draft.folderAddRequest = false;
        draft.all.folders.data = [
          ...state.all.folders.data,
          { name: action.payload.data.name, _id: action.payload.data._id },
        ];
        draft.all.folders.totaldata = state.all.folders.totaldata + 1;
        break;
      case types.RENAME_FOLDER_REQUEST:
        draft.folderRename = true;
        break;
      case types.RENAME_FOLDER_SUCCESS:
        draft.folderRename = false;
        draft.all.folders.data = state.all.folders.data.map(each => {
          if (each._id === action.payload.data._id) {
            return action.payload.data;
          } else {
            return each;
          }
        });
        break;
      case types.RENAME_FOLDER_FAILURE:
        draft.folderRename = false;
        draft.errors = action.payload.errors;
        break;
      case types.LOAD_NEW_FOLDER_FAILURE:
        draft.folderAddRequest = false;
        break;
      case types.ADD_MEDIA_SUCCESS:
        draft.all.files.data = [
          ...state.all.files.data,
          ...action.payload.data.map(function images(each) {
            return {
              ...each,
            };
          }),
        ];
        draft.all.files.totaldata = state.all.files.totaldata + 1;
        break;
      case types.DELETE_FOLDER_SUCCESS:
        draft.all.folders = {
          ...state.all.folders,
          data: state.all.folders.data.filter(
            each => each._id != action.payload.data._id,
          ),
        };
        draft.all.folders.totaldata = state.all.folders.totaldata - 1;
        break;
      case types.DELETE_FILE_SUCCESS:
        draft.all.files = {
          ...state.all.files,
          data: state.all.files.data.filter(
            each => each._id != action.payload.data._id,
          ),
        };
        draft.all.files.totaldata = state.all.files.totaldata - 1;
        break;

      case types.ADD_CHOSEN_FILE:
        const index = draft.chosen.indexOf(action.payload._id);
        if (index >= 0) {
          const tempChosen = [...draft.chosen];
          const tempChosenFiles = [...draft.chosen_files];
          tempChosen.splice(index, 1);
          tempChosenFiles.splice(index, 1);
          draft.chosen = tempChosen;
          draft.chosen_files = tempChosenFiles;
        } else {
          draft.chosen = [...draft.chosen, action.payload._id];
          draft.chosen_files = [...draft.chosen_files, action.payload];
        }
        break;

      case types.CLEAR_CHOSEN:
        draft.chosen = initialState.chosen;
        draft.chosen_files = initialState.chosen_files;
        draft.chosen_folders = initialState.chosen_folders;

        break;

      case types.ADD_CHOSEN_FOLDER:
        const folderindex = draft.chosen_folders.indexOf(action.payload._id);
        if (folderindex >= 0) {
          const tempChosenFolders = [...draft.chosen_folders];
          tempChosenFolders.splice(folderindex, 1);
          draft.chosen_folders = tempChosenFolders;
        } else {
          draft.chosen_folders = [...draft.chosen_folders, action.payload._id];
        }
        break;

      case types.DELETE_MULTIPLE_REQUEST:
        draft.loading = true;

        break;

      case types.DELETE_MULTIPLE_SUCCESS:
        draft.chosen = initialState.chosen;
        draft.chosen_files = initialState.chosen_files;
        draft.chosen_folders = initialState.chosen_folders;
        draft.loading = false;
        break;

      case types.DELETE_MULTIPLE_FAILURE:
        draft.loading = false;

        break;

      case types.SET_RENAME_FILE_VALUE:
        draft.rename_file[action.payload.key] = action.payload.value;
        break;

      case types.RENAME_FILE_REQUEST:
        draft.fileRenameLoading = true;
        break;
      case types.RENAME_FILE_SUCCESS:
        draft.fileRenameLoading = false;
        draft.showRename = false;

        draft.all.files.data.map((each, index) => {
          if (each._id === draft.rename_file._id) {
            draft.all.files.data[index].renamed_name =
              draft.rename_file.renamed_name;
          }
        });

        break;
      case types.RENAME_FILE_FAILURE:
        draft.fileRenameLoading = false;
        break;

      case types.SET_SHOW_RENAME:
        draft.showRename = action.payload;
        break;

      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
    }
  });

export default editorFileSelectReducer;

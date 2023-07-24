/*
 *
 * EditorFileSelect actions
 *
 */

import * as types from './constants';

export const loadFilesRequest = payload => ({
  type: types.LOAD_FILES_REQUEST,
  payload,
});
export const loadFilesSuccess = payload => ({
  type: types.LOAD_FILES_SUCCESS,
  payload,
});
export const loadFilesFailure = payload => ({
  type: types.LOAD_FILES_FAILURE,
  payload,
});

export const loadFoldersRequest = payload => ({
  type: types.LOAD_FOLDERS_REQUEST,
  payload,
});
export const loadFoldersSuccess = payload => ({
  type: types.LOAD_FOLDERS_SUCCESS,
  payload,
});
export const loadFoldersFailure = payload => ({
  type: types.LOAD_FOLDERS_FAILURE,
  payload,
});

export const addMediaRequest = (payload, metadata) => ({
  type: types.ADD_MEDIA_REQUEST,
  payload,
  metadata,
});
export const addMediaSuccess = payload => ({
  type: types.ADD_MEDIA_SUCCESS,
  payload,
});
export const addMediaFailure = payload => ({
  type: types.ADD_MEDIA_FAILURE,
  payload,
});

export const loadNewFolderRequest = (payload, metadata) => ({
  type: types.LOAD_NEW_FOLDER_REQUEST,
  payload,
  metadata,
});
export const loadNewFolderSuccess = payload => ({
  type: types.LOAD_NEW_FOLDER_SUCCESS,
  payload,
});
export const loadNewFolderFailure = payload => ({
  type: types.LOAD_NEW_FOLDER_FAILURE,
  payload,
});

export const renameFolderRequest = payload => ({
  type: types.RENAME_FOLDER_REQUEST,
  payload,
});
export const renameFolderSuccess = payload => ({
  type: types.RENAME_FOLDER_SUCCESS,
  payload,
});
export const renameFolderFailure = payload => ({
  type: types.RENAME_FOLDER_FAILURE,
  payload,
});

export const setFolderName = payload => ({
  type: types.SET_NAME_VALUE,
  payload,
});

export const clearValue = payload => ({
  type: types.CLEAR_VALUE,
  payload,
});

export const folderDeleteRequest = payload => ({
  type: types.DELETE_FOLDER_REQUEST,
  payload,
});
export const folderDeleteSuccess = payload => ({
  type: types.DELETE_FOLDER_SUCCESS,
  payload,
});
export const folderDeleteFailure = payload => ({
  type: types.DELETE_FOLDER_FAILURE,
  payload,
});
export const fileDeleteRequest = payload => ({
  type: types.DELETE_FILE_REQUEST,
  payload,
});
export const fileDeleteSuccess = payload => ({
  type: types.DELETE_FILE_SUCCESS,
  payload,
});
export const fileDeleteFailure = payload => ({
  type: types.DELETE_FILE_FAILURE,
  payload,
});

export const addChosenFile = payload => ({
  type: types.ADD_CHOSEN_FILE,
  payload,
});
export const clearChosen = payload => ({
  type: types.CLEAR_CHOSEN,
  payload,
});
export const addChosenFolder = payload => ({
  type: types.ADD_CHOSEN_FOLDER,
  payload,
});

export const deleteMultipleRequest = payload => ({
  type: types.DELETE_MULTIPLE_REQUEST,
  payload,
});
export const deleteMultipleSuccess = payload => ({
  type: types.DELETE_MULTIPLE_SUCCESS,
  payload,
});
export const deleteMultipleFailure = payload => ({
  type: types.DELETE_MULTIPLE_FAILURE,
  payload,
});

export const setRenameFileValue = payload => ({
  type: types.SET_RENAME_FILE_VALUE,
  payload,
});

export const renameFileRequest = payload => ({
  type: types.RENAME_FILE_REQUEST,
  payload,
});
export const renameFileSuccess = payload => ({
  type: types.RENAME_FILE_SUCCESS,
  payload,
});
export const renameFileFailure = payload => ({
  type: types.RENAME_FILE_FAILURE,
  payload,
});

export const setShowRename = payload => ({
  type: types.SET_SHOW_RENAME,
  payload,
});

export const setQueryValue = payload => ({
  type: types.SET_QUERY_VALUE,
  payload,
});

import { takeLatest, call, select, put } from 'redux-saga/effects';
import Api from '../../utils/Api';
import { makeSelectToken } from '../App/selectors';
import {
  makeSelectOne,
  makeSelectChosen,
  makeSelectChosenFolders,
  makeSelectAll,
  makeSelectRenameFile,
  makeSelectQuery,
} from './selectors';
import * as types from './constants';
import * as actions from './actions';
import { enqueueSnackbar } from '../App/actions';

function* loadFolders() {
  const token = yield select(makeSelectToken());
}

function* loadFiles(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  const searchParams = yield select(makeSelectQuery());
  if (searchParams) {
    Object.keys(searchParams).map((each) => {
      query = `${query}&${each}=${searchParams[each]}`;
      return null;
    });
  }
  yield call(
    Api.get(
      `files/folder/${action.payload.path}?${query}`,
      actions.loadFilesSuccess,
      actions.loadFilesFailure,
      token,
    ),
  );
}

function* addMedia(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.multipartPost(
      `files/file/${action.payload.folder_id}`,
      actions.addMediaSuccess,
      actions.addMediaFailure,
      {},
      { file: action.payload.file },
      token,
    ),
  );
}

function* deleteFolder(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `files/folder/${action.payload}`,
      actions.folderDeleteSuccess,
      actions.folderDeleteFailure,
      token,
    ),
  );
}

function* deleteFile(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `files/file/${action.payload}`,
      actions.fileDeleteSuccess,
      actions.fileDeleteFailure,
      token,
    ),
  );
}

function* createNewFolder(action) {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  const datas = { ...data };
  let successCall = actions.loadNewFolderSuccess;
  if (action.payload.value && action.payload.name) {
    datas._id = action.payload.value;
    datas.name = action.payload.name;
    successCall = actions.renameFolderSuccess;
  }
  yield call(
    Api.post(
      `files/folder/${action.payload.key}`,
      successCall,
      actions.loadNewFolderFailure,
      datas,
      token,
    ),
  );
}

function* createFolderFailFunc(action) {
  const message =
    action.payload.errors && action.payload.errors.name
      ? action.payload.errors.name
      : 'something went wrong';
  const defaultError = {
    message: message,
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultError));
  yield;
}

function* multipleDelete(action) {
  const token = yield select(makeSelectToken());
  const files = yield select(makeSelectChosen());
  const folders = yield select(makeSelectChosenFolders());

  const data = {
    folder_id: [...folders],
    file_id: [...files],
  };

  yield call(
    Api.post(
      `media/deleteall`,
      actions.deleteMultipleSuccess,
      actions.deleteMultipleFailure,
      data,
      token,
    ),
  );
}

function* multiDeleteSuccessFunc(action) {
  const path = yield select(makeSelectAll());
  if (path.self) {
    yield put(actions.loadFilesRequest(path.self._id));
  }
  const snackbarData = {
    message: action.payload.msg || 'Delete success',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* multiDeleteFailureFunc(action) {
  const snackbarData = {
    message: 'Something went wrong while deleting!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* renameFile(action) {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectRenameFile());

  yield call(
    Api.post(
      `files/rename/file`,
      actions.renameFileSuccess,
      actions.renameFileFailure,
      data,
      token,
    ),
  );
}

// Individual exports for testing
export default function* editorFileSelectSaga() {
  yield takeLatest(types.LOAD_FILES_REQUEST, loadFiles);
  yield takeLatest(types.LOAD_FOLDERS_REQUEST, loadFolders);
  yield takeLatest(types.DELETE_FOLDER_REQUEST, deleteFolder);
  yield takeLatest(types.DELETE_FILE_REQUEST, deleteFile);
  yield takeLatest(types.ADD_MEDIA_REQUEST, addMedia);
  yield takeLatest(types.LOAD_NEW_FOLDER_REQUEST, createNewFolder);
  yield takeLatest(types.LOAD_NEW_FOLDER_FAILURE, createFolderFailFunc);

  yield takeLatest(types.DELETE_MULTIPLE_REQUEST, multipleDelete);
  yield takeLatest(types.DELETE_MULTIPLE_SUCCESS, multiDeleteSuccessFunc);
  yield takeLatest(types.DELETE_MULTIPLE_FAILURE, multiDeleteFailureFunc);
  yield takeLatest(types.RENAME_FILE_REQUEST, renameFile);
}

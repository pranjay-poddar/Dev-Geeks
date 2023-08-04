import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the editorFileSelect state domain
 */

export const selectDomain = state => state.editorFileSelect || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(selectDomain, state => state.all);

export const makeSelectOne = () =>
  createSelector(selectDomain, state => state.folderOne);
export const makeSelectfolderAddRequest = () =>
  createSelector(selectDomain, state => state.folderAddRequest);
export const makeSelectLoading = () =>
  createSelector(selectDomain, state => state.loading);

export const makeSelectChosen = () =>
  createSelector(selectDomain, state => state.chosen);

export const makeSelectChosenFiles = () =>
  createSelector(selectDomain, state => state.chosen_files);

export const makeSelectChosenFolders = () =>
  createSelector(selectDomain, state => state.chosen_folders);

export const makeSelectfolderRenameRequest = () =>
  createSelector(selectDomain, state => state.folderRename);

export const makeSelectRenameFile = () =>
  createSelector(selectDomain, state => state.rename_file);

export const makeSelectShowRename = () =>
  createSelector(selectDomain, state => state.showRename);

export const makeSelectFileRenameLoading = () =>
  createSelector(selectDomain, state => state.fileRenameLoading);

export const makeSelectQuery = () =>
  createSelector(selectDomain, state => state.query);

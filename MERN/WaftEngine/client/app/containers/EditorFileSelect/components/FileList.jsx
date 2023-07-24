import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import {
  FaCheck,
  FaFolder,
  FaFolderOpen,
  FaImage,
  FaPen,
  FaPenSquare,
  FaPlusCircle,
  FaSearch,
  FaTrash,
} from 'react-icons/fa';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'redux-first-history';
import { createStructuredSelector } from 'reselect';
import Button from '../../../components/Basic/Button';
import TextField from '../../../components/Basic/TextField';
import BreadCrumb from '../../../components/Breadcrumb/Loadable';
import DeleteDialog from '../../../components/DeleteDialog';
import Dialog from '../../../components/Dialog/index';
import { IMAGE_BASE } from '../../App/constants';
import * as mapDispatchToProps from '../actions';
import {
  makeSelectAll,
  makeSelectChosen,
  makeSelectChosenFiles,
  makeSelectChosenFolders,
  makeSelectFileRenameLoading,
  makeSelectfolderAddRequest,
  makeSelectfolderRenameRequest,
  makeSelectLoading,
  makeSelectOne,
  makeSelectQuery,
  makeSelectRenameFile,
  makeSelectShowRename,
} from '../selectors';

const LinkComponent = ({ children, staticContext, ...props }) => (
  <div {...props}>{children}</div>
);
LinkComponent.propTypes = {
  children: PropTypes.node,
  staticContext: PropTypes.object,
};

const FileList = ({
  addMediaRequest,
  all: { files, folders, self },
  one,
  queryObj,
  loadFilesRequest,
  loadNewFolderRequest,
  renameFolderRequest,
  folderDeleteRequest,
  fileDeleteRequest,
  setFolderName,
  folderAdded,
  folderRename,
  clearValue,
  loading,
  addChosenFile,
  chosen,
  chosen_files,
  clearChosen,
  addChosenFolder,
  chosen_folders,
  deleteMultipleRequest,
  setRenameFileValue,
  setShowRename,
  rename_file,
  fileRenameLoading,
  showRename,
  renameFileRequest,
  setQueryValue,
  query,
  classes,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [over, setOver] = useState('');
  const [overFile, setOverFile] = useState('');
  const [show, setShow] = useState(false);
  const [rename_id, setRenameId] = useState('');
  const [rename, setRename] = useState('');
  const [deleteId, setdeleteId] = useState('');
  const [deleteFile, setdeleteFile] = useState('');
  const [deleteOpen, setdeleteOpen] = useState(false);
  const [fileOpen, setfileOpen] = useState(false);

  const [folderCheckbox, setfolderCheckbox] = useState(false);
  const [fileCheckbox, setfileCheckbox] = useState(false);
  const [selectedButton, setSelectedButton] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!folderAdded) {
      setOpen(false);
      clearValue();
    }
    clearChosen();
  }, [folderAdded]);

  useEffect(() => {
    if (!folderRename) {
      setShow(false);
    }
    clearChosen();
  }, [folderRename]);

  useEffect(() => {
    setSelectedButton('');
  }, [files]);

  const onSelect = (image) => {
    if (props.selectFile) {
      props.selectFile(image);
    } else {
      window.opener.CKEDITOR.tools.callFunction(
        queryObj.CKEditorFuncNum,
        `${IMAGE_BASE}${image.path}`,
      );
    }
    if (window.location.pathname.includes('editor-file-select')) {
      window.close();
    }
  };

  const handleAdd = () => {
    setOpen(true);
  };

  const handleDelClose = () => {
    setdeleteOpen(false);
  };

  const handleFileClose = () => {
    setfileOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    loadNewFolderRequest({ key: self._id });
  };

  const handleInput = (e) => {
    setFolderName({ key: 'name', value: e.target.value });
  };

  const handleFileUpload = (files, id) => {
    addMediaRequest({ file: files, folder_id: id });
  };

  const handleFolderLink = (id) => {
    setSelected('');
    const searchq = queryString.stringify({ ...queryObj, path: id });
    props.push({
      search: searchq,
    });
  };

  const handleSingleClick = (id) => {
    if (selected === id) {
      setSelected('');
    } else {
      setSelected(id);
    }
  };

  const handleOutClick = () => {
    if (selected != '') {
      setSelected('');
    }
  };

  const handleMouseOver = (id) => {
    setOver(id);
  };

  const handleMouseOverFile = (id) => {
    setOverFile(id);
  };

  const handleRename = (id, name) => {
    setRenameId(id);
    setRename(name);
    setShow(true);
    renameFolderRequest();
  };

  const handleRenameFile = (id, name) => {
    setRenameFileValue({ key: '_id', value: id });
    setRenameFileValue({ key: 'renamed_name', value: name });
    setShowRename(true);
  };

  const closeFileRename = () => {
    setShowRename(false);
  };

  const handleRenameClose = () => {
    setShow(false);
  };

  const handleEdit = (e) => {
    setRename(e.target.value);
  };

  const handleEditFile = (e) => {
    setRenameFileValue({ key: 'renamed_name', value: e.target.value });
  };

  const handleSaveRename = () => {
    loadNewFolderRequest({ key: self._id, value: rename_id, name: rename });
  };

  const handleSaveFileRename = () => {
    renameFileRequest();
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      loadNewFolderRequest({ key: self._id, value: rename_id, name: rename });
    }
  };

  const handleFileEnter = (e) => {
    if (e.key === 'Enter') {
      renameFileRequest();
    }
  };

  const handleDeleteFolder = (id) => {
    setdeleteId(id);
    setdeleteOpen(true);
  };

  const handleDeleteFile = (id) => {
    setdeleteFile(id);
    setfileOpen(true);
  };

  const handleFolderDel = () => {
    folderDeleteRequest(deleteId);
    setdeleteOpen(false);
  };

  const handleFileDel = () => {
    fileDeleteRequest(deleteFile);
    setfileOpen(false);
  };
  let routeList = [];
  self.path.map((each) => {
    routeList = [
      ...routeList,
      {
        path: '/editor-file-select?CKEditor=editor1&CKEditorFuncNum=1&langCode=en',
        label: each.name,
        id: each._id,
      },
    ];
    return null;
  });
  routeList = [
    ...routeList,
    {
      path: '/editor-file-select?CKEditor=editor1&CKEditorFuncNum=1&langCode=en',
      label: self.name,
      id: self._id,
    },
  ];

  const onClick = (linkObj) => {
    handleFolderLink(linkObj.id);
  };

  const handleQueryChange = (name) => (event) => {
    event.persist();
    const { value } = event.target;
    setQueryValue({ key: name, value });
  };

  const handleQueryEnter = (event) => {
    if (event.key === 'Enter') {
      loadFilesRequest(queryObj);
    }
  };

  const handleSearch = () => {
    loadFilesRequest(queryObj);
  };

  const handleSelectMultipleButton = () => {
    if (selectedButton === 'Multiple') {
      setfileCheckbox(!fileCheckbox);
    } else {
      setfileCheckbox(true);
    }
    setfolderCheckbox(false);
    setSelectedButton('Multiple');
    clearChosen();
  };

  const handleRenameButton = () => {
    if (selectedButton === 'Rename') {
      setfileCheckbox(!fileCheckbox);

      setfolderCheckbox(!folderCheckbox);
    } else {
      setfolderCheckbox(true);
      setfileCheckbox(true);
    }
    setSelectedButton('Rename');
    clearChosen();
  };

  const handleDeleteButton = () => {
    if (selectedButton === 'Delete') {
      setfileCheckbox(!fileCheckbox);
      setfolderCheckbox(!folderCheckbox);
    } else {
      setfileCheckbox(true);
      setfolderCheckbox(true);
    }

    setSelectedButton('Delete');
    clearChosen();
  };

  const onChooseFile = (image) => {
    addChosenFile(image);
  };

  const onChooseFolder = (folder) => {
    addChosenFolder(folder);
  };

  const handleUploadMultiple = () => {
    if (props.uploadMultiple) {
      props.uploadMultiple(chosen_files);
    } else {
      window.alert(
        'Define function for multiple upload where this component is called. Pass it as uploadMultiple in props',
      );
    }
  };

  const confirmDelete = () => {
    deleteMultipleRequest();
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        title={`New Folder`}
        body={
          <div className="w-5/6 sm:w-80">
            <input
              autoFocus
              id="name"
              type="text"
              className="inputbox"
              onChange={handleInput}
              value={one.name}
            />
          </div>
        }
        actions={
          <>
            <button
              onClick={handleClose}
              className="block btn margin-none text-white bg-red-500 border border-red-600 hover:bg-red-600 mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="block btn margin-none text-white bg-blue-500 border border-blue-600 hover:bg-blue-600 "
              disabled={folderAdded}
            >
              Save
            </button>
          </>
        }
      />

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        title={`Cant Upload here`}
        body={`Create sub folder first and then ony you can upload image`}
        actions={
          <>
            <button
              onClick={handleDialogClose}
              className="block btn margin-none text-white bg-red-500 border border-red-600 hover:bg-red-600 mr-1"
            >
              Close
            </button>
          </>
        }
      />
      <div className="flex items-center justify-between my-3">
        <div className="flex">
          <div className="flex items-center">
            <TextField
              className="w-48"
              id="contents-name"
              placeholder="Search files by name"
              value={query.search}
              onChange={handleQueryChange('search')}
              onKeyPress={handleQueryEnter}
            />
            <Button className="ml-1" variant="dark" onClick={handleSearch}>
              <FaSearch className="my-1" />
            </Button>
          </div>
        </div>

        <div className="flex items-center">
          {self.name === 'root' ? (
            <div
              onClick={() => handleDialogOpen()}
              className="items-center flex btn text-green-500 bg-green-100 border border-green-200 hover:bg-green-500 hover:border-green-500 px-4 py-2 rounded mr-2 hover:text-white cursor-pointer"
            >
              <FaImage className="text-base mr-2" />
              <span>Choose File</span>
            </div>
          ) : (
            <Dropzone onDrop={(file) => handleFileUpload(file, self._id)}>
              {({ getRootProps, getInputProps }) => (
                <div
                  className="items-center flex btn text-green-500 bg-green-100 border border-green-200 hover:bg-green-500 hover:border-green-500 px-4 py-2 rounded mr-2 hover:text-white cursor-pointer"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <FaImage className="text-base mr-2" />
                  <span>Choose File</span>
                </div>
              )}
            </Dropzone>
          )}
          <button
            onClick={handleAdd}
            className="items-center flex btn text-blue-500 bg-blue-100 border border-blue-200 hover:bg-blue-500 hover:border-blue-500 px-4 py-2 rounded mr-2 hover:text-white"
          >
            <FaPlusCircle className="text-base mr-2" />
            <span>New Folder</span>
          </button>
          <button
            onClick={handleRenameButton}
            className="items-center flex text-orange-500 bg-orange-100 border border-orange-200 hover:border-orange-500 hover:bg-orange-500 btn px-4 py-2 rounded mr-2 hover:text-white"
          >
            <FaPenSquare className="text-base mr-2" />
            <span>
              {' '}
              {selectedButton === 'Rename' && fileCheckbox ? 'Cancel ' : ''}
              Rename
            </span>
          </button>
          {selectedButton === 'Delete' &&
          (chosen_files.length > 0 || chosen_folders.length > 0) ? (
            <button
              onClick={confirmDelete}
              className="blink items-center flex btn bg-red-100 border border-red-200 text-red-500 hover:bg-red-500 hover:border-red-500 hover:text-white px-4 py-2 rounded"
            >
              <FaTrash className="text-base mr-2" />
              <span>Confirm Delete</span>
            </button>
          ) : (
            <button
              onClick={handleDeleteButton}
              className="items-center flex btn bg-red-100 border border-red-200 text-red-500 hover:bg-red-500 hover:border-red-500 hover:text-white px-4 py-2 rounded"
            >
              <FaTrash className="text-base mr-2" />
              <span>
                {' '}
                {selectedButton === 'Delete' && fileCheckbox
                  ? 'Cancel '
                  : ''}{' '}
                Delete
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="my-auto">
        <BreadCrumb
          linkcomponent={LinkComponent}
          routeList={routeList}
          onClick={onClick}
        />
      </div>
      <Dialog
        open={show}
        onClose={handleRenameClose}
        title={`Rename Folder`}
        body={
          <div className="w-5/6 sm:w-80">
            <input
              autoFocus
              id="rename"
              type="text"
              className="inputbox"
              onChange={handleEdit}
              value={rename}
              onKeyDown={handleEnter}
            />
          </div>
        }
        actions={
          <>
            <button
              onClick={handleRenameClose}
              className="block btn margin-none text-white bg-red-500 border border-red-600 hover:bg-red-600 mr-1"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveRename}
              className="block btn margin-none text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
            >
              Save
            </button>
          </>
        }
      />

      <Dialog
        open={showRename}
        onClose={closeFileRename}
        title={`Rename File`}
        body={
          <div className="w-5/6 sm:w-80">
            <input
              autoFocus
              id="rename"
              type="text"
              className="inputbox"
              onChange={handleEditFile}
              value={rename_file.renamed_name}
              onKeyDown={handleFileEnter}
            />
          </div>
        }
        actions={
          <>
            <button
              onClick={closeFileRename}
              className="block btn margin-none text-white bg-red-500 border border-red-600 hover:bg-red-600 mr-1"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveFileRename}
              className="block btn margin-none text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
            >
              Save
            </button>
          </>
        }
      />

      {/* end file rename */}
      <DeleteDialog
        open={deleteOpen}
        doClose={handleDelClose}
        doDelete={handleFolderDel}
      />
      <DeleteDialog
        open={fileOpen}
        doClose={handleFileClose}
        doDelete={handleFileDel}
      />
      <div className="flex flex-wrap bg-white">
        {folders.data.map((each) => (
          <div
            className="mediaCont rounded cursor-pointer w-36 h-36 relative flex"
            key={each._id}
          >
            <div
              className="flex-1"
              onMouseOver={() => handleMouseOver(each._id)}
              onMouseLeave={() => handleMouseOver('')}
            >
              <div className={`${folderCheckbox ? '' : 'mediaCheck'} absolute`}>
                {selectedButton === 'Rename' && (
                  <button
                    className="flex w-8 h-8 bg-white shadow rounded-full"
                    onClick={() => handleRename(each._id, each.name)}
                  >
                    <FaPen
                      className="text-sm inline-block text-black m-auto hover:text-primary"
                      title="Edit"
                    />
                  </button>
                )}
                {selectedButton === 'Delete' && (
                  <>
                    <div className="checkbox">
                      <input
                        id={`${each._id}-secondary`}
                        type="checkbox"
                        onClick={() => addChosenFolder(each)}
                      />
                      <label htmlFor={`${each._id}-secondary`}>
                        <span className="box">
                          <FaCheck className="check-icon" />
                        </span>
                      </label>
                    </div>
                  </>
                )}
              </div>
              <div
                className={`${
                  selected === each._id ? 'folder_media' : ''
                } flex flex-col justify-center items-center hover:bg-gray-100 h-full`}
                onClick={() => handleSingleClick(each._id)}
                onDoubleClick={() => handleFolderLink(each._id)}
                onKeyDown={() => handleFolderLink(each._id)}
                role="presentation"
              >
                <div className="flex justify-center">
                  <FaFolder className="text-yellow-300 text-6xl" />
                </div>

                <div className="w-32 mt-1 mx-auto text-sm text-center leading-tight select-none h-9 overflow-hidden">
                  <span className="text-gray-600 px-1 rounded">
                    {each.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {files.data.map((each, index) => (
          <div
            className="mediaCont hover:bg-gray-100 rounded cursor-pointer w-36 h-36 relative"
            key={each._id}
            onMouseOver={() => handleMouseOverFile(each._id)}
            onMouseLeave={() => handleMouseOverFile('')}
          >
            {selectedButton === 'Rename' && (
              <div className={`${fileCheckbox ? '' : 'mediaCheck'} absolute`}>
                <button
                  className="flex w-8 h-8 bg-white shadow rounded-full"
                  onClick={() => handleRenameFile(each._id, each.renamed_name)}
                >
                  <FaPen
                    className="text-sm inline-block text-black m-auto hover:text-primary"
                    title="Edit"
                  />
                </button>
              </div>
            )}
            <div className={`${fileCheckbox ? '' : 'mediaCheck'} absolute`}>
              {selectedButton === 'Multiple' && (
                <div className="checkbox">
                  <input
                    id={`${index}-multipleselect`}
                    type="checkbox"
                    onClick={() => onChooseFile(each)}
                  />
                  <label htmlFor={`${index}-multipleselect`}>
                    <span className="box">
                      <FaCheck className="check-icon" />
                    </span>
                  </label>
                </div>
              )}
              {selectedButton === 'Delete' && (
                <div className="checkbox">
                  <input
                    id={`${index}-dltmultiple`}
                    type="checkbox"
                    onClick={() => addChosenFile(each)}
                  />
                  <label htmlFor={`${index}-dltmultiple`}>
                    <span className="box">
                      <FaCheck className="check-icon" />
                    </span>
                  </label>
                </div>
              )}
            </div>
            <div className={`${selected === each._id ? 'folder_media' : ''} `}>
              <div className="flex items-center justify-center h-24 w-24 mx-auto">
                <img
                  className="border-2 border-white shadow-lg mx-auto"
                  style={{ maxWidth: 96, maxHeight: 96 }}
                  src={`${IMAGE_BASE}${each.path}`}
                  // alt={each.filename}
                  onClick={() => handleSingleClick(each._id)}
                  onDoubleClick={() => onSelect(each)}
                  onKeyDown={() => handleFolderLink(each._id)}
                  role="presentation"
                />
              </div>
              <div className="w-32 mt-1 mx-auto text-sm text-center leading-tight select-none h-9 overflow-hidden">
                <span className="text-gray-600 px-1 rounded">
                  {each.renamed_name}
                </span>
              </div>
            </div>
          </div>
        ))}
        {folders.data.length < 1 && files.data.length < 1 && (
          <div className="h-64 flex items-center justify-center flex-col w-full">
            <FaFolderOpen
              style={{ fontSize: '6rem' }}
              className="mb-5 opacity-10 mx-auto"
            />
            <p className="text-gray-400">This folder is empty.</p>
          </div>
        )}
      </div>
    </>
  );
};

FileList.propTypes = {
  addMediaRequest: PropTypes.func.isRequired,
  all: PropTypes.object.isRequired,
  one: PropTypes.object.isRequired,
  loadFilesRequest: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  queryObj: PropTypes.object,
  loadNewFolderRequest: PropTypes.func.isRequired,
  folderRename: PropTypes.bool.isRequired,
  setFolderName: PropTypes.func.isRequired,
  folderAdded: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  one: makeSelectOne(),
  folderAdded: makeSelectfolderAddRequest(),
  folderRename: makeSelectfolderRenameRequest(),
  loading: makeSelectLoading(),
  chosen: makeSelectChosen(),
  chosen_files: makeSelectChosenFiles(),
  chosen_folders: makeSelectChosenFolders(),
  fileRenameLoading: makeSelectFileRenameLoading(),
  rename_file: makeSelectRenameFile(),
  showRename: makeSelectShowRename(),
  query: makeSelectQuery(),
});

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });

export default compose(withConnect)(FileList);

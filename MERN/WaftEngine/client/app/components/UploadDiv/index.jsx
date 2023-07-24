import React, { useEffect, useState } from 'react';
import Dialog from '../Dialog';
import EditorFileSelect from '../../containers/EditorFileSelect';
import { IMAGE_BASE } from '../../containers/App/constants';
import { FaTrash, FaFileUpload } from 'react-icons/fa';

const UploadDiv = ({
  handleImageChange,
  imagePath,
  displayText,
  error,
  removeImage,
}) => {
  const [open, setOpen] = useState(false);

  const handleShow = () => {
    setOpen(true);
  };

  const handleHide = () => {
    setOpen(false);
  };

  useEffect(() => {
    handleHide();
  }, [imagePath]);

  return (
    <div className="mt-4">
      <section
        onClick={handleShow}
        className="text-gray-400 hover:border-primary hover:bg-blue-50 hover:text-primary text-center p-4 border border-gray-400 bg-gray-100 rounded-lg border-dashed cursor-pointer"
      >
        <FaFileUpload className="text-4xl mx-auto mb-2" />
        {displayText || 'Browse Files'}
      </section>
      {error && error.trim() !== '' && (
        <div className="error text-red-400">{error}</div>
      )}
      {imagePath && imagePath.trim() !== '' && (
        <div className="relative rounded border p-2 h-40 w-40 mt-4 overflow-hidden flex items-center justify-center">
          {removeImage && (
            <div className="absolute right-0 top-0 mt-2 mr-2 rounded-full w-6 h-6 bg-error flex justify-center items-center cursor-pointer">
              <FaTrash className="text-white text-xs" onClick={removeImage} />
            </div>
          )}
          <img className="rounded" src={`${IMAGE_BASE}${imagePath}`} />
        </div>
      )}
      <Dialog
        fullScreen
        open={open}
        onClose={handleHide}
        title={`Select Media Files`}
        body={
          <div>
            <EditorFileSelect
              location={location}
              selectFile={(file) => handleImageChange(file)}
            />
          </div>
        }
      />
    </div>
  );
};

export default UploadDiv;

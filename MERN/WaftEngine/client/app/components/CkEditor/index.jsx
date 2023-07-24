/**
 *
 * Breadcrumb
 *
 */

import PropTypes from 'prop-types';
import CKEditor from 'react-ckeditor-component';
import ToolTip from '../Basic/ToolTip';

const CkEditor = ({
  description,
  setOneValue,
  is_body,
  label,
  tooltip,
  tooltipDirection,
  id,
  required,
  error,
  valueKey,
  className,
  forArray,
  getValue,
  ...restProps
}) => {
  const handleEditorChange = (e, name) => {
    const title = is_body ? 'body' : name;
    const newContent = e.editor.getData();
    if (getValue) {
      getValue({ index: forArray, value: newContent });
    } else {
      setOneValue({ key: title, value: newContent });
    }
  };
  return (
    <div className={`${className}`}>
      <label className="flex items-center mb-px" htmlFor={id}>
        {label}
        {required && <span className="text-red-500 -mt-2 mx-px">*</span>}
        <div>
          <ToolTip direction={tooltipDirection}>{tooltip}</ToolTip>
        </div>
      </label>
      <CKEditor
        name="description"
        content={description}
        config={{
          allowedContent: true,
          image_previewText: ' ',
          filebrowserBrowseUrl: '/editor-file-select',
          filebrowserUploadUrl: '/api/media/multiple',
        }}
        events={{
          change: (e) =>
            handleEditorChange(e, valueKey ? valueKey : 'description'),
          value: description,
        }}
        {...restProps}
      />
      {error && error.trim() !== '' && (
        <div className="text-error">{error}</div>
      )}
    </div>
  );
};

CkEditor.propTypes = {
  description: PropTypes.string,
  setOneValue: PropTypes.func,
};

export default CkEditor;

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from '../../../../components/Basic/Button';
import Checkbox from '../../../../components/Basic/Checkbox';
import TextField from '../../../../components/Basic/TextField';
import CKEditor from '../../../../components/CkEditor';
import Dialog from '../../../../components/Dialog/index';
import Loading from '../../../../components/Loading';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import UploadDiv from '../../../../components/UploadDiv';
import { useInjectReducer } from '../../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../../hooks/useInjectSaga';
import { IMAGE_BASE } from '../../../App/constants';
import EditorFileSelect from '../../../EditorFileSelect';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectErrors,
  makeSelectLoading,
  makeSelectOne,
} from '../selectors';

const key = 'BlogCategory';

const AddEdit = (props) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { one, loading, errors } = props;

  const navigate = useNavigate();
  const { id: routeID } = useParams();
  const [state, setState] = useState({
    tempImage: '',
    openMedia: false,
  });

  useEffect(() => {
    props.clearErrors();
    if (routeID) {
      props.loadOneRequest(routeID);
    }
  }, []);

  useEffect(() => {
    if (one && one.image && one.image.fieldname) {
      const tempImage =
        one && one.image && one.image.path && `${IMAGE_BASE}${one.image.path}`;
      setState({ ...state, ...one, tempImage });
    }
  }, [one]);

  const handleClose = () => {
    setState({ ...state, openMedia: false });
  };

  const handleSetImage = () => {
    setState({ ...state, openMedia: true });
  };

  const handleImageChange = (file) => {
    props.setOneValue({ key: 'image', value: file });
    setState({ ...state, openMedia: false });
  };

  const handleImageRemove = () => {
    props.setOneValue({ key: 'image', value: '' });
    setState({ ...state, openMedia: false });
  };

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  };

  const handleChange = (name) => (event) => {
    event.persist();
    props.setOneValue({ key: name, value: event.target.value });
    if (name === 'title') {
      const slug = slugify(event.target.value);
      props.setOneValue({ key: 'slug_url', value: slug });
    }
  };

  const handleCheckedChange = (name) => (event) => {
    event.persist();
    props.setOneValue({ key: name, value: event.target.checked });
  };

  const handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    props.setOneValue({ key: name, value: newContent });
  };

  const onDrop = (files, name) => {
    const file = files[0];
    props.setOneValue({ key: [name], value: file });
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        setState({ ...state, tempImage: reader.result });
      },
      false,
    );
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    props.addEditRequest();
  };

  const handleBack = () => {
    navigate('/admin/blog-cat-manage');
  };

  return loading && loading == true ? (
    <Loading />
  ) : (
    <div>
      <Helmet>
        <title>{routeID ? 'Edit Blog' : 'Add Blog'}</title>
      </Helmet>
      <PageHeader
        title={routeID ? 'Edit Blog Category' : 'Add Blog Category'}
        back="/admin/blog-cat-manage"
        actions={
          <>
            <Button onClick={handleBack} variant="secondary">
              <FaTimes /> Cancel
            </Button>
            <Button onClick={handleSave} variant="success">
              <FaCheck /> Save
            </Button>
          </>
        }
      />
      <PageContent>
        <div className="grid grid-cols-3 gap-4">
          <TextField
            label="Title"
            id="title"
            value={(one && one.title) || ''}
            handleChange={handleChange('title')}
            error={errors && errors.title}
            type="text"
          />
          <TextField
            label="Slug"
            name="slug"
            handleChange={handleChange('slug_url')}
            value={(one && one.slug_url) || ''}
            id="slug"
            error={errors && errors.slug_url}
            type="text"
          />
          <TextField
            label="Order"
            id="order"
            type="number"
            value={(one && one.order) || ''}
            handleChange={handleChange('order')}
            error={errors && errors.order}
          />
        </div>
        <CKEditor
          className="my-4"
          description={one.description}
          label="Description"
          setOneValue={props.setOneValue}
          error={errors.description}
        />
        <UploadDiv
          removeImage={handleImageRemove}
          handleImageChange={handleImageChange}
          displayText="Browse Files"
          imagePath={one && one.image && one.image.path}
          error={errors.image}
        />
        <div className="pb-4">
          <Checkbox
            label="Is Active"
            checked={(one && one.is_active) || false}
            name="is_active"
            handleChange={handleCheckedChange('is_active')}
          />
        </div>
      </PageContent>
      <Dialog
        open={state.openMedia}
        className="w-5/6"
        onClose={handleClose}
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

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEdit);

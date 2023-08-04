import moment from 'moment';
import { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from '../../../../components/Basic/Button';
import Checkbox from '../../../../components/Basic/Checkbox';
import Tags from '../../../../components/Basic/Tags';
import TextField from '../../../../components/Basic/TextField';
import WECkEditior from '../../../../components/CkEditor';
import Loading from '../../../../components/Loading';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import UploadDiv from '../../../../components/UploadDiv';
import { useInjectReducer } from '../../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../../hooks/useInjectSaga';
import { DATE_FORMAT } from '../../../App/constants';
import { makeSelectToken } from '../../../App/selectors';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectErrors,
  makeSelectLoading,
  makeSelectMetaTag,
  makeSelectOne,
} from '../selectors';

const AddEdit = (props) => {
  const { id: routeID } = useParams();

  useInjectReducer({ key: 'PagecontentListing', reducer });
  useInjectSaga({ key: 'PagecontentListing', saga });

  useEffect(() => {
    props.clearErrors();
    if (routeID) {
      props.loadOneRequest(routeID);
    }
  }, []);

  const handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    props.setOneValue({ key: name, value: newContent });
  };

  const handleCheckedChange = (name) => (event) => {
    event.persist();
    props.setOneValue({ key: name, value: event.target.checked });
  };

  const handleChange = (name) => (event) => {
    event.persist();
    props.setOneValue({ key: name, value: event.target.value });
  };

  const handleDateChange = (name) => (date) => {
    props.setOneValue({
      key: name,
      value: moment(date).format(DATE_FORMAT),
    });
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/admin/page-content');
  };

  const handleSave = () => {
    props.addEditRequest();
  };

  const handleTempMetaTag = (e) => {
    e.persist();
    props.setMetaTagValue(e.target.value);
  };

  const insertMetaTags = (event) => {
    event.preventDefault();
    if (props.tempMetaTag.trim() !== '') {
      if (props.one.meta_tag.indexOf(props.tempMetaTag) === -1) {
        props.setOneValue({
          key: 'meta_tag',
          value: [...props.one.meta_tag, props.tempMetaTag],
        });
        props.setMetaTagValue('');
      }
    }
    return { tempMetaTag: props.setMetaTagValue('') };
  };

  const handleMetaTagDelete = (index) => () => {
    const chipData = [...props.one.meta_tag];

    chipData.splice(index, 1);
    props.setOneValue({ key: 'meta_tag', value: chipData });
  };

  const handleImageChange = (file) => {
    props.setOneValue({ key: 'image', value: file });
  };

  const handleRemoveImage = () => {
    props.setOneValue({ key: 'image', value: '' });
  };

  const { one, classes, match, loading, errors, tempMetaTag } = props;
  return loading && loading == true ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>
          {' '}
          {match && match.params && match.params.id
            ? 'Edit Page Content'
            : 'Add Page Content'}
        </title>
      </Helmet>
      <PageHeader
        title={
          match && match.params && match.params.id
            ? 'Edit Page Content'
            : 'Add Page Content'
        }
        back="/admin/page-content"
        actions={
          <>
            <Button onClick={handleGoBack} variant="secondary">
              <FaTimes /> Cancel
            </Button>
            <Button variant="success" onClick={handleSave}>
              <FaCheck /> Save Content
            </Button>
          </>
        }
      />
      <PageContent>
        <TextField
          label={'Title'}
          value={one.name}
          onChange={handleChange('name')}
          error={errors.name}
        />

        <TextField
          className={'mt-4'}
          label={'Page Key'}
          value={one.key}
          onChange={handleChange('key')}
          error={errors.key}
        />

        <WECkEditior
          className={'mt-4'}
          description={one.description}
          label={'Description'}
          setOneValue={props.setOneValue}
          error={errors.description}
        />

        <TextField
          className={'mt-4'}
          label={'Meta Title'}
          value={one.meta_title}
          onChange={handleChange('meta_title')}
          error={errors.meta_title}
        />
        <TextField
          className={'mt-4'}
          label={'Meta Description'}
          value={one.meta_description}
          onChange={handleChange('meta_description')}
          error={errors.meta_description}
        />

        <Tags
          className={'mt-4'}
          handleAdd={insertMetaTags}
          value={tempMetaTag}
          label={'Meta Tags'}
          tags={one.meta_tag}
          handleRemove={handleMetaTagDelete}
          handleChange={handleTempMetaTag}
          error={errors && errors.meta_tag}
        />

        <UploadDiv
          handleImageChange={handleImageChange}
          displayText="Upload Image"
          imagePath={one && one.image && one.image.path}
          error={errors && errors.image}
          removeImage={handleRemoveImage}
        />

        <Checkbox
          label="Is Active"
          name="is_active"
          handleChange={handleCheckedChange('is_active')}
          checked={one.is_active || false}
        />

        <Checkbox
          label="Is Page"
          name="is_page"
          handleChange={handleCheckedChange('is_page')}
          checked={one.is_page || false}
        />
      </PageContent>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  token: makeSelectToken(),
  tempMetaTag: makeSelectMetaTag(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEdit);

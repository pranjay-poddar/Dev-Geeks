import moment from 'moment';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from '../../../../components/Basic/Button';
import Checkbox from '../../../../components/Basic/Checkbox';
import DatePickerField from '../../../../components/Basic/Datepicker';
import SelectField from '../../../../components/Basic/Select';
import Tags from '../../../../components/Basic/Tags';
import TextArea from '../../../../components/Basic/TextArea';
import TextField from '../../../../components/Basic/TextField';
import WECkEditior from '../../../../components/CkEditor';
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
  makeSelectCategory,
  makeSelectChip,
  makeSelectErrors,
  makeSelectLoading,
  makeSelectMetaKeyword,
  makeSelectMetaTag,
  makeSelectOne,
  makeSelectTag,
  makeSelectUsers,
} from '../selectors';

const key = 'blogManagePage';

const AddEdit = (props) => {
  const {
    classes,
    one,
    category,
    users,
    tempTag,
    tempMetaTag,
    tempMetaKeyword,
    match,
    loading,
    errors,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [state, setState] = useState({
    tempImage: '',
    startDate: new Date(),
    selected: [],
    slug_generated: false,
    openMedia: false,
  });

  const navigate = useNavigate();
  const { id: routeID } = useParams();

  useEffect(() => {
    props.clearOne();
    props.clearErrors();
    if (routeID) {
      props.loadOneRequest(routeID);
    }
    props.loadCategoryRequest();
    props.loadUsersRequest();
  }, []);

  useEffect(() => {
    if (one.image && one.image.fieldname) {
      const tempImage =
        one.image && one.image.path && `${IMAGE_BASE}${one.image.path}`;
      setState({ ...one, tempImage });
    }
    if (one.published_on) {
      setState({ startDate: new Date(one.published_on) });
    }
  }, [props.one]);

  const handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    props.setOneValue({ key: name, value: newContent });
  };

  const handleCheckedChange = (name) => (event) => {
    event.persist();
    props.setOneValue({ key: name, value: event.target.checked });
  };

  const slugify = (text) =>
    text
      .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ')
      .toLowerCase()
      .replace(/^\s+|\s+$/gm, '')
      .replace(/\s+/g, '-')
      .trim()
      .toLowerCase();

  const handleChange = (name) => (event) => {
    event.persist();

    props.setOneValue({ key: name, value: event.target.value });
    if (name === 'title') {
      const slug = slugify(event.target.value);
      props.setOneValue({ key: 'slug_url', value: slug });
    }
  };

  const handleDropDownChange = (name) => (e) => {
    e.persist();
    props.setOneValue({ key: name, value: e.target.value });
  };

  const handleMultipleSelectCategoryChange = (e) => {
    props.setCategoryValue({ value: e && e.map((each) => each.value) });
  };

  const handleMultipleSelectAuthorChange = (e) => {
    props.setAuthorValue({ value: e && e.map((each) => each.value) });
  };

  const handleTempMetaKeyword = (e) => {
    e.persist();
    props.setMetaKeywordValue(e.target.value);
  };

  const handleTempMetaTag = (e) => {
    e.persist();
    props.setMetaTagValue(e.target.value);
  };

  const handleTempTag = (e) => {
    e.persist();
    props.setTagValue(e.target.value);
  };

  const handleClose = () => {
    setState({ openMedia: false });
  };

  const handleSetImage = () => {
    setState({ openMedia: true });
  };

  const handleImageChange = (file) => {
    props.setOneValue({ key: 'image', value: file });
    setState({ openMedia: false });
  };

  const onDrop = (files, name) => {
    const file = files[0];
    props.setOneValue({ key: [name], value: file });
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        setState({ tempImage: reader.result });
      },
      false,
    );
    reader.readAsDataURL(file);
  };

  const handlePublishedOn = (date) => {
    setState({ startDate: date });
    props.setOneValue({
      key: 'published_on',
      value: moment(date).format('YYYY-MM-DD HH:mm'),
    });
  };

  const handleGoBack = () => {
    navigate('/admin/blog-manage');
  };

  const handleSave = () => {
    props.addEditRequest();
  };

  const handleMetaKeywordDelete = (index) => () => {
    const chipData = [...props.one.keywords];

    chipData.splice(index, 1);
    props.setOneValue({ key: 'keywords', value: chipData });
  };

  const handleMetaTagDelete = (index) => () => {
    const chipData = [...props.one.meta_tag];

    chipData.splice(index, 1);
    props.setOneValue({ key: 'meta_tag', value: chipData });
  };

  const handleDelete = (index) => () => {
    const chipData = [...props.one.tags];
    chipData.splice(index, 1);
    props.setOneValue({
      key: 'tags',
      value: chipData,
    });
  };

  const insertTags = (event) => {
    event.preventDefault();
    if (props.tempTag.trim() !== '') {
      if (props.one.tags.indexOf(props.tempTag) === -1) {
        props.setOneValue({
          key: 'tags',
          value: [...props.one.tags, props.tempTag],
        });
        props.setTagValue('');
      }
    }
    return { tempTag: props.setTagValue('') };
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

  const insertMetaKeywords = (event) => {
    event.preventDefault();
    if (props.tempMetaKeyword.trim() !== '') {
      if (props.one.keywords.indexOf(props.tempMetaKeyword) === -1) {
        props.setOneValue({
          key: 'keywords',
          value: [...props.one.keywords, props.tempMetaKeyword],
        });
        props.setMetaKeywordValue('');
      }
    }
    return { tempMetaKeyword: props.setMetaKeywordValue('') };
  };

  const handleSelectedValue = (ids, cats) => {
    const selected = ids.map(
      (each) => Object.keys(cats).length && cats[each].title,
    );
    return selected.join(', ');
  };

  const { tempImage } = state;

  let listCategoryNormalized = {};
  const listCategory = category.map((each) => {
    const obj = {
      label: each.title,
      value: each._id,
    };
    listCategoryNormalized = {
      ...listCategoryNormalized,
      [each._id]: obj,
    };
    return obj;
  });

  let listAuthorNormalized = {};
  const listAuthor = users.map((each) => {
    const obj = {
      label: each.name,
      value: each._id,
    };
    listAuthorNormalized = {
      ...listAuthorNormalized,
      [each._id]: obj,
    };
    return obj;
  });

  const cats = {};
  category.map((e) => {
    cats[e._id] = e;
    return null;
  });

  return loading && loading == true ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>{routeID ? 'Edit Blog' : 'Add Blog'}</title>
      </Helmet>
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
      <PageHeader
        title={routeID ? 'Edit Blog' : 'Add Blog'}
        back="/admin/blog-manage"
        actions={
          <>
            <Button onClick={handleGoBack} variant="secondary">
              <FaTimes />
              Cancel
            </Button>
            <Button onClick={handleSave} variant="success">
              <FaCheck />
              Save
            </Button>
          </>
        }
      />
      <PageContent>
        <TextField
          label="Title"
          type="text"
          value={(one && one.title) || ''}
          handleChange={handleChange('title')}
          error={errors.title}
          className="md:w-1/2"
        />
        <TextField
          label="Slug"
          type="text"
          value={(one && one.slug_url) || ''}
          handleChange={handleChange('slug_url')}
          error={errors.slug_url}
          className="md:w-1/2 mt-4"
        />
        <SelectField
          className="md:w-1/2 mt-4"
          label="Category"
          id="Category"
          options={listCategory}
          value={
            (one.category &&
              one.category.map((each, index) => {
                const catObj = listCategoryNormalized[each];
                if (!catObj) {
                  return {
                    label: 'loading',
                    value: index,
                  };
                }
                return catObj;
              })) ||
            []
          }
          name="category"
          placeholder="Select Blog Category"
          onChange={handleMultipleSelectCategoryChange}
          isSearchable
          isMulti
        />
        <TextArea
          label="Short Description"
          id="short_description"
          type="text"
          name="short_description"
          handleChange={handleChange('short_description')}
          value={one.short_description || ''}
          className="md:w-1/2 mt-4"
        />

        <div className="pt-2">
          <WECkEditior
            description={one.description}
            setOneValue={props.setOneValue}
            label="Blog Description"
            error={errors.description}
          />
        </div>
        <UploadDiv
          handleImageChange={handleSetImage}
          displayText="Image"
          imagePath={one && one.image && one.image.path}
        />
        <DatePickerField
          value={state.startDate}
          dateFormat="MMMM d, yyyy h:mm aa"
          timeFormat="HH:mm"
          id="published_on"
          label="Published On"
          onChange={handlePublishedOn}
          showTimeSelect
          className="md:w-1/2 mt-4"
        />
        <Tags
          handleAdd={insertTags}
          value={tempTag || ''}
          label="Tags"
          handleChange={handleTempTag}
          handleRemove={handleDelete}
          tags={one.tags}
          className="md:w-1/2 mt-4"
        />
        <Tags
          handleAdd={insertMetaTags}
          value={tempMetaTag || ''}
          label=" Meta Tags"
          handleChange={handleTempMetaTag}
          handleRemove={handleMetaTagDelete}
          tags={one.meta_tag}
          className="md:w-1/2 mt-4"
        />
        <Tags
          className="md:w-1/2 mt-4"
          handleAdd={insertMetaKeywords}
          value={tempMetaKeyword || ''}
          label=" Meta Keywords"
          handleChange={handleTempMetaKeyword}
          handleRemove={handleMetaKeywordDelete}
          tags={one.keywords}
        />
        <TextArea
          label="Meta Description"
          id="blog-meta-description"
          type="text"
          value={one.meta_description || ''}
          name="meta-description"
          handleChange={handleChange('meta_description')}
          className="md:w-1/2 mt-4"
        />
        <SelectField
          className="md:w-1/2 mt-4"
          label={'Author'}
          id="blog_author"
          value={
            (one.author &&
              one.author.map((each, index) => {
                const authorObj = listAuthorNormalized[each];
                if (!authorObj) {
                  return {
                    label: null,
                    value: index,
                  };
                }
                return authorObj;
              })) ||
            []
          }
          name="author"
          placeholder="Select Blog Author"
          onChange={handleMultipleSelectAuthorChange}
          isSearchable
          isMulti
          options={listAuthor}
          errors={errors && errors.author}
        />
        <div>
          <Checkbox
            handleChange={handleCheckedChange('is_active')}
            checked={one.is_active || false}
            id="is_active"
            label="Is Active"
            name="is_active"
          />
          <Checkbox
            checked={one.is_published || false}
            handleChange={handleCheckedChange('is_published')}
            id="is_published"
            label="Is Published"
            name="is_published"
          />
          <Checkbox
            checked={one.is_highlight || false}
            handleChange={handleCheckedChange('is_highlight')}
            id="is_highlight"
            name="is_highlight"
            label="Is Highlighted"
          />
          <Checkbox
            checked={one.is_showcase || false}
            handleChange={handleCheckedChange('is_showcase')}
            id="is_showcase"
            name="is_showcase"
            label="Is Showcase"
          />
        </div>
      </PageContent>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  category: makeSelectCategory(),
  chip: makeSelectChip(),
  tempTag: makeSelectTag(),
  tempMetaTag: makeSelectMetaTag(),
  tempMetaKeyword: makeSelectMetaKeyword(),
  loading: makeSelectLoading(),
  users: makeSelectUsers(),
  errors: makeSelectErrors(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEdit);

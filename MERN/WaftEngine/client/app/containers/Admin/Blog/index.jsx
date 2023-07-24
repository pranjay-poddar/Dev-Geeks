import moment from 'moment';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import { FaBan, FaPlus, FaRegCheckCircle, FaSearch } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from '../../../components/Basic/Button';
import DatePickerField from '../../../components/Basic/Datepicker';
import SelectField from '../../../components/Basic/Select';
import DeleteDialog from '../../../components/DeleteDialog';
import Dialog from '../../../components/Dialog/index';
import Loading from '../../../components/Loading';
import PageContent from '../../../components/PageContent/PageContent';
import PageHeader from '../../../components/PageHeader/PageHeader';
import TableFilter from '../../../components/Table/components/Filter';
import Table from '../../../components/Table/Table';
import { useInjectReducer } from '../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../hooks/useInjectSaga';
import { DATE_FORMAT } from '../../App/constants';
import * as mapDispatchToProps from './actions';
import QuickEdit from './AddEditPage/QuickEdit';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectAll,
  makeSelectCategory,
  makeSelectChip,
  makeSelectErrors,
  makeSelectHelper,
  makeSelectLoading,
  makeSelectMetaKeyword,
  makeSelectMetaTag,
  makeSelectOne,
  makeSelectQuery,
  makeSelectTag,
  makeSelectUpateCalled,
  makeSelectUsers,
} from './selectors';

const key = 'blogManagePage';

/* eslint-disable react/prefer-stateless-function */
const BlogManagePage = (props) => {
  const [state, setState] = useState({
    open: false,
    deleteId: '',
    startDate: new Date(),
    cleared: false,
  });

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const navigate = useNavigate();

  useEffect(() => {
    props.loadAllRequest(props.query);
    props.loadCategoryRequest();
    props.loadUsersRequest();
  }, [props.query.size, props.query.page]);

  const handleAdd = () => {
    props.clearOne();
    navigate('/admin/blog-manage/add');
  };

  const handleEdit = (id) => {
    navigate(`/admin/blog-manage/edit/${id}`);
  };

  const handleView = (slug_url) => {
    navigate(`/blog/${slug_url}`);
  };

  const handleOpen = (id) => {
    setState({ open: true, deleteId: id });
  };

  const handleClose = () => {
    setState({ open: false });
  };

  const handleDeleteBlog = (id) => {
    props.deleteOneRequest(id);
    setState({ open: false });
  };

  const handleQueryChange = (e) => {
    e.persist();
    props.setQueryValue({
      key: e.target.name,
      value: e.target.value,
    });
  };

  const handleSearch = () => {
    props.loadAllRequest(props.query);
    props.setQueryValue({ key: 'page', value: 1 });
  };

  const handlePagination = (paging) => {
    props.setQueryValue({ key: 'page', value: paging.page });
    props.setQueryValue({ key: 'size', value: paging.size });
  };

  // for quick edit state

  const handleLoadOne = (id) => {
    props.loadOneRequest(id);
    props.loadCategoryRequest();
    props.loadUsersRequest();
    props.setValue({
      name: 'helper',
      key: 'showQuickEdit',
      value: true,
    });
    props.setUpdateCalled(false);
  };

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
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text

  const handleChange = (name) => (event) => {
    event.persist();
    props.setOneValue({ key: name, value: event.target.value });
    if (name === 'title') {
      const slug = slugify(event.target.value);
      props.setOneValue({ key: 'slug_url', value: slug });
    }
  };

  const handleQueryDropDownChange = (name) => (e) => {
    props.setQueryValue({ key: name, value: e.value });
  };

  const handleQueryPublishedOn = (date) => {
    setState({ startDate: date });

    props.setQueryValue({
      key: 'find_published_on',
      value: moment(date).format(DATE_FORMAT),
    });
  };

  const handleDropDownChange = (name) => (e) => {
    e.persist();
    props.setOneValue({ key: name, value: e.target.value });
  };

  const handleMultipleSelectCategoryChange = (e) => {
    props.setCategoryValue({
      value: e && e.map((each) => each.value),
    });
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

  const handlePublishedOn = (date) => {
    props.setOneValue({
      key: 'published_on',
      value: date,
    });
  };

  const handleSave = () => {
    props.addEditRequest();
    props.setUpdateCalled(true);
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
    if (props.one.tags.indexOf(props.tempTag) === -1) {
      props.setOneValue({
        key: 'tags',
        value: [...props.one.tags, props.tempTag],
      });
      props.setTagValue('');
    }
    return { tempTag: props.setTagValue('') };
  };

  const insertMetaTags = (event) => {
    event.preventDefault();
    if (props.one.meta_tag.indexOf(props.tempMetaTag) === -1) {
      props.setOneValue({
        key: 'meta_tag',
        value: [...props.one.meta_tag, props.tempMetaTag],
      });
      props.setMetaTagValue('');
    }
    return { tempMetaTag: props.setMetaTagValue('') };
  };

  const insertMetaKeywords = (event) => {
    event.preventDefault();
    if (props.one.keywords.indexOf(props.tempMetaKeyword) === -1) {
      props.setOneValue({
        key: 'keywords',
        value: [...props.one.keywords, props.tempMetaKeyword],
      });
      props.setMetaKeywordValue('');
    }
    return { tempMetaKeyword: props.setMetaKeywordValue('') };
  };

  const handleMultipleSelectAuthorChange = (e) => {
    props.setAuthorValue({ value: e && e.map((each) => each.value) });
  };

  // for quick edit end

  const handleQuickEditClose = () => {
    props.setValue({
      name: 'helper',
      key: 'showQuickEdit',
      value: false,
    });
  };

  const {
    all: { data, page, size, totalData, msg },
    query,
    loading,
    users,
    category,
  } = props;

  let showcaseOptions = [
    { value: '', label: 'All' },
    { value: true, label: 'Showcase' },
    { value: false, label: 'Not Showcase' },
  ];
  let listShowcaseNormalized = {};

  const listShowCase = showcaseOptions.map((each) => {
    const obj = {
      label: each.label,
      value: each.value,
    };

    listShowcaseNormalized = {
      ...listShowcaseNormalized,
      [each.value]: obj,
    };
    return obj;
  });

  let publishedOptions = [
    { value: '', label: 'All' },
    { value: true, label: 'Published' },
    { value: false, label: 'Not Published' },
  ];
  let listPublishedNormalized = {};

  const listPublished = publishedOptions.map((each) => {
    const obj = {
      label: each.label,
      value: each.value,
    };

    listPublishedNormalized = {
      ...listPublishedNormalized,
      [each.value]: obj,
    };
    return obj;
  });

  let activeOptions = [
    { value: '', label: 'All' },
    { value: true, label: 'Active' },
    { value: false, label: 'Not Active' },
  ];
  let listActiveNormalized = {};

  const listActive = activeOptions.map((each) => {
    const obj = {
      label: each.label,
      value: each.value,
    };

    listActiveNormalized = {
      ...listActiveNormalized,
      [each.value]: obj,
    };
    return obj;
  });

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

  listCategory.unshift({ label: 'All', value: '' });

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

  listAuthor.unshift({ label: 'All', value: '' });

  const {
    one,
    chip,
    tempTag,
    tempMetaTag,
    tempMetaKeyword,
    errors,
    helper: { showQuickEdit },
  } = props;

  const tablePagination = { page, size, totaldata: totalData };
  const tableData = data.map(
    ({
      title,
      slug_url,
      category,
      added_at,
      published_on,
      is_published,
      author,
      _id,
    }) => [
      <>
        <Link
          to={`/blog/${moment(added_at).format('YYYY/MM/DD')}/${_id}`}
          target="_blank"
          className="block font-bold text-base text-blue-500 cursor-pointer hover:underline"
        >
          {title}
        </Link>{' '}
        <div className="flex py-2">
          <button
            aria-label="Edit"
            type="button"
            className="border-r px-1 text-center leading-none hover:text-blue-500 whitespace-nowrap text-sm"
            onClick={() => handleEdit(_id)}
          >
            Edit
          </button>
          <button
            aria-label="Edit"
            type="button"
            className="border-r px-1 text-center leading-none hover:text-blue-500 whitespace-nowrap text-sm"
            onClick={() => handleLoadOne(_id)}
          >
            Quick Edit
          </button>

          <button
            className="px-1 text-center leading-none text-red-500 whitespace-nowrap text-sm"
            type="button"
            onClick={() => handleOpen(_id)}
          >
            Delete
          </button>
        </div>
      </>,
      (category && category.map((each) => each.title).join(', ')) || 'No',

      <span className="whitespace-nowrap">
        {moment(added_at).format(DATE_FORMAT)}
      </span>,
      <span className="whitespace-nowrap">
        {moment(published_on).format('YYYY-MM-DD HH:mm')}
      </span>,
      <div className="flex justify-center">
        {is_published ? (
          <FaRegCheckCircle className="text-green-500" />
        ) : (
          <FaBan className="text-red-400" />
        )}{' '}
      </div>,
      (
        <p className="">
          {author &&
            author.length > 0 &&
            author.map((author) => author.name).join(', ')}
        </p>
      ) || '',
    ],
  );

  const pullData = (data) => {};

  const activeData =
    data && data.length > 0
      ? data.map(({ is_highlight }) => [!is_highlight])
      : [];

  return (
    <>
      <DeleteDialog
        open={state.open}
        doClose={handleClose}
        doDelete={() => handleDeleteBlog(state.deleteId)}
      />
      <Helmet>
        <title>Blogs</title>
      </Helmet>
      <Dialog
        open={showQuickEdit}
        className="w-5/6 sm:w-96"
        onClose={handleQuickEditClose}
        title={`Quick Edit`}
        body={
          <QuickEdit
            handleEditorChange={handleEditorChange}
            handleCheckedChange={handleCheckedChange}
            handleChange={handleChange}
            slugify={slugify}
            handleDropDownChange={handleDropDownChange}
            handleMultipleSelectCategoryChange={
              handleMultipleSelectCategoryChange
            }
            handleTempMetaKeyword={handleTempMetaKeyword}
            handleTempMetaTag={handleTempMetaTag}
            handlePublishedOn={handlePublishedOn}
            handleSave={handleSave}
            handleMetaKeywordDelete={handleMetaKeywordDelete}
            handleMetaTagDelete={handleMetaTagDelete}
            handleDelete={handleDelete}
            insertTags={insertTags}
            insertMetaTags={insertMetaTags}
            insertMetaKeywords={insertMetaKeywords}
            one={one}
            category={category}
            users={users}
            tempTag={tempTag}
            tempMetaTag={tempMetaTag}
            tempMetaKeyword={tempMetaKeyword}
            errors={errors}
            setUpdateCalled={props.setUpdateCalled}
            handleMultipleSelectAuthorChange={handleMultipleSelectAuthorChange}
          />
        }
        actions={<Button onClick={handleSave}>Update</Button>}
      />
      {loading && loading == true ? <Loading /> : <></>}
      <PageHeader
        title="Blog"
        actions={
          <Button onClick={handleAdd} variant="primary">
            <FaPlus className="mr-1" /> Add New
          </Button>
        }
      >
        <span className="text-sm border-r-1 p-2 m-2 ml-6">
          Published({msg && msg.published ? msg.published : null})
        </span>
        <span className="text-sm border-r-1 p-2 m-2 -ml-2">
          Active({msg && msg.active ? msg.active : null})
        </span>
        <span className="text-sm border-r-1 p-2 m-2 -ml-2">
          Highlight({msg && msg.highlight ? msg.highlight : null})
        </span>
        <span className="text-sm p-2 m-2 -ml-2">
          Showcase({msg && msg.showcase ? msg.showcase : null})
        </span>
      </PageHeader>
      <PageContent loading={loading}>
        <TableFilter col={7}>
          <SelectField
            label="Category"
            id="category"
            placeholder="All"
            value={listCategoryNormalized[query.find_category] || null}
            onChange={handleQueryDropDownChange('find_category')}
            options={listCategory}
          />
          <SelectField
            label="Author"
            id="author"
            placeholder="All"
            value={listAuthorNormalized[query.find_author] || null}
            onChange={handleQueryDropDownChange('find_author')}
            options={listAuthor}
          />
          <SelectField
            label="Showcase"
            id="showcase"
            placeholder="All"
            value={listShowcaseNormalized[query.find_is_showcase] || null}
            onChange={handleQueryDropDownChange('find_is_showcase')}
            options={listShowCase}
          />
          <SelectField
            label="Published"
            id="published"
            placeholder="All"
            value={listPublishedNormalized[query.find_is_published] || null}
            onChange={handleQueryDropDownChange('find_is_published')}
            options={listPublished}
          />
          <SelectField
            label="Active"
            id="active"
            placeholder="All"
            value={listActiveNormalized[query.find_is_active] || null}
            onChange={handleQueryDropDownChange('find_is_active')}
            options={listActive}
          />
          <DatePickerField
            value={state.startDate}
            label="Published On"
            onChange={handleQueryPublishedOn}
            clearIcon={null}
          />
        <div>
          <Button variant={'dark'} onClick={handleSearch}>
            <FaSearch className="my-1 " /> 
          </Button>
          </div>
        </TableFilter>
        <Table
          className="fixed-layout"
          tableHead={[
            'Title',
            'Category',
            'Added At',
            'Publish On',
            'Is Published',
            'Author',
          ]}
          tableData={tableData}
          pagination={tablePagination}
          handlePagination={handlePagination}
          activeData={activeData}
          loading={loading}
          emptyDataMsg="No Blog Found"
        />
      </PageContent>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  helper: makeSelectHelper(),
  loading: makeSelectLoading(),
  // for quick edit
  one: makeSelectOne(),
  category: makeSelectCategory(),
  chip: makeSelectChip(),
  tempTag: makeSelectTag(),
  tempMetaTag: makeSelectMetaTag(),
  tempMetaKeyword: makeSelectMetaKeyword(),
  users: makeSelectUsers(),
  errors: makeSelectErrors(),
  updateCalled: makeSelectUpateCalled(),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogManagePage);

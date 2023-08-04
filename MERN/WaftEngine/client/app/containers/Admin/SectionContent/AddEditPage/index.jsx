import moment from 'moment';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { push } from 'redux-first-history';
import { createStructuredSelector } from 'reselect';
import Button from '../../../../components/Basic/Button';
import Checkbox from '../../../../components/Basic/Checkbox';
import TextField from '../../../../components/Basic/TextField';
import WECkEditior from '../../../../components/CkEditor';
import Loading from '../../../../components/Loading';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
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
  useInjectReducer({ key: 'contentsListingPage', reducer });
  useInjectSaga({ key: 'contentsListingPage', saga });
  const { id: routeID } = useParams();
  const navigate = useNavigate();
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

  const handleGoBack = () => {
    navigate('/admin/section-content');
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

  const { one, match, loading, errors, tempMetaTag, edit_id } = props;
  return loading && loading == true ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>
          {edit_id && edit_id !== '' ? 'Edit Section' : 'Add Section'}
        </title>
      </Helmet>
      <PageHeader
        title={routeID ? 'Edit Section' : 'Add Section'}
        back={`/admin/section-content`}
        actions={
          <>
            <Button onClick={handleGoBack} variant="secondary">
              <FaTimes className="mr-1" /> Cancel
            </Button>
            <Button onClick={handleSave} variant="success">
              <FaCheck className="mr-1" /> Save
            </Button>
          </>
        }
      ></PageHeader>

      <PageContent className="bg-white border- p-4">
        <TextField
          label={'Content Title'}
          type="text"
          value={one.name}
          onChange={handleChange('name')}
          error={errors.name}
        />

        <TextField
          className="mt-4"
          label={'Content Key'}
          type="text"
          value={one.key}
          onChange={handleChange('key')}
          error={errors.key}
        />
        <WECkEditior
          className="my-4"
          description={one.description}
          setOneValue={props.setOneValue}
          label={'Description'}
          error={errors.description}
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

export default connect(mapStateToProps, {
  ...mapDispatchToProps,
  push,
})(AddEdit);

/**
 *
 * GlobalSetting
 *
 */

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from '../../../components/Basic/Button';
import Checkbox from '../../../components/Basic/Checkbox';
import SelectField from '../../../components/Basic/Select';
import Tags from '../../../components/Basic/Tags';
import TextArea from '../../../components/Basic/TextArea';
import TextField from '../../../components/Basic/TextField';
import CKEditor from '../../../components/CkEditor';
import Loading from '../../../components/Loading';
import PageContent from '../../../components/PageContent/PageContent';
import PageHeader from '../../../components/PageHeader/PageHeader';
import { useInjectReducer } from '../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../hooks/useInjectSaga';
import { enqueueSnackbar } from '../../App/actions';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectLoading, makeSelectOne } from './selectors';

const key = 'globalSetting';

export const GlobalSetting = (props) => {
  const {
    loading,
    one,
    loadOneRequest,
    setOneValue,
    saveRequest,
    enqueueSnackbar,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [errors, setError] = useState('');
  const [tempVal, setTempVal] = useState('');

  const navigate = useNavigate();
  const { id: routeID } = useParams();

  useEffect(() => {
    if (routeID) {
      loadOneRequest(routeID);
    }
  }, []);

  const handleChange = (name) => (event) => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };

  const handleSelectChange = (name) => (event) => {
    setOneValue({ key: name, value: event.value });
    if (name === 'value_type' && event.value === 'Boolean') {
      setOneValue({ key: 'value', value: 'true' });
    }
    if (name === 'value_type' && event.value === 'Array') {
      setOneValue({ key: 'value', value: [] });
    }
    if (
      name === 'value_type' &&
      event.value !== 'Boolean' &&
      event.value !== 'Array'
    ) {
      setOneValue({ key: 'value', value: '' });
    }
  };

  const handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    setOneValue({ key: name, value: newContent });
  };

  const handleCheckedChange = (name) => (event) => {
    event.persist();
    setOneValue({ key: name, value: event.target.checked });
  };

  const handleBack = () => {
    navigate('/admin/global-setting');
  };

  const handleSave = () => {
    if (one.type.trim() === '') {
      setError('Type is required');
      const snackbarData = {
        message: 'Type is required',
        options: {
          variant: 'warning',
        },
      };
      enqueueSnackbar(snackbarData);
    } else {
      saveRequest();
    }
  };

  const handleTempValue = (event) => {
    setTempVal(event.target.value);
  };

  const insertTags = (event) => {
    event.preventDefault();
    if (tempVal.trim() !== '') {
      if (one.value.indexOf(tempVal) === -1) {
        setOneValue({
          key: 'value',
          value: [...one.value, tempVal],
        });
        setTempVal('');
      }
    }
    return { tempVal: setTempVal('') };
  };

  const handleDelete = (index) => () => {
    const chipData = [...one.value];
    chipData.splice(index, 1);
    setOneValue({
      key: 'value',
      value: chipData,
    });
  };

  const valueTypeOptions = [
    { value: 'Boolean', label: 'Boolean' },
    { value: 'Free text', label: 'Free text' },
    { value: 'Number', label: 'Number' },
    { value: 'ck_editor', label: 'ck_editor' },
    { value: 'Array', label: 'Array' },
  ];

  let listValueTypeNormalized = {};

  let listValueType = valueTypeOptions.map((each) => {
    let obj = {
      label: each.label,
      value: each.value,
    };

    listValueTypeNormalized = {
      ...listValueTypeNormalized,
      [each.value]: obj,
    };

    return obj;
  });

  const valueOptions = [
    { value: true, label: 'True' },
    { value: false, label: 'False' },
  ];

  let listValueNormalized = {};
  let listValue = valueOptions.map((each) => {
    let obj = {
      label: each.label,
      value: each.value,
    };

    listValueNormalized = {
      ...listValueNormalized,
      [each.value]: obj,
    };

    return obj;
  });

  return (
    <>
      <Helmet>
        <title>Global Settings </title>
      </Helmet>
      {loading && loading == true ? <Loading /> : <></>}
      <PageHeader
        title={routeID ? 'Global Setting Edit ' : 'Global Setting Add'}
        back="/admin/global-setting"
        actions={
          <>
            <Button variant="secondary" onClick={handleBack}>
              <FaTimes /> Cancel
            </Button>
            <Button variant="success" onClick={handleSave}>
              <FaCheck /> Save
            </Button>
          </>
        }
      />
      <PageContent loading={loading}>
        <TextField
          label="Key"
          id="key"
          type="text"
          value={one.key || ''}
          handleChange={handleChange('key')}
          className="md:w-1/2 pb-4"
        />
        <SelectField
          className="md:w-1/2 pb-4"
          label="Value Type"
          id="value_type"
          value={listValueTypeNormalized[one.value_type] || null}
          placeholder="Select Value Type"
          onChange={handleSelectChange('value_type')}
          options={listValueType}
        />

        {one.value_type === 'Boolean' && (
          <SelectField
            className="md:w-1/2 pb-4"
            label="Value"
            options={listValue}
            value={listValueNormalized[`${one.value}`] || ''}
            id="value"
            onChange={handleSelectChange('value')}
          />
        )}
        {one.value_type === 'Free text' && (
          <TextField
            label="Value"
            value={one.value || ''}
            type="text"
            id="value"
            handleChange={handleChange('value')}
            className="md:w-1/2 pb-4"
          />
        )}
        {one.value_type === 'Number' && (
          <TextField
            label="Value"
            value={one.value || ''}
            type="number"
            id="value"
            handleChange={handleChange('value')}
            className="md:w-1/2 pb-4"
          />
        )}
        {one.value_type === 'ck_editor' && (
          <div className="md:w-1/2 pb-4">
            <CKEditor
              description={one.value}
              valueKey="value"
              label="Value"
              setOneValue={props.setOneValue}
              error={errors.value}
            />
          </div>
        )}
        {one.value_type === 'Array' && (
          <Tags
            className="md:w-1/2 pb-4"
            handleAdd={insertTags}
            label="Value"
            value={tempVal || ''}
            handleRemove={handleDelete}
            handleChange={handleTempValue}
            tags={one.value}
          />
        )}
        <TextField
          label="Type"
          value={one.type || ''}
          type="text"
          id="type"
          handleChange={handleChange('type')}
          className="md:w-1/2 pb-4"
          error={errors && errors !== ''}
        />
        <TextField
          label="Sub Type"
          value={one.sub_type || ''}
          type="text"
          id="sub_type"
          handleChange={handleChange('sub_type')}
          className="md:w-1/2 pb-4"
        />
        <TextArea
          label="Description"
          id="description"
          type="text"
          value={one.description || ''}
          handleChange={handleChange('description')}
          className="md:w-1/2 pb-4"
        />
        <div className="flex gap-2">
          <Checkbox
            label="Is Active"
            checked={one.is_active || ''}
            name="is_active"
            handleChange={handleCheckedChange('is_active')}
          />
          <Checkbox
            label="Is Removable"
            checked={one.is_removable || ''}
            name="is_removable"
            handleChange={handleCheckedChange('is_removable')}
          />
        </div>
      </PageContent>
    </>
  );
};

GlobalSetting.propTypes = {
  loadOneRequest: PropTypes.func.isRequired,
  one: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
});

export default connect(mapStateToProps, {
  ...mapDispatchToProps,
  enqueueSnackbar,
})(GlobalSetting);

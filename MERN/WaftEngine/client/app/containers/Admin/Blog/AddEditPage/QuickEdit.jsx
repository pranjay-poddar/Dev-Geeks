import PropTypes from 'prop-types';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Checkbox from '../../../../components/Basic/Checkbox';
import DatePickerField from '../../../../components/Basic/Datepicker';
import SelectField from '../../../../components/Basic/Select';
import TextField from '../../../../components/Basic/TextField';

const QuickEdit = (props) => {
  const {
    handleCheckedChange,
    handleChange,
    handleDropDownChange,
    handleMultipleSelectCategoryChange,
    handlePublishedOn,
    handleMultipleSelectAuthorChange,
  } = props;
  const {
    one,
    category,
    users,
    tempTag,
    tempMetaTag,
    tempMetaKeyword,
    errors,
  } = props;

  const [startDate, setStartDate] = useState(new Date());

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
  const cats = {};
  category.map((e) => {
    cats[e._id] = e;
    return null;
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

  return (
    <>
      <div>
        <TextField
          className="w-full pb-4"
          handleChange={handleChange('title')}
          id="blog_title"
          type="text"
          value={(one && one.title) || ''}
          error={errors && errors.title}
          label="Title"
        />
        <SelectField
          className="w-full pb-4"
          label="Category"
          id="category"
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
          placeholder="Select Blog Category"
          options={listCategory}
          onChange={handleMultipleSelectCategoryChange}
          isSearchable
          isMulti
        />
        <DatePickerField
          label="Published On"
          dateFormat="Pp"
          className="w-full pb-4"
          showTimeSelect
          value={
            one.published_on !== '' && one.published_on !== null
              ? new Date(one.published_on)
              : ''
          }
          onChange={handlePublishedOn}
        />
        <SelectField
          className="w-full pb-4"
          label="Author"
          id="category"
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
          placeholder="Select Blog Author"
          options={listAuthor}
          onChange={handleMultipleSelectAuthorChange}
          isSearchable
          isMulti
          errors={errors && errors.author}
        />
        <Checkbox
          checked={one.is_active || false}
          handleChange={handleCheckedChange('is_active')}
          name="is_active"
          label="Is Active"
        />
        <Checkbox
          checked={one.is_published || false}
          handleChange={handleCheckedChange('is_published')}
          name="is_published"
          label="Is Published"
        />
      </div>
    </>
  );
};

QuickEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  one: PropTypes.object.isRequired,
  category: PropTypes.array,
  tempTag: PropTypes.string,
};

export default QuickEdit;

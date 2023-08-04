import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import {
  FaCheck,
  FaExternalLinkSquareAlt,
  FaSave,
  FaTimes,
  FaTrash,
} from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from '../../../../components/Basic/Button';
import Checkbox from '../../../../components/Basic/Checkbox';
import SelectField from '../../../../components/Basic/Select';
import TextField from '../../../../components/Basic/TextField';
import DeleteDialog from '../../../../components/DeleteDialog';
import Loading from '../../../../components/Loading';
import PageContent from '../../../../components/PageContent/PageContent';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import { useInjectReducer } from '../../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../../hooks/useInjectSaga';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectCategory,
  makeSelectErrors,
  makeSelectLoadChild,
  makeSelectLoading,
  makeSelectOne,
  makeSelectShowSubMenu,
  makeSelectSubMenu,
} from '../selectors';
import SidebarCategoriesList from './SideBarCategoriesList';

const key = 'menuManage';

const AddEdit = (props) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const navigate = useNavigate();
  const { id: routeID } = useParams();

  useEffect(() => {
    props.showSubMenu(false);
    props.clearErrors();
    props.clearOne();
    if (routeID && routeID) {
      props.loadOneRequest(routeID);
    }
  }, []);

  useEffect(() => {
    if (props.loadChild === true && props.one._id) {
      props.addEditRequest2();
    }
  }, [props.one]);

  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteId] = useState('');

  const handleOpen = (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    props.deleteMenuItemRequest(id);
    setOpen(false);
  };

  const handleCheckedChange = (name) => (event) => {
    event.persist();
    props.setOneValue({ key: name, value: event.target.checked });
  };

  const handleCheckedChildChange = (name) => (event) => {
    event.persist();
    props.setChildValue({ key: name, value: event.target.checked });
  };

  const handleChange = (name) => (event) => {
    event.persist();
    props.setOneValue({ key: name, value: event.target.value });
  };

  const handleChildChange = (name) => (event) => {
    props.setChildValue({ key: name, value: event.target.value });
    if (name === 'title') {
      const url = event.target.value
        .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ')
        .toLowerCase()
        .replace(/^\s+|\s+$/gm, '')
        .replace(/\s+/g, '-')
        .trim()
        .toLowerCase();
      props.setChildValue({ key: 'url', value: url });
    }
  };

  const handleChildDropChange = (name) => (event) => {
    props.setChildValue({ key: name, value: event.value });
  };

  const handleGoBack = () => {
    navigate('/admin/menu-manage');
  };

  const handleSave = () => {
    props.addEditRequest();
  };

  const handleChildSave = () => {
    props.addEditChildRequest();
    props.clearErrors();
  };

  const handleAddChildMenuSave = () => {
    props.addEditRequest2();
  };

  const handleTitleChange = (event) => {
    const {
      target: { value },
    } = event;
    props.setOneValue({ key: 'title', value });
    const url = value
      .trim()
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace('.', '')
      .replace('?', '')
      .replace('\\', '')
      .replace('/', '')
      .replace(',', '')
      .replace('*', '')
      .replace('+', '')
      .replace('(', '')
      .replace(')', '')
      .replace('!', '')
      .replace('#', '')
      .replace('@', '');
    props.setOneValue({ key: 'key', value: url });
  };

  const targetOptions = [
    { value: '_self', label: '_self' },
    { value: '_blank', label: '_blank' },
    { value: '_top', label: '_top' },
    { value: '_parent', label: '_parent' },
  ];

  let targetNormalized = {};

  let listTarget = targetOptions.map((each) => {
    let obj = {
      label: each.label,
      value: each.value,
    };

    targetNormalized = {
      ...targetNormalized,
      [each.value]: obj,
    };
    return obj;
  });

  const linkOptions = [
    { value: true, label: 'Same Site' },
    { value: false, label: 'Other Site' },
  ];

  let linkNormalized = {};

  let listLink = linkOptions.map((each) => {
    let obj = {
      label: each.label,
      value: each.value,
    };

    linkNormalized = {
      ...linkNormalized,
      [each.value]: obj,
    };

    return obj;
  });

  const {
    one,
    classes,
    match,
    loading,
    errors,
    subMenu,
    showSubMenuBool,
    category,
  } = props;

  const getCategoryDropDown = () => {
    let childContent = [];

    const resetChildContent = () => {
      childContent = [];
    };
    const getChildCategory = (parentObj, depth) => {
      if (parentObj.child_menu.length) {
        parentObj.child_menu.map((childElement) => {
          childContent.push(
            <option
              className="ml-2"
              key={childElement._id}
              disabled={depth >= 3}
              value={childElement._id}
            >
              {'-'.repeat(depth) + childElement.title}
            </option>,
          );
          if (childElement.child_menu && childElement.child_menu.length) {
            return getChildCategory(childElement, depth + 1);
          }
        });
        return childContent;
      }
      return [];
    };
    return (
      <select
        className="inputbox"
        value={subMenu.parent_menu}
        name="parent_category"
        onChange={handleChildChange('parent_menu')}
      >
        <option disabled="" value="">
          Parent Category
        </option>
        {category.map((each, index) => (
          <React.Fragment key={`${each._id}-${index}`}>
            <option key={each._id} disabled="" value={each._id}>
              {`${each.title}`}
            </option>
            {each.child_menu && each.child_menu.length > 0
              ? (resetChildContent(),
                getChildCategory(each, 1).map((eachChild) => eachChild))
              : null}
          </React.Fragment>
        ))}
      </select>
    );
  };

  return loading && loading == true ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>{routeID ? 'Edit Menu' : 'Add Menu'}</title>
      </Helmet>
      <div>
        <PageHeader
          title={
            routeID
              ? showSubMenuBool
                ? 'Edit Sub Menu'
                : 'Edit Menu'
              : showSubMenuBool
              ? 'Add Sub Menu'
              : 'Add Menu'
          }
          back="/admin/menu-manage"
          actions={
            <>
              <Button variant="secondary" onClick={handleGoBack}>
                <FaTimes /> Cancel
              </Button>
              {routeID ? (
                !showSubMenuBool ? (
                  <Button variant="success" onClick={handleAddChildMenuSave}>
                    <FaCheck /> Save Menu &amp; Continue
                  </Button>
                ) : (
                  <>
                    {subMenu._id !== '' && (
                      <Button
                        variant="error"
                        onClick={() => handleOpen(subMenu._id)}
                      >
                        <FaTrash />
                      </Button>
                    )}
                    <Button variant="success" onClick={handleChildSave}>
                      <FaCheck /> Save Menu
                    </Button>
                  </>
                )
              ) : (
                <Button variant="success" onClick={handleSave}>
                  <FaSave /> Save Menu
                </Button>
              )}
            </>
          }
        />

        <PageContent>
          <>
            {showSubMenuBool ? (
              <div>
                <div className="flex justify-between">
                  <div
                    className="-my-4 -ml-4 p-2 w-72 rounded-tl rounded-bl"
                    style={{ background: 'rgb(45, 52, 70)' }}
                  >
                    <SidebarCategoriesList />
                  </div>
                  <div className="flex-1 bg-white rounded ml-8 pb-4">
                    <div className="container mt-4">
                      <TextField
                        label="Title"
                        value={subMenu.title || ''}
                        handleChange={handleChildChange('title')}
                        error={
                          errors &&
                          errors.sub_menu_form &&
                          errors.sub_menu_form.title
                        }
                        className="md:w-1/2 pb-4"
                      />

                      <TextField
                        label="URL"
                        value={subMenu.url || ''}
                        handleChange={handleChildChange('url')}
                        error={
                          errors &&
                          errors.sub_menu_form &&
                          errors.sub_menu_form.url
                        }
                        className="md:w-1/2 pb-4"
                        append={
                          subMenu.url && (
                            <Link
                              to={`${subMenu.url}`}
                              className="cursor-pointer text-primary hover:text-primary text-xl"
                              target="_blank"
                            >
                              <FaExternalLinkSquareAlt />
                            </Link>
                          )
                        }
                      />
                      <TextField
                        label="Order"
                        value={subMenu.order || ''}
                        handleChange={handleChildChange('order')}
                        error={
                          errors &&
                          errors.sub_menu_form &&
                          errors.sub_menu_form.order
                        }
                        type="number"
                        className="md:w-1/2 pb-4"
                      />
                      <div className="md:w-1/2 pb-4">
                        {getCategoryDropDown()}
                        {errors &&
                          errors.sub_menu_form &&
                          errors.sub_menu_form.parent_menu && (
                            <div className="error">
                              {errors.sub_menu_form.parent_menu}
                            </div>
                          )}
                      </div>
                      <SelectField
                        className="md:w-1/2 pb-4"
                        label="Link Type"
                        id="product_type"
                        value={linkNormalized[subMenu.is_internal] || null}
                        onChange={handleChildDropChange('is_internal')}
                        placeholder="Select Link Type"
                        options={listLink}
                        errors={errors && errors.title}
                      />
                      <SelectField
                        className="md:w-1/2 pb-4"
                        label="Target"
                        id="product_type"
                        value={targetNormalized[subMenu.target] || null}
                        onChange={handleChildDropChange('target')}
                        placeholder="Select Target"
                        options={listTarget}
                        errors={errors && errors.title}
                      />
                      <Checkbox
                        label="Is Active"
                        handleChange={handleCheckedChildChange('is_active')}
                        checked={subMenu.is_active || false}
                        name="is_active"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <TextField
                  label="Title"
                  id="menu_title"
                  value={one.title || ''}
                  handleChange={handleTitleChange}
                  error={errors && errors.title}
                  type="text"
                  className="md:w-1/2 pb-4"
                />

                <TextField
                  label="Key"
                  id="menu_key"
                  value={one.key || ''}
                  handleChange={handleChange('key')}
                  error={errors && errors.key}
                  type="text"
                  className="md:w-1/2 pb-4"
                />
                <Checkbox
                  checked={one.is_active || false}
                  handleChange={handleCheckedChange('is_active', null)}
                  name="is_active"
                  label="Is Active"
                />
                {subMenu._id && (
                  <Button
                    variant="error"
                    onClick={() => handleOpen(subMenu._id)}
                  >
                    Delete
                  </Button>
                )}
              </>
            )}
          </>
          <DeleteDialog
            open={open}
            doClose={handleClose}
            doDelete={() => handleDelete(deleteID)}
          />
        </PageContent>
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  subMenu: makeSelectSubMenu(),
  showSubMenuBool: makeSelectShowSubMenu(),
  category: makeSelectCategory(),
  loadChild: makeSelectLoadChild(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEdit);

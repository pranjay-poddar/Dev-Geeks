import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaFile, FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Button from '../../../../components/Basic/Button';
import * as mapDispatchToProps from '../actions';
import { makeSelectCategory, makeSelectLoading } from '../selectors';

const SidebarCategoriesList = (props) => {
  const {
    category,
    loadOneCategoryRequest,
    loadMenuRequest,
    loading,
    setChildValue,
    setInnerStateValue,
    clearGeneralInfo,
    clearSubMenu,
  } = props;
  const [openSet, setOpenSet] = useState({});

  const handleSetClick = (key) => {
    setOpenSet({ ...openSet, [key]: !openSet[key] });
  };

  const handleClick = (id) => {
    clearSubMenu();
    loadMenuRequest(id);
  };

  const handleCollapse = () => {
    setOpenSet({});
  };

  const handleChange = (name, value) => {
    clearGeneralInfo();
    setInnerStateValue({ state: 'generalInfo', key: name, value });
  };

  const categoryFunction = (e, parentId = '') => (
    <ul key={`show-category-${e._id}-${parentId}`}>
      {e.child_menu && e.child_menu.length ? (
        <>
          <li
            key={`${e._id}-${parentId}`}
            className="py-2 px-4 cursor-pointer flex items-center capitalize text-gray-300 text-sm hover:text-white"
            onClick={() => handleSetClick(e._id)}
          >
            <div className="flex items-center cursor-pointer">
              <FaFile className="mr-2 text-sm text-white opacity-75" />
              {e.title}
            </div>
          </li>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              !openSet[e._id] ? 'max-h-0' : 'max-h-screen'
            }`}
          >
            <div className="list-reset pl-4 text-gray-300 hover:text-white">
              {e.child_menu.map((el) => (
                <div key={el._id}>{categoryFunction(el, e._id)}</div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {e._id !== '' && (
            <div
              onClick={() => handleClick(e._id)}
              className="py-2 px-4 cursor-pointer flex items-center capitalize text-gray-300 text-sm hover:text-white"
            >
              <FaFile className="mr-2 text-sm text-white opacity-75" />
              {`${e.title}`}
            </div>
          )}
        </>
      )}
    </ul>
  );

  return (
    <div>
      <Button
        className={'w-full'}
        variant={'primary'}
        onClick={() => clearSubMenu()}
      >
        <FaPlus /> Add New
      </Button>
      {category.length <= 0 ? (
        <h1 />
      ) : (
        category.map((e) => (
          <div className="rounded my-1 bg-gray-600" key={e._id}>
            {categoryFunction(e)}
          </div>
        ))
      )}
    </div>
  );
};

SidebarCategoriesList.propTypes = {
  category: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  category: makeSelectCategory(),
  loading: makeSelectLoading(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SidebarCategoriesList);

/**
 *
 * StaticMenu
 *
 */

import React, { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { loadMenuRequest } from '../../containers/App/actions';
import {
  makeSelectMenu,
  makeSelectUserIsAdmin,
} from '../../containers/App/selectors';
import './style.css';
import { useInjectReducer } from '../../hooks/useInjectReducer';
import { useInjectSaga } from '../../hooks/useInjectSaga';
import saga from '../../containers/App/saga';
import reducer from '../../containers/App/reducer';

/* eslint-disable react/prefer-stateless-function */
const StaticMenu = (props) => {
  useInjectReducer({ key: 'global', reducer: reducer });
  useInjectSaga({ key: 'global', saga: saga });
  const [state, setState] = useState({ checked: '' });

  const handleToggle = (value) => {
    state.checked !== value
      ? setState({ checked: value })
      : setState({ checked: '' });
  };

  useEffect(() => {
    if (props.menuObj[props.menuKey]) {
      return;
    }
    props.loadMenuRequest(props.menuKey);
  }, []);

  const getChildElement = (parentObj, depth) => {
    const childContent = [];
    if (parentObj.child_menu.length) {
      parentObj.child_menu.map((childElement) => {
        childContent.push(
          <li key={childElement._id}>
            <Link to={childElement.url} onClick={handleToggle}>
              {childElement.title}
            </Link>
            {childElement.child_menu && childElement.child_menu.length ? (
              <ul className="absolute">{getChildElement(childElement)}</ul>
            ) : null}
          </li>,
        );
      });
      return childContent;
    }
  };

  const { menuObj, isAdmin } = props;
  const data = menuObj[props.menuKey];
  if (!data) return null;
  return (
    <div className="container mx-auto w-full nav-bar">
      <div className="flex text-sm nav md:w-full md:text-center lg:w-auto lg:m-auto lg:border-t-0 lg:text-left fadeInDown animated">
        {data.map((each) => {
          if (each.is_internal) {
            return (
              <NavLink
                key={each._id}
                to={each.url}
                className="hidden md:block menu uppercase text-white text-center no-underline py-2 hover:bg-primary md:text-black md:hover:bg-transparent md:hover:text-primary md:mr-5"
                onClick={handleToggle}
              >
                {each.title}
                {each.child_menu && each.child_menu.length > 0 && (
                  <ul className="menu-child">{getChildElement(each, 1)}</ul>
                )}
              </NavLink>
            );
          }
          return (
            <a
              className="hidden md:block menu uppercase text-white text-center no-underline py-2 hover:bg-primary md:text-black md:hover:bg-transparent md:hover:text-primary md:mr-5"
              key={each._id}
              href={each.url}
              target={each.target}
            >
              {each.title}
            </a>
          );
        })}
        {isAdmin && (
          <Link
            to={`/admin/menu-manage/edit/${props.menuKey}`}
            className="text-lg mr-6"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-white shadow rounded-full absolute text-gray-600 hover:text-primary">
              <FaPen />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  menuObj: makeSelectMenu(),
  isAdmin: makeSelectUserIsAdmin(),
});

const mapDispatchToProps = (dispatch) => ({
  loadMenuRequest: (payload) => dispatch(loadMenuRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StaticMenu);

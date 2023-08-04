import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { connect } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import TextField from '../../../components/Basic/TextField';
import {
  makeSelectAccess,
  makeSelectLocation,
} from '../../../containers/App/selectors';
import menus from './sidemenu';
import './sidemenu.css';

const MainListItem = ({ location: { pathname }, access }) => {
  const [openSet, setOpenSet] = useState({});
  const [menuListing, setMenuListing] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchPath, setSearchPath] = useState('');

  const singleLevelArray = (menu) => {
    let tempMenus = [];
    for (let index = 0; index < menu.length; index++) {
      const element = menu[index];
      const item = {
        label: element.name,
        value: element.key,
        link: element.link,
        icon: element.icon,
      };
      if (element.menu && element.menu.length > 0) {
        const tempMenusNew = singleLevelArray(element.menu);
        tempMenus = [...tempMenus, ...tempMenusNew];
      } else {
        tempMenus = [...tempMenus, item];
      }
    }
    return tempMenus;
  };

  useEffect(() => {
    const newMenu = singleLevelArray(menus);
    setMenuListing(newMenu);
  }, [setMenuListing, menus]);

  const handleSetClick = (key) => {
    setOpenSet({ ...openSet, [key]: !openSet[key] });
    setInitialLoad(false);
  };

  const hasAccess = (link) => Object.keys(access).includes(link);

  const [initialLoad, setInitialLoad] = useState(true);

  const checkOpenRoute = (menu) => {
    let splitPath = [];
    if (initialLoad && searchPath !== '') {
      if (searchPath.includes(menu.link)) {
        splitPath = menu.key.split('.');
        // TODO make conditions dynamic
        if (splitPath.length === 2) {
          setOpenSet({ ...openSet, [splitPath[0]]: !openSet[splitPath[0]] });
          setInitialLoad(false);
        } else if (splitPath.length === 3) {
          setOpenSet({
            ...openSet,
            [splitPath[0]]: !openSet[splitPath[0]],
            [`${splitPath[0]}.${splitPath[1]}`]:
              !openSet[`${splitPath[0]}.${splitPath[1]}`],
          });
          setInitialLoad(false);
        }
      }
    }
    if (initialLoad) {
      if (pathname.includes(menu.link)) {
        splitPath = menu.key.split('.');
        // TODO make conditions dynamic
        if (splitPath.length === 2) {
          setOpenSet({ ...openSet, [splitPath[0]]: !openSet[splitPath[0]] });
          setInitialLoad(false);
        } else if (splitPath.length === 3) {
          setOpenSet({
            ...openSet,
            [splitPath[0]]: !openSet[splitPath[0]],
            [`${splitPath[0]}.${splitPath[1]}`]:
              !openSet[`${splitPath[0]}.${splitPath[1]}`],
          });
          setInitialLoad(false);
        }
      }
    }
  };

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = (event) => {
    setSearchTerm('');
    setSearchPath(event.link);
    setInitialLoad(true);
    setTimeout(checkOpenRoute(event), 2000);
  };

  const menuFunction = (e) => {
    let showChildren = false;
    if (e.menu) {
      // TODO: can be optimized to break when if condition is fulfilled
      e.menu.map((each) => {
        if (hasAccess(each.link)) {
          showChildren = true;
        }
      });
    }
    const isVisible = e.menu ? showChildren : hasAccess(e.link);
    if (!isVisible) return null;
    return (
      <div key={e.key}>
        {e.menu ? (
          <>
            <div
              key={e.key}
              className={`py-3 cursor-pointer flex items-center justify-between ease-in transition-opacity duration-100 opacity-75 hover:opacity-100 text-sm pl-${
                e.key.split('.').length * 4
              }`}
              onClick={() => handleSetClick(e.key)}
            >
              <div className="flex items-center">
                <span className="inline-block text-white">{e.icon}</span>
                <span className="dropdown-title text-white pl-4">{e.name}</span>
              </div>
              <FaAngleRight
                className={`text-sm text-white mr-4 transition-all duration-100 ease-in-out ${
                  openSet[e.key] === false || openSet[e.key] == undefined
                    ? ''
                    : 'rotate-90'
                }`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openSet[e.key] === false || openSet[e.key] == undefined
                  ? 'max-h-0'
                  : 'max-h-screen'
              }`}
            >
              {e.menu.map((el) => (
                <div key={el.key}>{menuFunction(el)}</div>
              ))}
            </div>
          </>
        ) : (
          <div
            selected={pathname === e.link}
            className={
              e.key.split('.').length && `pl-${e.key.split('.').length * 2}`
            }
            onClick={checkOpenRoute(e)}
          >
            <Link
              to={`${e.link}`}
              className={`menu-item text-gray-200 text-sm no-underline flex items-center ease-in transition-opacity duration-100 opacity-75 hover:opacity-100 py-3 pl-${
                e.key.split('.').length * 2
              }`}
            >
              <span className="inline-block">{e.icon}</span>
              <span className="pl-4">{e.name}</span>
            </Link>
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="select-none pt-20">
      <div className="mx-4">
        <TextField
          onChange={handleSearchTerm}
          placeholder="Search in Menu"
          value={searchTerm}
          inverted
        />
      </div>
      {searchTerm === '' ? (
        <>
          {menus.map((e) => (
            <div key={e.key}>{menuFunction(e)}</div>
          ))}
        </>
      ) : (
        menuListing
          .filter((each) =>
            each.label.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map((eachMenu) => (
            <div>
              <Link
                to={`${eachMenu.link}`}
                className={`menu-item px-4 text-white text-sm no-underline flex items-center ease-in transition-opacity duration-100 opacity-75 hover:opacity-100 py-2`}
                onClick={() => handleSearchClick(eachMenu)}
              >
                <span className="inline-block">{eachMenu.icon}</span>
                <span className="pl-4">{eachMenu.label}</span>
              </Link>
            </div>
          ))
      )}
    </div>
  );
};

MainListItem.propTypes = {
  location: PropTypes.object.isRequired,
  access: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  access: makeSelectAccess(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(MainListItem);

/**
 *
 * Breadcrumb
 *
 */

import { Link, useLocation } from 'react-router-dom';
import Crumb from './Crumb';

const Breadcrumb = ({ routeList, linkcomponent, onClick }) => {
  const { pathname } = useLocation();
  let breadcrumbs = [];
  if (routeList.length === 0) {
    const subPaths = pathname.split('/').filter((each) => !!each);
    let tempPathname = pathname;
    breadcrumbs = subPaths
      .map(() => {
        const breadcrumb = {
          path: `${tempPathname}`,
          label: tempPathname.substring(tempPathname.lastIndexOf('/') + 1),
        };
        tempPathname = tempPathname.substring(0, tempPathname.lastIndexOf('/'));
        return breadcrumb;
      })
      .reverse();
  } else {
    breadcrumbs = routeList;
  }

  const LinkComponent = linkcomponent;
  return (
    <div>
      <ol className="list-reset inline-flex text-gray-700 rounded text-sm items-center">
        {breadcrumbs.map((link, index) => {
          if (link.path === '/admin')
            return <Crumb key={link.path}>Home</Crumb>;
          if (link.path.endsWith('edit') || link.path.endsWith('access'))
            return null;
          return (
            <Crumb
              key={`${link.path}${index}`}
              isLast={index === breadcrumbs.length - 1}
            >
              <LinkComponent
                className="text-blue-700 no-underline hover:underline cursor-pointer capitalize"
                to={link.path}
                onClick={() => onClick(link)}
              >
                {link.label}
              </LinkComponent>
            </Crumb>
          );
        })}
      </ol>
    </div>
  );
};

Breadcrumb.defaultProps = {
  routeList: [],
  onClick: () => null,
  linkcomponent: Link,
};

export default Breadcrumb;

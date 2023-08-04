/**
 *
 * LinkBoth
 *
 */

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const isExternal = function (url) {
  const host = window.location.hostname;

  const linkHost = (function (url) {
    if (/^https?:\/\//.test(url)) {
      const parser = document.createElement('a');
      parser.href = url;

      return parser.hostname;
    }
    return window.location.hostname;
  })(url);

  return host !== linkHost;
};

const LinkBoth = (props) => {
  return isExternal(props.to) ? (
    <a target="_blank" href={props.to} {...props} />
  ) : (
    <Link {...props} />
  );
};

LinkBoth.propTypes = {
  to: PropTypes.string.isRequired,
};

export default LinkBoth;

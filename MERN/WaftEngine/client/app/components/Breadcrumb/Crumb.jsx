import PropTypes from 'prop-types';
import { FaAngleRight } from 'react-icons/fa';

export default function Crumb(props) {
  return (
    <>
      <li>{props.children}</li>
      {!props.isLast && (
        <li>
          <span className="flex items-center">
            <FaAngleRight />
          </span>
        </li>
      )}
    </>
  );
}

Crumb.propTypes = {
  children: PropTypes.node.isRequired,
};

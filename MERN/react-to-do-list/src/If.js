/**
 * Evaluate expression and return object or false.
 * It is used to replace ternary operations to make the JSX more readable and debuggable.
 * @param {boolean} test
 * @param {Object|boolean} children
 * @constructor
 */
const If = ({ test, children}) => test ? children: false;

export default If;

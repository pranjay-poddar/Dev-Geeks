import { memo } from 'react';
import ReactDOM from 'react-dom';

const Modal = memo(({ children }) => {
  const domEl = document.getElementById('modal-root');

  if (!domEl) return null;

  // This is where the magic happens -> our modal div will be rendered into our 'modal-root' div, no matter where we
  // use this component inside our React tree
  return ReactDOM.createPortal(<div>{children}</div>, domEl);
});

export default Modal;

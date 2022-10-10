import React from 'react';

const Header = (props)=> {
  return (
    <>
   <div className='header'>
    <h4 className='brand'><i className="fa fa-sticky-note" aria-hidden="true"></i> Take Notes</h4>
    <button 
    className="save" 
    onClick={()=> props.handleDarkMode(
      (previousDarkMode) => !previousDarkMode /* here we are passing the previousDarkMode state to check is it true or false to change the theme of website */
    )}>Toggle Mode</button>
   </div>
    </>
  );
}

export default Header;
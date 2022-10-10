import React from 'react';

const Notes = ( prop )=> {

  return (
    <>
    <div className='note'>
      <h5 className='note-title'>{prop.text}</h5>
      <div className='note-footer'>
        <small>{prop.date}</small>
        <i className="fa fa-trash-o" aria-hidden="true" onClick={()=> {
           prop.handleDeleteNote(prop.id) }}></i> {/* here we are passing the id of the note to be deleted. */}
      </div>
    </div>  
    </>
  );
}

export default Notes;
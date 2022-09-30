import React, {useContext} from 'react';
import { Row } from 'react-bootstrap';
import NotesDisplay from './NotesDisplay';
import { AuthContext } from '../../context/AuthContext';

export default function Main() {
  const {activeUser} = useContext(AuthContext);
  //  console.log("user in main", activeUser.email);

  return (
    <div>
      <Row className='m-5'>
        <NotesDisplay />
      </Row>
    </div>
  );
}

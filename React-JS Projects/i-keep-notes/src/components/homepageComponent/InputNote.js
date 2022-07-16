import React, { useState,useContext} from 'react';
import { Form, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { RiAddLine } from 'react-icons/ri';
import { Image, CloudinaryContext } from 'cloudinary-react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { getDatabase,ref, set } from "firebase/database";
import NotesDisplay from './NotesDisplay';


export default function InputNote() {
  
  const {activeUser} = useContext(AuthContext);
  const [title,setTitle] =useState('');
  const [Content,setContent] =useState('');
  
  
  const AddNote =() => {
 
    const db = getDatabase();
    const id =Math.round(Math.random()*100);
    set(ref(db,'notes/'+activeUser.uid+'/'+id), {
      id:id,
      title: title,
      Content: Content,
      Email:activeUser.email,
      Date:Date(Date.now).toString().substr(0,15)
    }).
    then(() => console.log("Added successfully")).
    catch(() => console.log("Error"));
    
    
 
  }
 
  const [addImg, setAddImg] = useState('');
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', addImg);
    formData.append('upload_preset', 'lmx0ng0b');
    await axios
      .post('https://api.cloudinary.com/v1_1/adarsh022/image/upload', {
        method: 'POST',
        body: formData,
      })
      .then((res) =>{});
  };

  return (
    <>
      <Card
        className='position-relative top-0 start-50 translate-middle-x  '
        style={{
          width: '50rem',
        }}
      >
        <Button
          className='position-absolute top-0 start-100 translate-middle rounded-circle p-0 border-0 btn-info'
          style={{ width: '2.5rem' }}
          onClick={AddNote} 
        >

          <RiAddLine size='1x' />
        </Button>
        <Card.Body>
          <InputGroup className='mb-3'>
            <FormControl
              placeholder='Title'
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onChange={(e) => setTitle(e.target.value)  }
            />
          </InputGroup>
          <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
            <Form.Control placeholder='Content' as='textarea' name='content' rows={3} onChange={(e) => setContent(e.target.value) }  />
          </Form.Group>
          <div
            className='d-flex justify-content-between input-group'
            style={{ backgroundColor: '#ffff' }}
          >
            <input
              type='file'
              id='inputGroupFile01'
              onChange={(e) => setAddImg(e.target.files[0])}
              aria-describedby='inputGroupFileAddon01'
            />
            <button
              className='input-group-text'
              id='inputGroupFileAddon01'
              onClick={uploadImage}
              disabled={addImg.length === 0 ? true : false}
              style={{ borderRadius: '5px' }}
            >
              Upload
            </button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

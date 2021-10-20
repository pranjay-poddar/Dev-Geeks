import React, { useState, useEffect, useContext, useRef } from 'react';
import Notes from './Notes';
import { RiAddLine, RiDeleteBack2Fill } from 'react-icons/ri';
import ReactReadMoreReadLess from 'react-read-more-read-less';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import {
  Row,
  Container,
  Button,
  Card,
  InputGroup,
  Modal,
  Spinner,
} from 'react-bootstrap';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { getDatabase, ref, set } from 'firebase/database';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

import { Form, FormControl, Dropdown, ButtonGroup } from 'react-bootstrap';

export default function NotesDisplay() {
  const [editModal, setEditModal] = useState(false);
  const [searchText, setSearch] = useState();
  const [data, setData] = useState([]);
  const { activeUser } = useContext(AuthContext);
  const uid = activeUser.uid;
  const [title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [newNote, setNewNote] = useState({});
  const [editItem, setEditItem] = useState({});
  let userNotesData = [];
  const [addImg, setAddImg] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [deleteModal, setDeleteModal] = useState({});
  const [delImg, setDelImg] = useState(false);
  const [sort, setSort] = useState(false);
  const [loading, setloading] = useState(false);
  const [readMore, setReadMore] = useState({});
  let imagesId = '';

  const fileInput = useRef();

  function compare(a, b) {
    if (sort) {
      let ContentA = a.title.toUpperCase();
      let ContentB = b.title.toUpperCase();
      return ContentA < ContentB ? -1 : ContentA > ContentB ? 1 : 0;
    } else {
      const DateA = a.Date;
      const DateB = b.Date;

      let comparison = 0;
      if (DateA < DateB) {
        comparison = 1;
      } else if (DateA > DateB) {
        comparison = -1;
      }
      return comparison;
    } // Use toUpperCase() to ignore character casing
  }

  const UpdateNote = () => {
    const title = editTitle ? editTitle : editItem.title;
    const Content = editContent ? editContent : editItem.Content;
    const userId = editItem.id;

    const updatedNote = {
      id: editItem.id,
      title: title,
      Content: Content,
      Email: editItem.Email,
      Date: editItem.Date,
      img: delImg ? '' : editItem.img,
    };
    axios
      .put(
        'https://rlogixnoteapp-default-rtdb.firebaseio.com/notes/' +
          uid +
          '/' +
          userId +
          '.json',
        updatedNote
      )
      .then(
        () => (setNewNote(updatedNote), setEditContent(''), setEditTitle(''))
      )
      .catch(() => console.log('Error'));
    setEditItem({});
    setDelImg(false);
  };

  const UpdateNewNote = () => {
    axios
      .get(
        'https://rlogixnoteapp-default-rtdb.firebaseio.com/notes/' +
          uid +
          '.json'
      )
      .then((res) => {
        setData(res.data);
      });
  };

  const AddNote = () => {
    const db = getDatabase();
    const id = Math.round(Math.random() * 100);

    set(ref(db, 'notes/' + activeUser.uid + '/' + id), {
      id: id,
      title: title,
      Content: Content,
      Email: activeUser.email,
      Date: Date(Date.now).toString().substr(0, 24),
      img: imagesId
        ? imagesId
        : 'https://res.cloudinary.com/adarsh022/image/upload/v1632991217/iKeep/pblfmxmj3oxp3y8mqb91.jpg',
    })
      .then(
        setNewNote({
          id: id,
          title: title,
          Content: Content,
          Email: activeUser,
          Date: Date(Date.now).toString().substr(0, 15),
        })
      )
      .then(() => {
        UpdateNewNote();
        setTitle('');
        setContent('');
        setAddImg('');
        imagesId = '';
        setloading(false);
        fileInput.current.value = '';
      })
      .catch(() => console.log('Error'));
  };

  const uploadImage = async () => {
    setloading(true);
    if (title === '' || Content === '') {
      toast.error('Fields Empty', {
        autoClose: 5000,
        hideProgressBar: false,
        draggable: false,
        progress: undefined,
        position: 'top-right',
        pauseOnHover: true,
        closeOnClick: true,
      });
      setloading(false);
    } else {
      if (addImg) {
        const formData = new FormData();
        formData.append('file', addImg);
        formData.append('upload_preset', 'lmx0ng0b');
        await axios
          .post(
            'https://api.cloudinary.com/v1_1/adarsh022/image/upload',
            formData
          )
          .then((res) => {
            imagesId = res.data.url;
          });
      }
      AddNote();
    }
  };

  const Delete = () => {
    const id = deleteModal.id;

    axios
      .delete(
        'https://rlogixnoteapp-default-rtdb.firebaseio.com/notes/' +
          uid +
          '/' +
          id +
          '.json'
      )
      .then(() => setNewNote({ delete: true }))
      .catch(() => console.log('Error Occurred'));
    setDeleteModal({});
  };

  useEffect(() => {
    axios
      .get(
        'https://rlogixnoteapp-default-rtdb.firebaseio.com/notes/' +
          uid +
          '.json'
      )
      .then((res) => {
        setData(res.data);
      });
  }, [newNote]);

  //   useEffect(() => {
  //  axios
  //       .get("https://react-project-1443c-default-rtdb.firebaseio.com/notes.json")
  //       .then((res) => setData(res.data));
  //   }, []);

  let userNotes = [];
  let a = data
    ? Object.keys(data).map((item) => userNotes.push(data[item]))
    : '';
  userNotes.sort(compare);

  const [filteredData, setFilteredData] = useState(userNotes);

  useEffect(() => {
    const lowercasedValue = searchText?.toLowerCase().trim();
    if (lowercasedValue === '') setFilteredData(userNotes);
    else {
      const filteredData = userNotes.filter((item) =>
        item
          ? item.title.includes(searchText) || item.Content.includes(searchText)
          : ''
      );
      setFilteredData(filteredData);
    }
  }, [searchText]);

  {
    userNotes.length > 0 ? (
      filteredData.length > 0 ? (
        (userNotesData = filteredData)
      ) : (
        (userNotesData = userNotes)
      )
    ) : (
      <p>No results found..</p>
    );
  }

  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const today = userNotesData
    ? userNotesData.filter((item, key) =>
        item
          ? item.Date.substr(0, 15) === Date(Date.now).toString().substr(0, 15)
          : ''
      )
    : '';

  const yesDay = (
    days[new Date().getDay()] === 'Sunday'
      ? 'Saturday'
      : days[new Date().getDay() - 1]
  ).substr(0, 3);
  const yesMon = monthNames[new Date().getMonth()].substr(0, 3);
  const yesYear = new Date().getFullYear();
  const yesDate = new Date().getDate() - 1;

  const yesterday =
    Math.floor(yesDate / 10) == 0
      ? yesDay + ' ' + yesMon + ' ' + '0' + yesDate + ' ' + yesYear
      : yesDay + ' ' + yesMon + ' ' + yesDate + ' ' + yesYear;

  const yesterdayuserNotesData = userNotesData
    ? userNotesData.filter((item, key) => item.Date.substr(0, 15) === yesterday)
    : '';
  const EarlieruserNotesData = userNotesData
    ? userNotesData.filter((item, key) =>
        item
          ? item.Date.substr(0, 15) != yesterday &&
            item.Date.substr(0, 15) != Date(Date.now).toString().substr(0, 15)
          : ''
      )
    : '';
  return (
    <>
      <Container>
        {/* /////////////////// */}
        <Modal show={Object.keys(readMore).length > 0}>
          {' '}
          {readMore.img && (
            <div
              style={{ paddingTop: '16px' }}
              className='d-flex justify-content-center align-item-center'
            >
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                }}
                cloudName='adarsh022'
                publicId={readMore.img}
              />
            </div>
          )}
          <Modal.Header>
            <Modal.Title style={{ width: '100%' }}>
              <p style={{ fontWeight: 'bold' }}>Title</p>
              <p className='pp-break'>{readMore.title}</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ fontWeight: 'bold' }}>Content</p>
            <p className='pp-break'>{readMore.Content}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setReadMore({})}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* /////////////////// */}
        <Row>
          <div className='d-flex justify-content-center'>
            <Form
              className='d-flex justify-content-around p-0 mb-5'
              style={{
                width: '50rem',
              }}
            >
              <FormControl
                type='search'
                placeholder='Search'
                aria-label='Search '
                aria-describedby='basic-addon2'
                onChange={(e) => setSearch(e.target.value)}
                style={{ maxWidth: '500px' }}
              />
              <Dropdown style={{ margin: '0px 10px' }} as={ButtonGroup}>
                <Button variant='outline-info'>
                  {sort ? 'Alphabetical Wise' : 'Date Wise'}
                </Button>

                <Dropdown.Toggle
                  split
                  variant='outline-info'
                  id='dropdown-split-basic'
                />

                <Dropdown.Menu>
                  <Dropdown.Item
                    href='#/action-1'
                    onClick={() => setSort(false)}
                  >
                    Date Wise
                  </Dropdown.Item>
                  <Dropdown.Item
                    href='#/action-2'
                    onClick={() => setSort(true)}
                  >
                    Alphabetical Wise
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form>
          </div>
        </Row>
        <Row>
          <Card
            className='position-relative top-0 start-50 translate-middle-x  '
            style={{
              width: '50rem',
            }}
          >
            <Button
              className='position-absolute top-0 start-100 translate-middle rounded-circle p-0 border-0 '
              variant='primary'
              style={{ width: '2.5rem' }}
              onClick={uploadImage}
            >
              <RiAddLine
                variant='primary'
                className='btn-info'
                style={{ borderRadius: '50px' }}
                size='1x'
              />
            </Button>
            <Card.Body>
              <InputGroup className='mb-3'>
                <FormControl
                  placeholder='Title'
                  aria-label='Default'
                  value={title}
                  aria-describedby='inputGroup-sizing-default'
                  onChange={(e) => setTitle(e.target.value)}
                />
              </InputGroup>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlTextarea1'
              >
                <Form.Control
                  placeholder='Content'
                  as='textarea'
                  name='content'
                  value={Content}
                  rows={3}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>

              <div
                className='d-flex justify-content-between input-group'
                style={{ backgroundColor: '#ffff' }}
              >
                <input
                  type='file'
                  ref={fileInput}
                  id='inputGroupFile01'
                  onChange={(e) => setAddImg(e.target.files[0])}
                  aria-describedby='inputGroupFileAddon01'
                />
              </div>
            </Card.Body>
          </Card>
        </Row>
        <Row className='d-flex flex-row justify-content-center mt-3'></Row>
      </Container>
      {/* displaying input notes */}
      {userNotesData.length > 0 ? (
        <div className='row d-flex justify-content-around mt-2 p-0'>
          {today.length > 0 ? (
            <div className='d-flex'>
              <h4
                className='text-decoration-underline'
                style={{ textAlign: 'left' }}
              >
                Today
              </h4>
              {loading ? (
                <Spinner
                  animation='border'
                  size='lg'
                  style={{ marginLeft: '2rem' }}
                />
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
          <Modal show={Object.keys(deleteModal).length > 0}>
            <Modal.Header>
              <Modal.Title>
                Are you sure that you want to delete this note ?{' '}
              </Modal.Title>
              <Button variant='secondary' onClick={() => setDeleteModal({})}>
                Cancel
              </Button>
              <Button variant='primary' className='btn-info' onClick={Delete}>
                Delete
              </Button>
            </Modal.Header>
          </Modal>

          <Modal show={Object.keys(editItem).length > 0}>
            {' '}
            {editItem.img && (
              <div
                style={{ paddingTop: '16px' }}
                className='d-flex justify-content-center align-item-center'
              >
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  cloudName='adarsh022'
                  publicId={editItem.img}
                />
              </div>
            )}
            <Modal.Header>
              <Modal.Title style={{ width: '100%' }}>
                <p style={{ fontWeight: 'bold' }}>Title</p>
                <textarea
                  style={{ width: '100%' }}
                  onChange={(e) => setEditTitle(e.target.value)}
                >
                  {editItem.title}
                </textarea>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{ fontWeight: 'bold' }}>Content</p>

              <textarea
                style={{ width: '100%' }}
                cols='48'
                rows='10'
                onChange={(e) => setEditContent(e.target.value)}
              >
                {editItem.Content}
              </textarea>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={() => setEditItem({})}>
                Close
              </Button>
              <Button
                variant='primary'
                className='btn-info'
                onClick={UpdateNote}
              >
                Save changes
              </Button>
            </Modal.Footer>
          </Modal>
          {today
            ? today.map((item, index) =>
                item ? (
                  <React.Fragment key={index}>
                    <Card
                      style={{
                        width: 'auto',
                        borderRadius: '15px',
                        height: 'auto',
                      }}
                      className='m-1 p-0'
                    >
                      <Card.Body className=' d-flex  justify-content-center align-item-center'>
                        {item.img && (
                          <Image
                            style={{
                              width: '150px',
                            }}
                            cloudName='adarsh022'
                            publicId={item.img}
                          />
                        )}
                        <div
                          style={{ marginLeft: '16px' }}
                          className='d-grid  justify-content-center align-item-center'
                        >
                          <div className='  p-0 ' style={{ maxWidth: '225px' }}>
                            <Card.Title className='p-0'>
                              <strong> {item.title}</strong>
                            </Card.Title>
                            <Card.Text className='p-0'>
                              {/* <ReactReadMoreReadLess
                                charLimit={45}
                                readMoreText={'Read more ▼'}
                                readLessText={'Read less ▲'}
                                readMoreClassName='read-more-less--more'
                                readLessClassName='read-more-less--less'
                              > */}

                              {
                                (a =
                                  item.Content.length > 20
                                    ? item.Content.slice(0, 20) + '...'
                                    : item.Content.slice(0, 20))
                              }
                              {/* {a} */}
                              {/* {item.Content.length > 20 ? { a } + '...' : { a }} */}
                              {/* </ReactReadMoreReadLess> */}
                            </Card.Text>
                            <Card.Text>
                              <strong> {item.Date.substr(0, 15)}</strong>
                            </Card.Text>
                          </div>
                          <div
                            className='d-flex justify-content-around '
                            style={{ width: '100%' }}
                          >
                            <Card.Link
                              href='#'
                              onClick={() => setDeleteModal({ id: item.id })}
                            >
                              Delete
                            </Card.Link>
                            {item.Content.length > 20 && (
                              <Card.Link
                                href='#'
                                onClick={() => setReadMore(item)}
                              >
                                Show More
                              </Card.Link>
                            )}
                            <Card.Link
                              href='#'
                              onClick={() => setEditItem(item)}
                            >
                              Edit
                            </Card.Link>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </React.Fragment>
                ) : (
                  ''
                )
              )
            : ''}
          {yesterdayuserNotesData.length > 0 ? (
            <h4
              className='text-decoration-underline'
              style={{ textAlign: 'left' }}
            >
              Yesterday
            </h4>
          ) : (
            ''
          )}

          {yesterdayuserNotesData.map((item, index) =>
            item ? (
              <React.Fragment key={index}>
                <Card
                  style={{
                    width: 'auto',
                    borderRadius: '15px',
                    height: 'auto',
                  }}
                  className='m-1 p-0'
                >
                  <Card.Body className=' d-flex  justify-content-center align-item-center'>
                    {item.img && (
                      <Image
                        style={{
                          width: '150px',
                        }}
                        cloudName='adarsh022'
                        publicId={item.img}
                      />
                    )}
                    <div
                      style={{ marginLeft: '16px' }}
                      className='d-grid  justify-content-center align-item-center'
                    >
                      <div className='  p-0 ' style={{ maxWidth: '225px' }}>
                        <Card.Title className='p-0'>
                          <strong> {item.title}</strong>
                        </Card.Title>
                        <Card.Text className='p-0'>
                          {
                            (a =
                              item.Content.length > 20
                                ? item.Content.slice(0, 60) + '...'
                                : item.Content.slice(0, 60))
                          }
                        </Card.Text>
                        <Card.Text>
                          <strong> {item.Date.substr(0, 15)}</strong>
                        </Card.Text>
                      </div>
                      <div
                        className='d-flex justify-content-around '
                        style={{ width: '100%' }}
                      >
                        <Card.Link
                          href='#'
                          onClick={() => setDeleteModal({ id: item.id })}
                        >
                          Delete
                        </Card.Link>
                        {item.Content.length > 20 && (
                          <Card.Link href='#' onClick={() => setReadMore(item)}>
                            Show More
                          </Card.Link>
                        )}
                        <Card.Link href='#' onClick={() => setEditItem(item)}>
                          Edit
                        </Card.Link>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </React.Fragment>
            ) : (
              ''
            )
          )}

          {EarlieruserNotesData.length > 0 ? (
            <h4
              className='text-decoration-underline'
              style={{ textAlign: 'left' }}
            >
              Earlier Notes
            </h4>
          ) : (
            ''
          )}
          {EarlieruserNotesData.map((item, index) =>
            item ? (
              <React.Fragment key={index}>
                <Card
                  style={{
                    width: 'auto',
                    borderRadius: '15px',
                    height: 'auto',
                  }}
                  className='m-1 p-0'
                >
                  <Card.Body className=' d-flex  justify-content-center align-item-center'>
                    {item.img && (
                      <Image
                        style={{
                          width: '150px',
                        }}
                        cloudName='adarsh022'
                        publicId={item.img}
                      />
                    )}
                    <div
                      style={{ marginLeft: '16px' }}
                      className='d-grid  justify-content-center align-item-center'
                    >
                      <div className='  p-0 ' style={{ maxWidth: '225px' }}>
                        <Card.Title className='p-0'>
                          <strong> {item.title}</strong>
                        </Card.Title>
                        <Card.Text className='p-0'>
                          {
                            (a =
                              item.Content.length > 20
                                ? item.Content.slice(0, 60) + '...'
                                : item.Content.slice(0, 60))
                          }
                        </Card.Text>
                        <Card.Text>
                          <strong> {item.Date.substr(0, 15)}</strong>
                        </Card.Text>
                      </div>
                      <div
                        className='d-flex justify-content-around '
                        style={{ width: '100%' }}
                      >
                        <Card.Link
                          href='#'
                          onClick={() => setDeleteModal({ id: item.id })}
                        >
                          Delete
                        </Card.Link>
                        {item.Content.length > 20 && (
                          <Card.Link href='#' onClick={() => setReadMore(item)}>
                            Show More
                          </Card.Link>
                        )}
                        <Card.Link href='#' onClick={() => setEditItem(item)}>
                          Edit
                        </Card.Link>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </React.Fragment>
            ) : (
              ''
            )
          )}
        </div>
      ) : (
        ''
      )}
      {userNotesData.length > 0 ? (
        ''
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '100px',
          }}
        >
          <strong>
            {loading ? (
              <Spinner
                animation='border'
                size='lg'
                style={{ marginLeft: '2rem' }}
              />
            ) : (
              <h1>No Notes to Display</h1>
            )}
          </strong>
        </div>
      )}
    </>
  );
}

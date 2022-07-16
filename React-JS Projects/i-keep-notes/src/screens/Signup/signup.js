import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Container, Col, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './signup.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Typeahead, TypeaheadMenu } from 'react-bootstrap-typeahead';
import user from '../../assets/iCons/user.png';
import passwordimg from '../../assets/iCons/password.png';
import mobile from '../../assets/iCons/phone.png';
import mailimg from '../../assets/iCons/mail.png';
import stateImg from '../../assets/iCons/state.png';
import countryImg from '../../assets/iCons/globe.png';
import zipImg from '../../assets/iCons/zip.png';

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  // updatePhoneNumber,
} from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

export default function Signup() {
  const history = useHistory();
  const auth = getAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [zip, setZip] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [pincodes, setPincodes] = useState([]);
  const validEmail = new RegExp('@gmail.com$');
  const [selected, setSelected] = useState([]);
  let flag = true;

  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character

  const validPassword = new RegExp(
    '^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,16}$'
  );

  function phoneNumberCheck(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      if (e.target.value.length < 11) {
        setPhone(e.target.value);
      }
    }
  }

  // function zipCodeCheck(e) {
  //   const re = /^[0-9\b]+$/;
  //   if (e.target.value === "" || re.test(e.target.value)) {
  //     if (e.target.value.length < 7) {
  //       setZip(e.target.value);
  //     }
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (
      name &&
      password &&
      phone &&
      email &&
      validPassword.test(password) &&
      validEmail.test(email)
    ) {
      setLoading(true);
      ////////local storage///////

      let a = [];
      a = JSON.parse(localStorage.getItem('session')) || [];
      let b = a.map((item) => {
        if (item.Phone === phone) {
          setError('Mobile Number already exist');
          setLoading(false);
          flag = false;
        } else {
          flag = true;
        }
      });
      if (flag == true) {
        ////////local storage///////
        try {
          await createUserWithEmailAndPassword(auth, email, password).then(
            (userCredential) => {
              // Signed in
              const user = userCredential.user;
              // ...
              toast.success('New User Account Created', {
                autoClose: 5000,
                hideProgressBar: false,
                draggable: false,
                progress: undefined,
                position: 'top-right',
                pauseOnHover: true,
                closeOnClick: true,
              });
              a.push({ Email: email, Phone: phone });
              localStorage.setItem('session', JSON.stringify(a));
              history.push('/');
            }
          );
          updateProfile(auth.currentUser, {
            displayName: name,
          });
          ////////local storage///////
          // let a = [];
          // a = JSON.parse(localStorage.getItem('session')) || [];
          // a.push({ Email: email, Phone: phone });
          // localStorage.setItem('session', JSON.stringify(a));
          ////////local storage///////
        } catch (error) {
          const errorMessage = error.message.slice(22, 42);
          setError(errorMessage);
          setLoading(false);
        }
      }
      setLoading(false);
    } else {
      setError('Please fill all the Fields');
    }
  };

  useEffect(() => {
    axios
      .get(
        'https://rlogixx-33270-default-rtdb.firebaseio.com/zipcode_details.json'
      )
      .then((res) => {
        setPincodes(res.data);
      });
  }, [pincodes.length]);

  return (
    <>
      <div className='form mt-4'>
        <Form className='contain mx-auto p-4 '>
          <h3 className='d-flex justify-content-center mb-3'>SignUp</h3>
          <Container>
            {error && (
              <div className='d-flex justify-content-center align-item-center'>
                <Alert
                  style={{
                    textAlign: 'center',
                    maxWidth: '15rem',
                    padding: '.5rem',
                  }}
                  variant='danger'
                >
                  {error}
                </Alert>
              </div>
            )}

            <Form.Group className='mb-3'>
              <Row className='justify-content-center'>
                <Form.Label column sm='4'>
                  Username
                </Form.Label>
                <Col sm='1'>
                  <img
                    src={user}
                    width='30'
                    height='30'
                    className='d-inline-block align-bottom text-danger'
                    alt='Logo'
                  />
                </Col>
                <Col>
                  <Row>
                    {' '}
                    <Form.Control
                      type='text'
                      placeholder='Enter Username'
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Row>

                  <Row sm='8'>
                    {name.length === 0 && (
                      <p
                        style={{
                          textAlign: 'left',
                          color: 'red',
                          fontSize: '10px',
                          marginBottom: '5px',
                        }}
                      >
                        *Enter Username
                      </p>
                    )}
                  </Row>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Row className='justify-content-center'>
                <Form.Label column sm='4'>
                  Password
                </Form.Label>

                <Col sm='1'>
                  <img
                    src={passwordimg}
                    width='30'
                    height='30'
                    className='d-inline-block align-bottom text-danger'
                    alt='Logo'
                  />
                </Col>
                <Col>
                  <Row>
                    {' '}
                    <Form.Control
                      type='password'
                      placeholder='Enter Password'
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Row>

                  <Row sm='8'>
                    {!validPassword.test(password) && (
                      <p
                        style={{
                          textAlign: 'left',
                          color: 'red',
                          fontSize: '10px',
                          marginBottom: '5px',
                        }}
                      >
                        *Minimum eight characters, at least one uppercase
                        letter, one lowercase letter, one number and one special
                        character
                      </p>
                    )}
                  </Row>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Row className='justify-content-center'>
                <Form.Label column sm='4'>
                  Mobile Number
                </Form.Label>

                <Col sm='1'>
                  <img
                    src={mobile}
                    width='30'
                    height='30'
                    className='d-inline-block align-bottom text-danger'
                    alt='Logo'
                  />
                </Col>
                <Col>
                  <Row>
                    {' '}
                    <Form.Control
                      type='text'
                      placeholder='Enter Mobile Number'
                      value={phone}
                      required
                      onChange={phoneNumberCheck}
                    />
                  </Row>

                  <Row sm='8'>
                    {phone.length !== 10 && (
                      <p
                        style={{
                          textAlign: 'left',
                          color: 'red',
                          fontSize: '10px',
                          marginBottom: '5px',
                        }}
                      >
                        *Please enter 10 digit Mobile Number
                      </p>
                    )}
                  </Row>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Row className='justify-content-center'>
                <Form.Label column sm='4'>
                  E-mail
                </Form.Label>

                <Col sm='1'>
                  <img
                    src={mailimg}
                    width='30'
                    height='30'
                    className='d-inline-block align-bottom text-danger'
                    alt='Logo'
                  />
                </Col>
                <Col>
                  <Row>
                    {' '}
                    <Form.Control
                      type='text'
                      required
                      placeholder='Enter E-mail'
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Row>

                  <Row sm='8'>
                    {!validEmail.test(email) && (
                      <p
                        style={{
                          textAlign: 'left',
                          color: 'red',
                          fontSize: '10px',
                          marginBottom: '5px',
                        }}
                      >
                        *Only gmail domains are allowed
                      </p>
                    )}
                  </Row>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Row>
                <Col className='justify-content-center' sm='4'>
                  <Form.Label>Gender</Form.Label>
                </Col>
                <Col className='d-flex gender'>
                  <Col sm='2'>
                    <Form.Check
                      type='radio'
                      name='Gender'
                      label='M'
                      value='male'
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </Col>
                  <Col sm='2  '>
                    <Form.Check
                      type='radio'
                      name='Gender'
                      label='F'
                      value='female'
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </Col>
                  <Col sm='2'>
                    <Form.Check
                      type='radio'
                      name='Gender'
                      label='Others'
                      value='others'
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </Col>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Row className='justify-content-center'>
                <Form.Label column sm='4'>
                  Zip Code
                </Form.Label>

                <Col sm='1'>
                  <img
                    src={zipImg}
                    width='30'
                    height='30'
                    className='d-inline-block align-bottom text-danger'
                    alt='Logo'
                  />
                </Col>

                <Col className='typeahead'>
                  {' '}
                  <Typeahead
                    id='basic-example'
                    onChange={setSelected}
                    labelKey={(option, i) => `${Object.keys(option)}`}
                    options={pincodes}
                    placeholder='Enter pincode'
                    selected={selected}
                    value={zip}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Row className='justify-content-center'>
                <Form.Label column sm='4'>
                  State
                </Form.Label>

                <Col sm='1'>
                  <img
                    src={stateImg}
                    width='30'
                    height='30'
                    className='d-inline-block align-bottom text-danger'
                    alt='Logo'
                  />
                </Col>
                <Col>
                  <Row>
                    {' '}
                    <Form.Control
                      type='text'
                      placeholder='Enter State'
                      required
                      readOnly
                      value={
                        selected?.length > 0
                          ? selected[0][
                              Object.getOwnPropertyNames(
                                selected[Object.keys(selected)]
                              )[0]
                            ].state
                          : ''
                      }
                    />
                  </Row>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Row className='justify-content-center'>
                <Form.Label column sm='4'>
                  Country
                </Form.Label>

                <Col sm='1'>
                  <img
                    src={countryImg}
                    width='30'
                    height='30'
                    className='d-inline-block align-bottom text-danger'
                    alt='Logo'
                  />
                </Col>
                <Col>
                  <Row>
                    {' '}
                    <Form.Control
                      type='text'
                      placeholder='Enter Country'
                      required
                      readOnly
                      value={
                        selected?.length > 0
                          ? selected[0][
                              Object.getOwnPropertyNames(
                                selected[Object.keys(selected)]
                              )[0]
                            ].country
                          : ''
                      }
                    />
                  </Row>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Row className='justify-content-start '>
                <Col sm='4'></Col>
                <Col sm={8} className='d-flex justify-content-start'>
                  <Button
                    type='submit'
                    className=' btn-info  m-0'
                    disabled={loading}
                    onClick={(e) => handleSubmit(e)}
                  >
                    Register
                  </Button>
                </Col>
              </Row>
            </Form.Group>

            <p className='link'>
              Already have an account?{' '}
              <Link to='/' className='text-info'>
                Login
              </Link>
            </p>
          </Container>
        </Form>
      </div>
    </>
  );
}

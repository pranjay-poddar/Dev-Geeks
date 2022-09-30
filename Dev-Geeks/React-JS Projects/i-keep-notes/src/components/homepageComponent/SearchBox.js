import React, {useState} from 'react';
import {
  Form,
  Button,
  FormControl,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';

export default function SearchBox() {
  const [searchText, setSearch] = useState();
  return (
    <>
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
            onChange={e => setSearch(e.target.value)}
            style={{ maxWidth: '500px' }}
          />
          <Dropdown style={{ margin: '0px 10px' }} as={ButtonGroup}>
            <Button variant='outline-info'>Sort</Button>

            <Dropdown.Toggle
              split
              variant='outline-info'
              id='dropdown-split-basic'
            />

            <Dropdown.Menu>
              <Dropdown.Item href='#/action-1'>Date Wise</Dropdown.Item>
              <Dropdown.Item href='#/action-2'>Alphabetical Wise</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant='outline-success'>Save</Button>{' '}
        </Form>
      </div>
    </>
  );
}

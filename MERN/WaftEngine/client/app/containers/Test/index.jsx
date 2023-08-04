import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Table from '../../components/Table/NewTable';
import Button from '../../components/Basic/Button';
import { Edit, Delete, Add } from '../../components/Table/commons';
import TextFiled from '../../components/Basic/TextField';
import { useState } from 'react';

const StaticPage = () => {
  const { key } = useParams();

  const data = [
    {
      meta_tag: [],
      is_active: false,
      is_page: false,
      is_removal: true,
      _id: '625ceef054691f2ff42e892c',
      name: 'test3',
      key: 'rest3',
      description: '<p>test3</p>',
      publish_from: null,
      publish_to: null,
      added_by: '5c3b244f9ef510172cd1dcb0',
      added_at: '2022-04-18T04:54:08.861Z',
    },
    {
      meta_tag: [],
      is_active: false,
      is_page: false,
      is_removal: true,
      _id: '625ceee854691f2ff42e8919',
      name: 'test',
      key: 'test2',
      description: '<p>test</p>',
      publish_from: null,
      publish_to: null,
      added_by: '5c3b244f9ef510172cd1dcb0',
      added_at: '2022-04-18T04:54:00.757Z',
    },
    {
      meta_tag: [],
      is_active: false,
      is_page: false,
      is_removal: true,
      _id: '625ceef054691f2ff42e892c',
      name: 'test3',
      key: 'rest3',
      description: '<p>test3</p>',
      publish_from: null,
      publish_to: null,
      added_by: '5c3b244f9ef510172cd1dcb0',
      added_at: '2022-04-18T04:54:08.861Z',
    },
    {
      meta_tag: [],
      is_active: false,
      is_page: true,
      is_removal: true,
      _id: '625ceee854691f2ff42e8919',
      name: 'test',
      key: 'test2',
      description: '<p>test description</p>',
      publish_from: null,
      publish_to: null,
      added_by: '5c3b244f9ef510172cd1dcb0',
      added_at: '2022-04-18T04:54:00.757Z',
    },
  ];

  const keys = [
    { key: 'name', show: true },
    { key: 'key', show: true },
    { key: 'is_page', show: true },
    { key: 'description', show: true },
    { key: 'is_active', show: true },
  ];
  const tableData = data.map(
    ({ name, key, is_active, description, is_page, _id }) => [
      { for: 'name', value: name },
      { for: 'key', value: key },
      {
        for: 'description',
        value: <div dangerouslySetInnerHTML={{ __html: description }} />,
      },

      {
        for: 'is_active',
        value: (
          <>
            {is_active ? (
              <span className="label-active">active</span>
            ) : (
              <span className="label-inactive">inactive</span>
            )}
          </>
        ),
      },
      {
        for: 'is_page',
        value: (
          <>
            {is_page ? (
              <span className="label-active">Page</span>
            ) : (
              <span className="label-inactive">Content</span>
            )}
          </>
        ),
      },
    ],
  );

  const handleOnClick = (id) => {
    console.log('edit', id);
  };

  const handleOnDelete = (id) => {
    console.log('delete', id);
  };

  const handleSearch = () => {
    console.log('call search', query);
  };

  const tableActions = data.map(({ _id }) => [
    { label: <Edit />, onClick: () => handleOnClick(_id) },
    { label: <Delete />, onClick: () => handleOnDelete(_id) },
  ]);

  const [query, setQuery] = useState({ name: '', key: '' });

  const handleQueryChange = (name) => (event) => {
    setQuery({ ...query, [name]: event.target.value });
  };

  const getBulkValues = (values) => {};

  const filters = [
    <TextFiled
      placeholder="Find Name"
      value={query.name}
      onChange={handleQueryChange('name')}
    />,
    <TextFiled
      placeholder="Find Key"
      value={query.key}
      onChange={handleQueryChange('key')}
    />,
  ];

  return (
    <>
      <Helmet>
        <title>Test Page</title>
      </Helmet>

      <div className="container mt-8 p-5">
        <Table
          tableHead={[
            { label: 'Name', for: 'name' },
            { label: 'Key', for: 'key' },
            { label: 'Description', for: 'description' },
            { label: 'Is Active', for: 'is_active' },
            { label: 'Is Page', for: 'is_page' },
          ]}
          tableData={tableData}
          keyList={keys}
          isSN
          header={' Table Header'}
          tableActions={tableActions}
          addButton={{
            label: <Add />,
            onClick: () => {
              console.log('add');
            },
          }}
          filters={filters}
          handleFilter={handleSearch}
          getBulkValues={getBulkValues}
          showBulk
        />
      </div>
    </>
  );
};

export default StaticPage;

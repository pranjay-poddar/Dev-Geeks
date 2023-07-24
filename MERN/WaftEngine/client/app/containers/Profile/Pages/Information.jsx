import moment from 'moment';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DateInput from '../../../components/DateInput';
import { useInjectReducer } from '../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../hooks/useInjectSaga';
import { IMAGE_BASE } from '../../App/constants';
import * as mapDispatchToProps from '../actions';
import Button from '../../../components/Basic/Button';
// core components
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectErrors,
  makeSelectLoading,
  makeSelectOne,
} from '../selectors';

const UserPersonalInformationPage = (props) => {
  useInjectReducer({ key: 'userPersonalInformationPage', reducer });
  useInjectSaga({ key: 'userPersonalInformationPage', saga });
  const {
    classes,
    one,
    errors,
    loading,
    clearError,
    loadOneRequest,
    setOneValue,
    addEditRequest,
  } = props;

  useEffect(() => {
    clearError();
    loadOneRequest();
  }, []);

  useEffect(() => {
    if (one.image && one.image.path) {
      setImage(`${IMAGE_BASE}${one.image.path}`);
    }
  }, [one]);

  const [image, setImage] = useState('');

  const handleChange = (name) => (event) => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };

  const handleDateChange = (name) => (date) => {
    setOneValue({
      key: name,
      value: moment(date).format('YYYY-MM-DD'),
    });
  };

  const handleSave = () => {
    addEditRequest();
  };

  const onHandleUpload = (files) => {
    setOneValue({
      key: 'image',
      value: files[0],
    });
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        setImage(reader.result);
      },
      false,
    );
    reader.readAsDataURL(files[0]);
  };

  return loading ? (
    <div className="circular_loader waftloader"></div>
  ) : (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:flex-1">
          <div className="md:w-1/2 pb-4">
            <label>Name</label>
            <input
              className="inputbox"
              id="name"
              type="text"
              name="Name"
              value={one.name || ''}
              onChange={handleChange('name')}
            />
            <div className="error">{errors.name}</div>
          </div>

          <div className="md:w-1/2 pb-4">
            <label>Email</label>
            <input
              className="inputbox"
              id="email"
              type="text"
              name="Email"
              value={one.email || ''}
              onChange={handleChange('name')}
            />
            <div className="error">{errors.email}</div>
          </div>

          <div className="md:w-1/2 pb-4">
            <label className="text-sm">Date Of Birth</label>
            <DateInput
              onDateChange={(date) => {
                props.setOneValue({
                  key: 'date_of_birth',
                  value: moment(date).format('YYYY-MM-DD'),
                });
              }}
              birth_date={moment(one.date_of_birth).format('YYYY-MM-D')}
            />
          </div>

          <div className="w-full pb-4">
            <div>
              <label className="text-sm">Role :</label>{' '}
              {one.roles.map((each) => (
                <span
                  key={each._id}
                  className="rounded-full px-2 py-1 mr-2 text-xs border"
                >
                  {each.role_title}{' '}
                </span>
              ))}
            </div>
          </div>

          {/* <div className="w-full  pb-4">
          Your account created at {moment(one.added_at).format(DATE_FORMAT)}
        </div> */}
        </div>
        <div
          style={{
            display: 'flex',
          }}
        >
          <Dropzone onDrop={onHandleUpload}>
            {({ getRootProps, getInputProps }) => (
              <section
                style={{ width: '100%' }}
                className="text-black  hover:text-primary text-center self-start  border border-gray-500 rounded-lg border-solid cursor-pointer"
              >
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {image ? (
                    <img className=" w-full " src={image} alt="profile" />
                  ) : (
                    <div className="p-6">
                      <p>Choose Profile picture</p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      </div>

      <Button className="" onClick={handleSave}>
        Save Changes
      </Button>
    </>
  );
};

UserPersonalInformationPage.propTypes = {
  loadOneRequest: PropTypes.func.isRequired,
  addEditRequest: PropTypes.func.isRequired,
  setOneValue: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  one: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  errors: makeSelectErrors(),
  loading: makeSelectLoading(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPersonalInformationPage);

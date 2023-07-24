/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FaArrowLeft } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Loading from '../../../components/Loading';
import PageContent from '../../../components/PageContent/PageContent';
import PageHeader from '../../../components/PageHeader/PageHeader';
import { useInjectReducer } from '../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../hooks/useInjectSaga';
import { DATE_FORMAT } from '../../App/constants';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectLoading, makeSelectOne } from './selectors';

const key = 'adminContactListPage';

const ViewContacts = (props) => {
  const navigate = useNavigate();
  const { id: routeID } = useParams();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (routeID) {
      props.loadOneRequest(routeID);
    }
  }, []);

  const handleBack = () => {
    navigate('/admin/contact-manage');
  };

  const { one, loading } = props;
  return loading && loading == true ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title> Contact Details </title>
      </Helmet>
      <div className="flex justify-between my-3">
        <PageHeader>
          <span className="backbtn" onClick={handleBack}>
            <FaArrowLeft className="text-xl" />
          </span>
          Contact Details
        </PageHeader>
      </div>
      <PageContent>
        <div className="bg-white mt-2 p-2">
          <div className="mb-2 capitalize">
            <b>Name: </b>
            {one && one.name ? one.name : ''}
          </div>

          <div className="mb-2 capitalize">
            <b>Email: </b>
            {one && one.email ? one.email : ''}
          </div>

          <div className="mb-2 capitalize">
            <b>Message: </b>
            {one && one.message ? one.message : ''}
          </div>

          <div className="mb-2 capitalize">
            <b>Subject: </b>
            {one && one.subject ? one.subject : ''}
          </div>

          <div className="mb-2">
            <b>Added At: </b>
            {moment(one && one.added_at).format(DATE_FORMAT)}
          </div>
        </div>
      </PageContent>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewContacts);

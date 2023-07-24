/**
 *
 * Dashboard
 *
 */

import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PageContent from '../../../components/PageContent/PageContent';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Panel from '../../../components/Panel';
import { useInjectReducer } from '../../../hooks/useInjectReducer';
import { useInjectSaga } from '../../../hooks/useInjectSaga';
import { IMAGE_BASE } from '../../App/constants';
import * as mapDispatchToProps from './actions';
import BarChart from './Charts/BarChart';
import LineChart from './Charts/LineChart';
import PieChart from './Charts/PieChart';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectBlog,
  makeSelectBlogsByUser,
  makeSelectErrors,
  makeSelectInfo,
  makeSelectRecentUser,
  makeSelectUserByDays,
  makeSelectUserByRegister,
  makeSelectUsers,
} from './selectors';

/* eslint-disable react/prefer-stateless-function */
const Dashboard = (props) => {
  useInjectReducer({ key: 'adminDashboard', reducer });
  useInjectSaga({ key: 'adminDashboard', saga });

  useEffect(() => {
    props.loadUserRequest();
    props.loadErrorRequest();
    props.loadInfoRequest();
    props.loadUserByRegisterRequest();
    props.loadBlogsByUserRequest();
    props.loadRecentUserRequest();
    props.loadUserByDaysRequest();
  }, []);

  const convertDateData = (dates) => {
    let newData = [];
    if (dates.length > 0) {
      for (let index = 0; index < dates.length; index++) {
        const element = dates[index];
        let obj = {
          date: `${element._id}/${element.month}/${element.day}`,
          users: element.amt,
        };
        newData.push(obj);
      }
    }
    return newData;
  };

  const convertAuthorData = (data) => {
    let newData = [];
    if (data.length > 0) {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let obj = {
          Author: element.author,
          amt: element.amt,
        };
        newData.push(obj);
      }
    }
    return newData;
  };

  const convertRolesData = (data) => {
    let newData = [];
    if (data.length > 0) {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let obj = {
          name: element.role_title,
          count: element.count,
        };
        newData.push(obj);
      }
    }
    return newData;
  };

  const convertRegisterData = (data) => {
    let newData = [];
    if (data.length > 0) {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let obj = {
          name: element._id,
          count: element.amt,
        };
        newData.push(obj);
      }
    }
    return newData;
  };

  const { users, info, userByRegister, blogsByUser, recentUser, userByDays } =
    props;

  return (
    <>
      <PageHeader title="Dashboard" />

      <>
        {info.map((each) => (
          <Panel
            key={each._id}
            title={each.title}
            body={<div dangerouslySetInnerHTML={{ __html: each.detail }} />}
          />
        ))}
      </>
      <PageContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="border bg-white rounded">
            <h3 className="px-4 py-2 text-lg border-b">Roles </h3>
            <div className="flex flex-wrap justify-between">
              {users && users.data && users.data.role && (
                <PieChart
                  dataKey="count"
                  nameKey="name"
                  data={convertRolesData(users.data.role)}
                />
              )}
            </div>
          </div>
          <div className="border bg-white rounded">
            <h3 className="px-4 py-2 text-lg border-b">Sign Ups</h3>
            <div className="flex flex-wrap justify-between mx-4">
              {userByRegister && (
                <PieChart
                  dataKey="count"
                  nameKey="name"
                  data={convertRegisterData(userByRegister)}
                />
              )}
            </div>
          </div>

          <div className="border bg-white rounded">
            <h3 className="px-4 py-2 text-lg border-b">Users by Days </h3>
            <div className="flex flex-wrap justify-between mx-4">
              <LineChart
                data={convertDateData(userByDays)}
                XAxisKey="date"
                Line1Key="users"
              />
            </div>
          </div>

          <div className="border bg-white rounded">
            <h3 className="px-4 py-2 text-lg border-b">Recent Users</h3>
            <div className="flex flex-wrap justify-between mx-4">
              {recentUser &&
                recentUser.map((each) => (
                  <div key={each.email} className="flex border-b py-2">
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      {each.image && each.image.path ? (
                        <img
                          src={`${IMAGE_BASE}${each.image.path}`}
                          className="w-8 h-8 rounded-full overflow-hidden"
                        />
                      ) : (
                        <FaUser className="text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1 pl-5">
                      <h4 className="mb-0">{`${each.name}`}:</h4>
                      <span className="text-sm text-gray-500">
                        {each.email}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-span-2 border bg-white rounded">
            <h3 className="px-4 py-2 text-lg border-b">Blogs </h3>
            <div className="flex flex-wrap justify-between mx-4">
              {blogsByUser.blog && blogsByUser.blog.length ? (
                <BarChart
                  data={convertAuthorData(blogsByUser.blog)}
                  key1="amt"
                  XAxisKey="Author"
                />
              ) : (
                <div className="flex justify-between">
                  <h2 className="w-full m-auto h-full font-bold text-red-500">
                    No Blogs
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </PageContent>
    </>
  );
};
Dashboard.propTypes = {
  loadUserRequest: PropTypes.func.isRequired,
  loadErrorRequest: PropTypes.func.isRequired,
  loadInfoRequest: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  info: PropTypes.array.isRequired,
  blogs: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
  errors: makeSelectErrors(),
  info: makeSelectInfo(),
  blogs: makeSelectBlog(),
  userByRegister: makeSelectUserByRegister(),
  blogsByUser: makeSelectBlogsByUser(),
  recentUser: makeSelectRecentUser(),
  userByDays: makeSelectUserByDays(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

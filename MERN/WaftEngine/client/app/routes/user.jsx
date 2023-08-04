import ProfileRoute from '../containers/Profile';

const userRoutes = [
  {
    exact: false,
    path: 'profile/*',
    element: <ProfileRoute />,
  },
];

export default userRoutes;

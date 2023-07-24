import Blog from '../containers/Admin/Blog';
import BlogAddEdit from '../containers/Admin/Blog/AddEditPage/index';
import BlogCategory from '../containers/Admin/BlogCategory';
import BlogCategoryAddEdit from '../containers/Admin/BlogCategory/AddEdit/index';
import Contact from '../containers/Admin/Contact';
import ContactView from '../containers/Admin/Contact/ViewContactList';
import Dashboard from '../containers/Admin/Dashboard/Loadable';
import EmailTemplateAddEdit from '../containers/Admin/EmailTemplate/index';
import EmailTemplate from '../containers/Admin/EmailTemplate/List';
import ErrorPage from '../containers/Admin/Error';
import GlobalSetting from '../containers/Admin/GlobalSetting';
import GlobalSettingAddEdit from '../containers/Admin/GlobalSetting/AddEdit';
import MediaPage from '../containers/Admin/Media';
import Menu from '../containers/Admin/MenuManage';
import MenuAddEdit from '../containers/Admin/MenuManage/AddEditPage/index';
import Module from '../containers/Admin/Module';
import ModuleAccess from '../containers/Admin/Module/AccessManagePage/index';
import ModuleAddEdit from '../containers/Admin/Module/AddEditPage/index';
import PageContent from '../containers/Admin/PageContent';
import PageContentAddEdit from '../containers/Admin/PageContent/AddEditPage/index';
import Role from '../containers/Admin/Role';
import RoleAddEdit from '../containers/Admin/Role/AddEditPage/index';
import RoleAccess from '../containers/Admin/Role/RoleAccess/index';
import ContentAddEdit from '../containers/Admin/SectionContent/AddEditPage/index';
import Content from '../containers/Admin/SectionContent/Loadable';
import Slider from '../containers/Admin/Slider';
import SliderAddEdit from '../containers/Admin/Slider/AddEditPage/index';
import SubModules from '../containers/Admin/SubModules';
import SubModulesAddEdit from '../containers/Admin/SubModules/AddEditPage/index';
import Subscribe from '../containers/Admin/Subscribe';
import SubscribeView from '../containers/Admin/Subscribe/SubscribeView';
import User from '../containers/Admin/User';
import UserAddEdit from '../containers/Admin/User/AddEditPage/index';

const adminRoutes = [
  {
    exact: true,
    path: 'dashboard',
    element: <Dashboard />,
  },
  {
    exact: true,
    path: 'section-content',
    element: <Content />,
  },
  {
    exact: true,
    path: 'section-content/add',
    element: <ContentAddEdit />,
  },
  {
    exact: true,
    path: 'section-content/edit/:id',
    element: <ContentAddEdit />,
  },

  {
    exact: true,
    path: 'page-content',
    element: <PageContent />,
  },
  {
    exact: true,
    path: 'page-content/add',
    element: <PageContentAddEdit />,
  },
  {
    exact: true,
    path: 'page-content/edit/:id',
    element: <PageContentAddEdit />,
  },

  {
    exact: true,
    path: 'menu-manage',
    element: <Menu />,
  },
  {
    exact: true,
    path: 'menu-manage/add',
    element: <MenuAddEdit />,
  },
  {
    exact: true,
    path: 'menu-manage/edit/:id',
    element: <MenuAddEdit />,
  },

  {
    exact: true,
    path: 'slider-manage',
    element: <Slider />,
  },
  {
    exact: true,
    path: 'slider-manage/add',
    element: <SliderAddEdit />,
  },
  {
    exact: true,
    path: 'slider-manage/edit/:id',
    element: <SliderAddEdit />,
  },

  {
    exact: true,
    path: 'blog-manage',
    element: <Blog />,
  },
  {
    exact: true,
    path: 'blog-manage/add',
    element: <BlogAddEdit />,
  },
  {
    exact: true,
    path: 'blog-manage/edit/:id',
    element: <BlogAddEdit />,
  },
  {
    exact: true,
    path: 'blog-cat-manage',
    element: <BlogCategory />,
  },
  {
    exact: true,
    path: 'blog-cat-manage/add',
    element: <BlogCategoryAddEdit />,
  },
  {
    exact: true,
    path: 'blog-cat-manage/edit/:id',
    element: <BlogCategoryAddEdit />,
  },
  {
    exact: true,
    path: 'user-manage',
    element: <User />,
  },
  {
    exact: true,
    path: 'user-manage/add',
    element: <UserAddEdit />,
  },
  {
    exact: true,
    path: 'user-manage/edit/:id',
    element: <UserAddEdit />,
  },

  {
    path: 'role-manage',
    element: <Role />,
    exact: true,
  },
  {
    path: 'role-manage/edit/:id',
    element: <RoleAddEdit />,
    exact: true,
  },
  {
    path: 'role-manage/access/:id',
    element: <RoleAccess />,
    exact: true,
  },
  {
    path: 'role-manage/add',
    element: <RoleAddEdit />,
    exact: true,
  },

  {
    path: 'module-manage',
    element: <Module />,
    exact: true,
  },
  {
    path: 'module-manage/add',
    element: <ModuleAddEdit />,
    exact: true,
  },
  {
    path: 'module-manage/edit/:id',
    element: <ModuleAddEdit />,
    exact: true,
  },
  {
    path: 'module-manage/access/:id',
    element: <ModuleAccess />,
    exact: true,
  },

  {
    path: 'sub-modules',
    element: <SubModules />,
    exact: true,
  },
  {
    path: 'sub-modules/add',
    element: <SubModulesAddEdit />,
    exact: true,
  },
  {
    path: 'sub-modules/edit/:id',
    element: <SubModulesAddEdit />,
    exact: true,
  },
  {
    path: 'template-manage',
    element: <EmailTemplate />,
    exact: true,
  },
  {
    path: 'template-manage/add',
    element: <EmailTemplateAddEdit />,
    exact: true,
  },
  {
    path: 'template-manage/edit/:key',
    element: <EmailTemplateAddEdit />,
    exact: true,
  },
  {
    path: 'global-setting',
    element: <GlobalSetting />,
    exact: true,
  },
  {
    path: 'global-setting/add',
    element: <GlobalSettingAddEdit />,
    exact: true,
  },
  {
    path: 'global-setting/edit/:id',
    element: <GlobalSettingAddEdit />,
    exact: true,
  },
  {
    path: 'contact-manage',
    element: <Contact />,
    exact: true,
  },
  {
    path: 'contact-manage/view/:id',
    element: <ContactView />,
    exact: true,
  },
  {
    path: 'subscribe-manage',
    element: <Subscribe />,
    exact: true,
  },
  {
    path: 'subscribe-manage/view/:id',
    element: <SubscribeView />,
    exact: true,
  },
  {
    path: 'errors',
    element: <ErrorPage />,
    exact: true,
  },

  {
    path: 'media-manage',
    element: <MediaPage />,
    exact: true,
  },
];

export default adminRoutes;

import { Route, Routes } from 'react-router-dom';
import { useInjectReducer } from '../../hooks/useInjectReducer';
import { useInjectSaga } from '../../hooks/useInjectSaga';
import {
  BlogDate,
  BlogDetail,
  BlogList,
  BlogsByAuthor,
  BlogsByTag,
  CategoryDetail,
} from './Pages/Loadable';
import reducer from './reducer';
import saga from './saga';
import { reduxKey } from './selectors';

const Blog = () => {
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  return (
    <div className="bg-white">
      <Routes>
        <Route exact path="/" element={<BlogList />} />
        <Route path=":yy/:mm/:dd/:slug_url" element={<BlogDetail />} />
        <Route exact path="category/:slug_url" element={<CategoryDetail />} />
        <Route exact path="tag/:tag" element={<BlogsByTag />} />
        <Route exact path="author/:author" element={<BlogsByAuthor />} />
        <Route exact path="date/:date" element={<BlogDate />} />
        <Route exact path=":slug_url" element={<BlogDetail />} />
      </Routes>
    </div>
  );
};

export default Blog;

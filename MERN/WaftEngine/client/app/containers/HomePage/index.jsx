import { Helmet } from 'react-helmet';
import StaticContentDiv from '../../components/StaticContentDiv';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="max-w-2xl mx-auto">
        <div className="m-20 px-20 py-10 shadow max-w-2xl mx-auto">
          <StaticContentDiv contentKey="about" />
        </div>
      </div>
    </>
  );
}

export default HomePage;

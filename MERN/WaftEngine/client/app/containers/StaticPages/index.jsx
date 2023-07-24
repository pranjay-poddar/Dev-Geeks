/*
 * Static
 */

import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import StaticContentDiv from '../../components/StaticContentDiv';

const StaticPage = () => {
  const { key } = useParams();

  const camelCaseKey = key[0].toUpperCase() + key.slice(1).split('-').join(' ');
  return (
    <>
      <Helmet>
        <title>{camelCaseKey}</title>
      </Helmet>
      <div className="container p-5">
        <StaticContentDiv contentKey={key} />
      </div>
    </>
  );
};

export default StaticPage;

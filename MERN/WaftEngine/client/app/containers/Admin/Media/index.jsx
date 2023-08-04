import { Helmet } from 'react-helmet';
import PageContent from '../../../components/PageContent/PageContent';
import PageHeader from '../../../components/PageHeader/PageHeader';
import EditorFileSelect from '../../EditorFileSelect';

/* eslint-disable react/prefer-stateless-function */
const MediaPage = (props) => {
  return (
    <>
      <Helmet>
        <title>Media</title>
      </Helmet>
      <PageHeader title="Media"></PageHeader>
      <PageContent>
        <EditorFileSelect
        // location={location}
        // selectFile={(file) => handleImageImageChange(file)}
        />
      </PageContent>
    </>
  );
};

export default MediaPage;

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Loading from '../../components/Loading';
import Panel from '../../components/Panel';
import { useInjectReducer } from '../../hooks/useInjectReducer';
import { useInjectSaga } from '../../hooks/useInjectSaga';
import * as mapDispatchToProps from './actions';
import FaqCategory from './components/FaqCategory';
import reducer from './reducer';
import saga from './saga';
import { makeSelectFAQ, makeSelectLoading, reduxKey } from './selectors';

const FAQPage = (props) => {
  useInjectReducer({ key: reduxKey, reducer: reducer });
  useInjectSaga({ key: reduxKey, saga: saga });

  const [expanded, setExpanded] = useState('panel1');
  const [qExpanded, setQExpanded] = useState('');

  useEffect(() => {
    props.loadFAQRequest();
  }, []);

  const handleChange = (panel) => (event, expanded) => {
    setExpanded(expanded ? panel : false);
  };

  const handleQChange = (panel) => (event, expanded) => {
    setQExpanded(expanded ? panel : false);
  };

  const { faq, classes, loading } = props;

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Helmet>
        <title> FAQs </title>
      </Helmet>
      <div className="my-10 container mx-auto">
        {faq.cat &&
          faq.cat.map(
            (x) =>
              faq.faq &&
              faq.faq.filter((z) => z.category == x._id).length !== 0 && (
                <div key={`cat-${x._id}`} className="mb-10">
                  <h2 className="text-xl font-bold">{x.title}</h2>
                  <div style={{ display: 'block', paddingLeft: 0 }}>
                    {faq.faq &&
                      faq.faq
                        .filter((z) => z.category == x._id)
                        .map((y) => (
                          <Panel
                            title={y.question}
                            body={
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: y.description,
                                }}
                              />
                            }
                          />
                        ))}
                  </div>
                </div>
              ),
          )}
      </div>

      <FaqCategory faqKey="Motivations" />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  faq: makeSelectFAQ(),
  loading: makeSelectLoading(),
});

export default connect(mapStateToProps, mapDispatchToProps)(FAQPage);

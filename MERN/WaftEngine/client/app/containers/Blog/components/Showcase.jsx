/**
 *
 * ShowCase
 *
 */

import moment from 'moment';
import PropTypes from 'prop-types';
import { FaRegClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IMAGE_BASE } from '../../App/constants';

const ShowCase = (props) => {
  const { showcase, loading } = props;

  return loading ? (
    <div />
  ) : (
    <>
      {showcase && showcase.length > 0 && (
        <div className="container layout-7">
          <div className="article-group -mx-2">
            {showcase.map((each, index) => (
              <div
                key={each._id}
                className={`px-2 mb-4 h-full item-${index + 1}`}
              >
                <div className="article-container flow-root">
                  <div className="article-img-container">
                    <Link
                      to={`/blog/${moment(each.added_at).format(
                        'YYYY/MM/DD',
                      )}/${each._id}`}
                    >
                      <img
                        src={`${IMAGE_BASE}${
                          each && each.image && each.image.path
                        }`}
                        className="object-cover article-img"
                        alt={`${each.title}`}
                      />
                    </Link>
                  </div>
                  <div className="textpart">
                    <Link
                      to={`/blog/${moment(each.added_at).format(
                        'YYYY/MM/DD',
                      )}/${each._id}`}
                      className="text-xl leading-normal py-5 hover:text-blue-500 pointer no-underline article-title font-bold md:font-normal"
                    >
                      {each.title}
                    </Link>

                    <p className="hidden font-mukta-regular text-lg md:text-xl short-description">
                      {each.short_description}
                    </p>
                    <div className="flex">
                      <div className="inline-flex items-center hidden mt-3 mr-8 author">
                        <span className="text-gray-800 text-sm sans-serif author-name ml-3">
                          {each.author &&
                            each.author.map((author) => author.name)}
                        </span>
                      </div>
                      <div className="inline-flex items-center text-gray-600 md:text-gray-800 text-sm sans-serif mt-3 article-date">
                        <FaRegClock className="mr-2" />
                        {moment(each.added_at).fromNow()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

ShowCase.propTypes = {
  showcase: PropTypes.array.isRequired,
};

export default ShowCase;

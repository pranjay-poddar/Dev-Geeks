import { CommentsCount, FacebookProvider } from 'react-facebook';
import { FaPen, FaRegCommentAlt, FaRegUserCircle } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { FacebookIcon, LinkedinIcon, TwitterIcon } from 'react-share';
import LinkBoth from '../../../components/LinkBoth';
import { IMAGE_BASE, URL_BASE } from '../../App/constants';
import NotFoundPage from '../../NotFoundPage';
import BlogDetailSkeleton from '../Skeleton/BlogDetail';

const BlogDetail = (props) => {
  const { blog, loading, message, isAdmin } = props;
  return loading ? (
    <div>
      <Skeleton className="my-48" height={50} />
      <span className="pr-5 inline-block border-r border-gray-300">
        {' '}
        <Skeleton className="pr-5" width={100} height={20} />
      </span>
      <span className="pl-5 inline-block mt-4">
        {' '}
        <Skeleton className="pl-10" width={100} height={20} />
      </span>
      <div className="lg:flex">
        <div className="lg:w-3/4">
          <BlogDetailSkeleton />
        </div>
        <div className="lg:w-1/4 lg:pl-10">
          <Skeleton className="" height={50} />
          <Skeleton className="mt-6" count={10} height={20} />
        </div>
      </div>
    </div>
  ) : (
    <>
      {message && message === 'no blog found' ? (
        <NotFoundPage />
      ) : (
        <>
          <div className="flex justify-between gap-4">
            <h1 className="text-4xl lg:text-6xl text-sm leading-tight">
              {blog && blog.title}
            </h1>
            <Link
              to={`/admin/blog-manage/edit/${blog._id}`}
              className="text-lg mr-6"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-white shadow rounded-full absolute text-gray-600 hover:text-primary">
                <FaPen />
              </div>
            </Link>
          </div>
          <div className="md:flex py-5 md:py-10 mb-5 md:mb-10 border-b border-gray-300">
            {blog &&
              blog.author &&
              blog.author.map((each, index) => (
                <div
                  key={`${blog._id}-${each._id}-${index}`}
                  className="inline-flex items-center"
                >
                  <img
                    src={
                      each && each.image && each.image.path ? (
                        `${IMAGE_BASE}${each.image.path}`
                      ) : (
                        <FaRegUserCircle />
                      )
                    }
                    alt={`${each.name}`}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      marginRight: 8,
                      borderWidth: 2,
                      borderColor: '#E1E1E1',
                    }}
                  />
                  {each.name}
                </div>
              ))}
            <div className="flex items-center md:ml-10">
              <div className="h-10 w-10 bg-blue-100 inline-flex mr-3 rounded-full items-center justify-center">
                <FaRegCommentAlt />
              </div>
              <div className="flex flex-wrap items-end">
                <FacebookProvider appId="403635297248992">
                  <span className="text-xl font-bold">
                    <CommentsCount
                      href={`${URL_BASE}detail/${blog.slug_url}`}
                    />{' '}
                  </span>
                  <span className="pl-2">Comments</span>
                </FacebookProvider>
              </div>
            </div>
            <div className="py-5 md:py-0 items-center md:ml-10 flex relative z-50" />
          </div>
          <div className="lg:flex">
            <div className="lg:w-3/4 lg:pr-10">
              <div className="blog_img">
                {blog && blog.image && blog.image.path ? (
                  <img
                    style={{ width: '100%' }}
                    src={`${IMAGE_BASE}${blog.image.path}`}
                    alt={`${blog.title}`}
                  />
                ) : null}
              </div>
              <div
                className="ckEditor md:px-20 mt-8"
                dangerouslySetInnerHTML={{ __html: blog && blog.description }}
              />
              {blog && blog.tags && blog.tags.length > 0 && (
                <div className="mb-5 md:px-20">
                  {blog.tags.map((each, index) => (
                    <LinkBoth
                      className="bg-gray-200 hover:bg-gray-300 leading-tighter text-base no-underline rounded px-4 py-2 mb-1 mr-1 inline-block"
                      key={index}
                      to={`/blog/tag/${each}`}
                    >
                      {`${index === 0 ? '' : ''}${each}`}
                    </LinkBoth>
                  ))}
                </div>
              )}
              {blog &&
                blog.author &&
                blog.author.length > 0 &&
                blog.author.map((each, index) => (
                  <div
                    key={`big-${blog._id}-${each._id}-${index}`}
                    className="border-t border-b border-gray-200 py-6 md:py-12"
                  >
                    <div className="border-l-8 border-secondary md:flex px-6 md:px-12">
                      <div className="w-16 h-16 mb-6 overflow-hidden rounded-full">
                        <img
                          className="object-cover w-full h-full"
                          src={
                            each && each.image && each.image.path
                              ? `${IMAGE_BASE}${each.image.path}`
                              : tempAuthor
                          }
                          alt={`${each.name}`}
                        />
                      </div>
                      <div className="flex-1 md:pl-8">
                        <h3 className="font-bold text-xl mb-2">{each.name}</h3>
                        {each && each.author && each.author.bio && (
                          <p className="text-gray-700 mb-4 text-lg leading-normal">
                            {each.author.bio}
                          </p>
                        )}
                        <div className="flex mt-3">
                          {each &&
                            each &&
                            each.social_link &&
                            each.social_link.fb &&
                            each.social_link.fb !== '' && (
                              <LinkBoth
                                className="mr-2"
                                to={each.social_link.fb}
                                target="_blank"
                              >
                                <FacebookIcon size={32} round />
                              </LinkBoth>
                            )}
                          {each &&
                            each &&
                            each.social_link &&
                            each.social_link.twitter &&
                            each.social_link.twitter !== '' && (
                              <LinkBoth
                                className="mr-2"
                                to={each.social_link.twitter}
                                target="_blank"
                              >
                                <TwitterIcon size={32} round />
                              </LinkBoth>
                            )}
                          {each && each && each._id && (
                            <LinkBoth
                              className="text-secondary"
                              to={`/blog/author/${each._id}`}
                            >
                              Read more from author
                            </LinkBoth>
                          )}
                          <div className="flex mt-3">
                            {each &&
                              each &&
                              each.social_link &&
                              each.social_link.fb &&
                              each.social_link.fb !== '' && (
                                <LinkBoth
                                  className="mr-2"
                                  to={each.social_link.fb}
                                  target="_blank"
                                >
                                  <FacebookIcon size={32} round />
                                </LinkBoth>
                              )}
                            {each &&
                              each &&
                              each.social_link &&
                              each.social_link.twitter &&
                              each.social_link.twitter !== '' && (
                                <LinkBoth
                                  className="mr-2"
                                  to={each.social_link.twitter}
                                  target="_blank"
                                >
                                  <TwitterIcon size={32} round />
                                </LinkBoth>
                              )}
                            {each &&
                              each &&
                              each.social_link &&
                              each.social_link.linkedIn &&
                              each.social_link.linkedIn !== '' && (
                                <LinkBoth
                                  className="mr-2"
                                  to={each.social_link.linkedIn}
                                  target="_blank"
                                >
                                  <LinkedinIcon size={32} round />
                                </LinkBoth>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default BlogDetail;

import Skeleton from 'react-loading-skeleton';

const Loading = () => (
  <>
    <div className="mb-6">
      <Skeleton width={150} height={30} />
      {[1, 2, 3].map((each) => (
        <div key={each} className="blog-det flex py-3 border-b border-dotted">
          <Skeleton width={80} height={80} />
          <div className="flex-1 ml-4">
            <Skeleton width={50} height={10} />
            <Skeleton height={10} />
            <Skeleton height={10} />
            <Skeleton width={100} height={10} />
          </div>
        </div>
      ))}
    </div>
  </>
);

export default Loading;

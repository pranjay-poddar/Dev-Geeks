import Skeleton from 'react-loading-skeleton';

const Loading = () => (
  <>
    <div className="flex flex-wrap">
      {[1, 2, 3, 4].map((each) => (
        <div
          key={each}
          className="block bg-white px-2 md:px-6 mb-12 md:w-1/2 overflow-hidden"
        >
          <Skeleton width={500} height={180} />
          <Skeleton width={500} height={30} />
          <Skeleton width={200} height={30} />
        </div>
      ))}
    </div>
  </>
);

export default Loading;

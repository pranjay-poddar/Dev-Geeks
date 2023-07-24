import Skeleton from 'react-loading-skeleton';

const Loading = () => (
  <>
    <div className="w-full flex-1">
      <Skeleton height={300} />
      <br />
      <br />

      <Skeleton className="mt-2" count={10} height={20} />
      <Skeleton className="mt-2" height={20} width={300} />
      <br />
      <br />
      <Skeleton className="mt-2" count={10} height={20} />
      <Skeleton className="mt-2" height={20} width={300} />
      <br />
      <br />
    </div>
  </>
);

export default Loading;

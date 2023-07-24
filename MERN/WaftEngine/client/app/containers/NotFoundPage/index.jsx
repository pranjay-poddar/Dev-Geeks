import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="py-20 container mx-auto">
      <h1 className="text-5xl">Oops! Page not found.</h1>
      <p className="text-gray-500">
        You can{' '}
        <Link className="text-link" to="/">
          return to our front page
        </Link>
        , or{' '}
        <Link className="text-link" to="contact">
          drop us a line
        </Link>{' '}
        if you can't find what you're looking for.
      </p>
    </div>
  );
}

export default NotFoundPage;

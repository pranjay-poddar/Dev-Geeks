import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './pageheader.css';
const PageHeader = (props) => {
  const { classes, title, actions, back } = props;

  return (
    <div
      className={`flex items-center text-xl my-auto font-bold py-4 sticky top-0 mt-16 z-20 bg-gray-100 ${classes}`}
    >
      <div className="flex-1 flex items-center h-9">
        {back && (
          <Link className="backbtn text-black" to={back}>
            <FaArrowLeft className="text-xl" />
          </Link>
        )}
        <h1 className="mb-0">{title}</h1>
      </div>
      <div className="flex gap-2">{actions}</div>
    </div>
  );
};

export default PageHeader;

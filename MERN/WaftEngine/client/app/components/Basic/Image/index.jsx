import { APP_NAME, IMAGE_BASE } from '../../../containers/App/constants';
import { useEffect, useState } from 'react';
import './image.css';

const Image = ({ alt, src, loading, size, className, ...restProps }) => {
  const [Source, setSource] = useState(src);
  const [external, setExternal] = useState(false);
  const AllowReplace = (path) => {
    let allow = false;
    // to check if the file is image or not
    if (path.includes('png') || path.includes('jpeg') || path.includes('jpg')) {
      allow = true;
    }
    return allow;
  };

  const isExternal = function (url) {
    const host = window.location.hostname;

    const linkHost = (function (url) {
      if (/^https?:\/\//.test(url)) {
        const parser = document.createElement('a');
        parser.href = url;

        return parser.hostname;
      }
      return window.location.hostname;
    })(url);

    return host !== linkHost;
  };

  useEffect(() => {
    const splitSize = size && size.split('-');
    let tempSrc = Source;
    if (splitSize && splitSize.length > 1 && AllowReplace(src)) {
      setSource(tempSrc.replace(`public`, `public/${size}`));
    }
  }, [size, src]);

  return isExternal(src) ? (
    <img
      loading={loading && loading !== '' ? loading : 'lazy'}
      alt={alt && alt !== '' ? alt : APP_NAME}
      src={src && src !== '' ? src : ''}
      className={`${className && className !== '' ? className : ''}`}
      {...restProps}
    />
  ) : (
    <img
      loading={loading && loading !== '' ? loading : 'lazy'}
      alt={alt && alt !== '' ? alt : APP_NAME}
      src={src && src !== '' ? `${IMAGE_BASE}${Source}` : ''}
      className={`${className}`}
      {...restProps}
    />
  );
};

export default Image;

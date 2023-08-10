import './ButtonCard.css'

const ButtonCard = ({ btnImg, imgAlt, codepenLink, zipFileName, authorName, githubLink }) => {
  return (
    <div className='card'>
      <img src={ btnImg } alt={ imgAlt } className='btn-img' />
      <div className='button-info'>
        <button className='btn view-code-btn'>
          <a
            href={codepenLink}
            target='_blank'
          >
            View Code
          </a>
        </button>
        <button className='btn download-btn'>
          <a
            href={`/zipfiles/${zipFileName}.zip`}
            download={`${zipFileName}.zip`}
          >
            Download
          </a>
        </button>
        <p className='author'>
          <span>Author: </span>
          <address>
            <a
              href={githubLink}
              target='_blank'
            >
              {authorName}
            </a>
          </address>
        </p>
      </div>
    </div>
  )
}

export default ButtonCard

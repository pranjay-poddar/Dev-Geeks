/**
 *
 * SlickSlider
 *
 */

import React, { useEffect } from 'react';
import { FaPen } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { loadSlideRequest } from '../../containers/App/actions';
import { IMAGE_BASE } from '../../containers/App/constants';
import {
  makeSelectSlide,
  makeSelectUserIsAdmin,
} from '../../containers/App/selectors';
import LinkBoth from '../LinkBoth';

/* eslint-disable react/prefer-stateless-function */
const SlickSlider = (props) => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'blue' }}
      onClick={onClick}
    >
      <h1>next</h1>
    </div>;
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;

    <div
      className={className}
      style={{
        ...style,
        background: 'red',
        height: '0.756rem',
        width: '0.98rem',
      }}
      onClick={onClick}
    >
      prev
    </div>;
  }

  useEffect(() => {
    if (props.slideObj[props.slideKey]) {
      return;
    }
    props.loadSlide(props.slideKey);
  }, []);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;

    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
          background: 'red',
          color: 'black',
          height: '2rem',
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', background: 'green' }}
        onClick={onClick}
      />
    );
  }

  const { slideObj } = props;

  const slide = slideObj[props.slideKey];
  let settings;
  try {
    if (slide && slide.settings && typeof slide.settings === 'string') {
      settings = JSON.parse(`${slide.settings}`);
    }
  } catch (err) {
    console.log('something went wrong!', err);
  }
  let combined;

  if (!slide) return null; // maybe add a loader here

  if (slide && slide.settings !== undefined) {
    combined = {
      ...slide.slider_setting,
      ...settings,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
  } else {
    combined = {
      ...slide.slider_setting,
    };
  }

  return (
    <div>
      <h1>hello</h1>;
      {props.is_Admin && (
        <Link
          className="flex w-8 h-8 bg-white shadow rounded-full absolute z-10"
          to={`/admin/slider-manage/edit/${slide._id}`}
          target="_blank"
        >
          <FaPen
            className="text-black m-auto hover:text-primary text-base"
            title="Edit"
          />
        </Link>
      )}
      <Slider {...combined}>
        {slide.images.map((image) => (
          <LinkBoth to={`${image.link ? image.link : ''}`} key={image._id}>
            <img
              src={
                image.image && image.image.path && image.image.path !== null
                  ? `${IMAGE_BASE}${image.image.path}`
                  : ''
              }
              alt={image.filename}
            />
            <div
              className="ckEditor"
              dangerouslySetInnerHTML={{
                __html: image.caption,
              }}
            />
          </LinkBoth>
        ))}
      </Slider>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  slideObj: makeSelectSlide(),
  isAdmin: makeSelectUserIsAdmin(),
});

const mapDispatchToProps = (dispatch) => ({
  loadSlide: (payload) => dispatch(loadSlideRequest(payload)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SlickSlider);

import { useState, useRef, useCallback, useEffect } from 'react';
import './range.css';

const RangeSlider = ({
  min,
  max,
  onAfterChange,
  showValues,
  singleSlider,
  className,
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const [changed, setChanged] = useState(true);

  // wait 500ms before change is passed to upper component
  useEffect(() => {
    setTimeout(function () {
      setChanged(false);
    }, 500);
  }, [minVal, maxVal]);

  useEffect(() => {
    if (changed === false) {
      handleAfterChange();
    }
  }, [changed]);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  // Set width of the range to change from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to change from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Creating the refs
  const minValRef = useRef(min);
  const maxValRef = useRef(max);

  const range = useRef(null);

  const handleAfterChange = () => {
    const val = { minimum: minVal, maximum: maxVal };
    if (onAfterChange) {
      onAfterChange(val);
    }
  };

  return (
    <div className={`${className && className !== '' ? className : ''}`}>
      {singleSlider ? (
        <>
          <input
            type="range"
            min={min}
            max={max}
            value={minVal}
            onChange={(event) => {
              const value = Math.min(Number(event.target.value));
              setMinVal(value);
              setChanged(true);
              minValRef.current = value;
            }}
            className="thumb thumb_left"
            style={{
              zIndex: minVal > max - 100 && '5',
            }}
          />

          <div className="slider pb-4">
            <div className="slider__track" />
            <div ref={range} className="slider__range" />
            {showValues === true ? (
              <>
                <div className="slider__left_value">{minVal}</div>
              </>
            ) : null}
          </div>
        </>
      ) : (
        <>
          <input
            type="range"
            min={min}
            max={max}
            value={minVal}
            onChange={(event) => {
              const value = Math.min(Number(event.target.value), maxVal - 1);
              setMinVal(value);
              setChanged(true);
              minValRef.current = value;
            }}
            className="thumb thumb_left"
            style={{
              zIndex: minVal > max - 100 && '5',
            }}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            onChange={(event) => {
              const value = Math.max(Number(event.target.value), minVal + 1);
              setMaxVal(value);
              setChanged(true);
              maxValRef.current = value;
            }}
            className="thumb thumb_right"
          />
          <div className="slider pb-4">
            <div className="slider__track" />
            <div ref={range} className="slider__range" />
            {showValues === true ? (
              <>
                <div className="slider__left_value">{minVal}</div>
                <div className="slider__right_value">{maxVal}</div>
              </>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default RangeSlider;

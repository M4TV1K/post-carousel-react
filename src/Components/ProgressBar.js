
import { useState, useRef, useEffect } from 'react';
import './assets/css/ProgressBar.css';

const ProgressBar = ({ onClickPoint, amount, selected }) => {
  const [prevPoint, setPrevPoint] = useState(0);
  const barRef = useRef();

  useEffect(() => {
    if (prevPoint !== selected) {
      if (selected === 0) {
        barRef.current.scrollTo(0, 0);
      }
      else if (selected + 1 === amount) {
        barRef.current.scrollTo(amount * 100, 0);
      }
      else if (selected > prevPoint) {
        barRef.current.scrollTo(100 * (selected - 3), 0);
      }
      else {
        barRef.current.scrollTo(100 * (selected - 3), 0);
      }
    }
    setPrevPoint(selected);
  }, [selected, prevPoint, amount]);

  const displayPoints = () => {
    const points = [];
    for (let p = 0; p < amount; ++p) {
      if (amount > 4) points.push(
          <p
              className={
                `progress-point ${p === selected ? 'active-point' : ''}
                ${p + 1 < selected || p - 1 > selected ? 'small-point' : ''}`
              }
              onClick={() => onClickPoint(p)}
              key={p}
          >&bull;</p>
        );
      else {
        points.push(
            <p
                className={`progress-point ${p === selected ? 'active-point' : ''}`}
                onClick={() => onClickPoint(p)}
                key={p}
            >&bull;</p>
        );
      }
    }
    return points;
  };

  return (
      <section
          className={`${amount > 4 ? 'progress-bar' : 'small-bar'}`}
          ref={barRef}
      >
        { displayPoints() }
      </section>
  );
};

export default ProgressBar;

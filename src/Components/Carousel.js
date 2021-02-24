
import { useState, useEffect, useRef } from "react";
import './assets/css/Carousel.css';

const SCROLLING_SPEED = 50;

const Carousel = ({ looped = false, children }) => {
  const [width, setWidth] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [scrolled, setScrolled] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [previousScroll, setPreviousScroll] = useState(0);
  const [activePoint, setActivePoint] = useState(0);
  const [slides, setSlides] = useState(0);
  const carouselRef = useRef();

  useEffect(() => {
    setWidth(carouselRef.current.clientWidth);
    setSlides(children.length);
    if (looped) {
      carouselRef.current.scrollLeft = width;
      stopScrolling();
    }
  }, [width]);

  useEffect(() => { //scrolling on swipe
    if (!scrolling) {
      const slide = Math.floor(scrollLeft / width);
      if (scrollLeft > previousScroll) {
        scrollCarousel(width + (width * slide), true);
      }
      else if (scrollLeft < previousScroll) {
        scrollCarousel(scrollLeft - width, false);
      }
    }
  }, [scrolling]);

  const stopScrolling = () => {
    let slide = Math.floor(carouselRef.current.scrollLeft / width);
    if (looped) slide -= 1;
    setActivePoint(slide);
    if (looped && slide === slides) {
      setActivePoint(0);
      carouselRef.current.scrollLeft = width;
    }
    else if (looped && slide === -1) {
      setActivePoint(slides - 1);
      carouselRef.current.scrollLeft = width * slides;
    }
    setScrollLeft(carouselRef.current.scrollLeft);
    setPreviousScroll(carouselRef.current.scrollLeft);
    setAnimation(false);
  };

  const scrollingAnimation = (scrollDifference, direction) => {
    let scrollBy = direction ? SCROLLING_SPEED : -SCROLLING_SPEED;
    requestAnimationFrame(() => {
      scrollDifference -= SCROLLING_SPEED;
      carouselRef.current.scrollBy(scrollBy, 0);
      if (scrollDifference - SCROLLING_SPEED <= 0) {
        scrollBy = direction ? scrollDifference : -scrollDifference;
        carouselRef.current.scrollBy(scrollBy, 0);
        stopScrolling();
      }
      else scrollingAnimation(scrollDifference, direction);
    });
  }

  const scrollCarousel = (scrollTo, direction) => {
    setAnimation(true);
    let scrollDifference = Math.abs(scrollTo - scrollLeft);
    if (!direction) scrollDifference += scrollLeft - previousScroll;
    scrollingAnimation(scrollDifference, direction);
  };

  const nextSlide = () => {
    setAnimation(true);
    scrollingAnimation(width, true);
  }

  const prevSlide = () => {
    setAnimation(true);
    scrollingAnimation(width, false);
  }

  window.addEventListener('resize', () => {
    setWidth(carouselRef.current.clientWidth);
  });

  const onMouseDown = (event) => {
    if (!animation) {
      setScrolling(true);
      setScrolled(event.clientX);
    }
  };

  window.addEventListener(('mouseup'),() => {
    setScrolling(false);
  });

  const onMouseMove = (event) => {
      if (scrolling) {
        carouselRef.current.scrollLeft = scrollLeft - event.clientX + scrolled;
        setScrollLeft(carouselRef.current.scrollLeft);
        setScrolled(event.clientX);
      }
  };

  const scrollToSlide = (slide) => {
    if (!animation) {
      setAnimation(true);
      if (looped) slide += 1;
      const scrollTo = slide * width;
      if (scrollTo > previousScroll) scrollCarousel(scrollTo, true);
      else if (scrollTo < previousScroll) scrollCarousel(scrollTo, false);
    }
  };

  const displayPoints = () => {
    let points = [];
    for (let slide = 0; slide < children.length; ++slide) {
      points.push(
          <p
              className={`progress-point ${activePoint === slide ? 'active-point' : ''}`}
              onClick={() => scrollToSlide(slide)}
              key={slide}
          >
            &bull;
          </p>
      );
    }
    return points;
  };

  return (
      <article
          className='carousel-container'
          ref={carouselRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
      >
        <article className='carousel-interface'>
          <section className='nav-buttons'>
            <div className='nav-button' onClick={prevSlide}>&#8592;</div>
            <div className='nav-button' onClick={nextSlide}>&#8594;</div>
          </section>
          <section className='progress-bar'>
            { displayPoints() }
          </section>
        </article>
        { looped ? children[children.length - 1] : null}
        { children }
        { looped ? children[0] : null }
      </article>
  );
};

export default Carousel;


import { useState, useEffect, useRef } from "react";
import './assets/css/Carousel.css';
import ProgressBar from "./ProgressBar";

const SCROLLING_SPEED = 50;

const Carousel = ({ looped = false, children }) => {
  const [width, setWidth] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [scrolled, setScrolled] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [previousScroll, setPreviousScroll] = useState(0);
  const [curSlide, setCurSlide] = useState(0);
  const [slides, setSlides] = useState(0);
  const carouselRef = useRef();
  const interfaceRef = useRef();

  useEffect(() => {
    setWidth(carouselRef.current.clientWidth);
    setSlides(children.length);
    if (width !== 0) {
      interfaceRef.current.style.backgroundColor = 'transparent';
      if (looped) {
        carouselRef.current.scrollLeft = width * (curSlide + 1);
        stopScrolling();
      }
    }
  }, [width]);

  useEffect(() => { //scrolling on swipe
    if (!scrolling) {
      const slide = Math.floor(scrollLeft / width);
      if (scrollLeft > previousScroll) {
        scrollCarouselTo(width + (width * slide), true);
      }
      else if (scrollLeft < previousScroll) {
        scrollCarouselTo(scrollLeft - width, false);
      }
    }
  }, [scrolling]);

  const stopScrolling = () => {
    let slide = Math.floor(carouselRef.current.scrollLeft / width);
    if (looped) slide -= 1;
    setCurSlide(slide);
    if (looped && slide === slides) {
      setCurSlide(0);
      carouselRef.current.scrollLeft = width;
    }
    else if (looped && slide === -1) {
      setCurSlide(slides - 1);
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

  const scrollCarouselTo = (scrollTo, direction) => {
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
    if (!looped) {
      carouselRef.current.scrollLeft = curSlide * carouselRef.current.clientWidth;
      setScrollLeft(carouselRef.current.scrollLeft);
    }
  });

  const onMouseDown = (event) => {
    if (!animation) {
      setScrolling(true);
      const currentScrolled = event.clientX !== undefined
          ? event.clientX
          : Math.floor(event.touches[0].clientX)
      ;
      setScrolled(currentScrolled);
    }
  };

  window.addEventListener(('mouseup'),() => {
    setScrolling(false);
  });
  window.addEventListener(('touchend'),() => {
    setScrolling(false);
  });

  const onMouseMove = (event) => {
    if (scrolling) {
      const currentScrolled = event.clientX !== undefined
          ? event.clientX
          : Math.floor(event.touches[0].clientX)
      ;
      carouselRef.current.scrollLeft = scrollLeft - currentScrolled + scrolled;
      setScrollLeft(carouselRef.current.scrollLeft);
      setScrolled(currentScrolled);
    }
  };

  const scrollToSlide = (slide) => {
    if (!animation) {
      setAnimation(true);
      if (looped) slide += 1;
      const scrollTo = slide * width;
      if (scrollTo > previousScroll) scrollCarouselTo(scrollTo, true);
      else if (scrollTo < previousScroll) scrollCarouselTo(scrollTo, false);
    }
  };

  const wrappedChildren = children.map((child, index) => {
    return <div className='container' key={index}>{child}</div>
  });

  return (
      <article
          className='carousel-container'
          ref={carouselRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onTouchStart={onMouseDown}
          onTouchMove={onMouseMove}
      >
        <article className='carousel-interface' ref={interfaceRef}>
          <section className='nav-buttons'>
            <div className='nav-button' onClick={prevSlide}>&#8592;</div>
            <div className='nav-button' onClick={nextSlide}>&#8594;</div>
          </section>
          <section className={'slide-counter-container'}>
            <div className='slide-counter'>
              {(curSlide + 1) + '/' + children.length}
            </div>
          </section>

          <ProgressBar
              amount={children.length}
              selected={curSlide}
              onClickPoint={scrollToSlide}
          />
        </article>
        { looped ? wrappedChildren[wrappedChildren.length - 1] : null}
        { wrappedChildren }
        { looped ? wrappedChildren[0] : null }
      </article>
  );
};

export default Carousel;

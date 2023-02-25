import React, { useEffect, useRef, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import { ReactComponent as X } from "../assets/x.svg";
import './Gallery.css';

function Gallery({ index, items, setGallery }) {
  const [slideDuration, setSlideDuration] = useState(0);
  const galleryRef = useRef();

  const closeGallery = () => {
    setGallery({ isOpen: false, index: null });
  };

  const onKeyEscape = (e) => {
    if (e.key === 'Escape') {
      closeGallery();
    }
  }

  useEffect(() => {
    galleryRef.current.fullScreen();
    galleryRef.current.slideToIndex(index);
    setSlideDuration(300);
  }, [index]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyEscape);
    return () => {
      document.removeEventListener('keydown', onKeyEscape);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="wrapper">
      <button id="closeBtn" className="image-gallery-icon" onClick={closeGallery}>
        <X id="close-icon" className="image-gallery-svg" />
      </button>
      <div id="gallery-container">
        <ReactImageGallery
          ref={galleryRef}
          items={items}
          slideDuration={slideDuration}
          slideInterval={2500}
          showIndex
          useBrowserFullscreen={false}
          showFullscreenButton={false}
        />
      </div>
    </div>
  );
}

export default Gallery;

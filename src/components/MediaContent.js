import React, { useEffect, useRef, useState } from "react";
import ImageGallery from 'react-image-gallery';
import "./MediaContent.css";

function MediaContent({ content, setContent }) {
  console.log("HERE is CONTENT", content);
  const [isOpenGallery, setIsOpenGallery] = useState(false);
  const [slideDuration, setSlideDuration] = useState(0);
  const [galleryContent, setGalleryContent] = useState([]);
  const galleryRef = useRef();

  const toGallery = (photos) => {
    const galleryArr = [];
    photos.forEach((photo) => {
      galleryArr.push({
        thumbnail: photo.src.tiny,
        original: photo.src.large,
        fullscreen: photo.src.original,
        embedUrl: photo.url,
        description: (
          <>
            Photo by <a href={photo.photographer_url}>{photo.photographer}</a>
          </>
        ),
      });
    });
    return galleryArr;
  };

  const onLoadMore = (url) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`An error has been occured: ${response.status}`);
        }
        return response.json();
      })
      .then(({ next_page, photos }) => {
        // if (photos.length > 0) {
          setContent((prevState) => ({
            ...prevState,
            next_page,
            photos: [...prevState.photos, ...photos],
          }));
          setGalleryContent(prevState => [...prevState, ...toGallery(photos)])
        // }
      })
      .catch((error) => {
        console.error(`Could not get content: ${error}`);
      });
  };

  const openGallery = (index) => {
    // console.log('INDEX iS', index)
    // console.log(galleryRef.current)
    console.log(isOpenGallery)
    setSlideDuration(400);
    setIsOpenGallery(true);
    galleryRef.current.slideToIndex(index);
  }

  const closeGallery = (e) => {
    e.stopPropagation();
    setIsOpenGallery(false);
  }

  useEffect(() => {
    if (content.total_results > 0) {
      setGalleryContent(toGallery(content.photos))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content.query]);
  
  return (
    <div className="content-wrapper">
      {/* Search Result Statistics */}
      {content.total_results !== undefined && (
        <div className="stats">
          Total result: <span>{content.total_results}</span>
        </div>
      )}

      {/* Media Container */}
      <div className="media-container">
        {content.total_results ? (
          content.photos.map((photo, index) => (
            <div
              key={photo.id}
              className="content"
              style={{
                width: `${Math.floor((photo.width * 350) / photo.height)}px`,
                backgroundColor: photo.avg_color,
              }}
              role="button"
              onClick={() => openGallery(index)}
            >
              <img src={photo.src.medium} alt={photo.alt} loading="lazy" />
            </div>
          ))
        ) : (
          <p>It seems there aren't any matches for your search term</p>
        )}
      </div>
      {content.next_page && (
        <button id="load_btn" onClick={() => onLoadMore(content.next_page)}>
          Load More
        </button>
      )}

      {isOpenGallery && (
        <div className="wrapper" onClick={(e) => closeGallery(e)}>
          <ImageGallery
            ref={galleryRef}
            items={galleryContent}
            slideDuration={slideDuration}
          />
        </div>
      )}
    </div>
  );
}

export default MediaContent;

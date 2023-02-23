import React, { useEffect, useState } from "react";
import { client } from "../api/pexelAPI";
import Gallery from "./Gallery";
import { ReactComponent as UserIcon } from "../assets/user.svg";
import { ReactComponent as Enlarge } from "../assets/enlarge.svg";
import "./MediaContent.css";

function MediaContent({ content, setContent }) {
  console.log("HERE is CONTENT", content);
  const [gallery, setGallery] = useState({ isOpen: false, index: null });
  const [galleryContent, setGalleryContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toGallery = (photos) => {
    const galleryArr = [];
    photos.forEach((photo) => {
      galleryArr.push({
        thumbnail: photo.src.tiny,
        thumbnailLoading: "eager",
        original: photo.src.large,
        originalHeight: "100%",
        loading: "lazy",
        // embedUrl: photo.url,
        // thumbnailLabel: photo.alt,
        originalAlt: photo.alt,
        thumbnailAlt: photo.alt,
        thumbnailTitle: photo.alt,
        description: (
          <>
            <UserIcon className="image-gallery-icon svg-icon" id="user-icon" />
            <a
              id="photo-author"
              href={photo.photographer_url}
              target="_blank"
              rel="noreferrer"
            >
              {photo.photographer}
            </a>
            <a
              href={photo.src.original}
              target="_blank"
              rel="noreferrer"
              id="enlarge-icon"
            >
              <Enlarge className="image-gallery-icon svg-icon" />
            </a>
          </>
        ),
      });
    });
    return galleryArr;
  };

  const onLoadMore = () => {
    setIsLoading(true);
    client.photos
      .search({ query: content.query, page: content.page, per_page: 20 })
      .then(({ page, next_page, photos }) => {
        // if (photos.length > 0) {
        setContent((prevState) => ({
          ...prevState,
          next_page,
          page: page + 1,
          photos: [...prevState.photos, ...photos],
        }));
        setGalleryContent((prevState) => [...prevState, ...toGallery(photos)]);
        // }
      })
      .catch((error) => {
        console.error(`Could not get content: ${error}`);
      })
      .finally(() => setIsLoading(false));
  };

  const onZoomIn = (index) => {
    setGallery({ isOpen: true, index });
  };

  useEffect(() => {
    if (content.total_results > 0) {
      setGalleryContent(toGallery(content.photos));
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
        {content.query && (content.total_results ? (
          <>
            {content.photos.map((photo, index) => (
              <div
                key={photo.id}
                className="content"
                style={{
                  width: `${Math.floor((photo.width * 130) / photo.height)}px`,
                  backgroundColor: photo.avg_color,
                }}
                role="button"
                onClick={() => onZoomIn(index)}
              >
                <img src={photo.src.small} alt={photo.alt} title={photo.alt} loading="lazy" />
              </div>
            ))}
            <div id="last-content"></div>
          </>
        ) : (
          <p id="no-result-text">It seems there aren't any matches for your search term</p>
        ))}
      </div>
      {content.next_page && (
        <button id="load_btn" onClick={onLoadMore} disabled={isLoading}>
          {isLoading ? (<span id="loading-icon"> Loading...</span>) : "Load More"}
        </button>
      )}

      {gallery.isOpen && (
        <Gallery
          index={gallery.index}
          items={galleryContent}
          setGallery={setGallery}
        />
      )}
    </div>
  );
}

export default MediaContent;

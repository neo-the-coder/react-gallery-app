import React from "react";
import "./MediaContent.css";

function MediaContent({ content, setContent }) {
  console.log('HERE is CONTENT', content);
  const { total_results, next_page, photos } = content;
  console.log('Parameters', total_results, next_page, photos)

  const onLoadMore = async (url) => {
    console.log("My url is", url);
    const nextContent = await await fetch(url).then((response) =>
      response.json()
    );
    const { total_results, next_page, photos } = nextContent;
    console.log('Here goes next', nextContent);
    setContent((prevState) => ({total_results, next_page, photos: [...prevState.photos, ...photos] }))
    // setContent((prevState) => ({
    //   ...prevState,
    //   next_page: nextContent.next_page,
    //   photos: [...prevState.photos, nextContent.photos],
    // }));
    //   .then((content) => setContent(content))
    //   .catch((e) => console.log(e));
  };

  return (
    <div className="content-wrapper">
      {total_results !== undefined && (<div className="stats">Total result: <span>{total_results}</span></div>)}
      <div className="media-container">
        {total_results ? (
          photos.map((photo) => (
            <div key={photo.id} className="content">
              <img src={photo.src.medium} alt={photo.alt} />
            </div>
          ))
        ) : (
          <p>No images for the search term</p>
        )}
      </div>
      <button id="load_btn" onClick={() => onLoadMore(next_page)}>Load More</button>
      <div className="pages">{/* Pagination here */}</div>
    </div>
  );
}

export default MediaContent;

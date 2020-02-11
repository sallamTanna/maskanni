/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useCallback } from "react";
import ImageViewer from "react-simple-image-viewer";

import placeHolder from "../../assets/place-holder.png";

import "./style.css";

function generateGallery(mapImages, openImageViewer) {
  // if idx === 0 -> tall
  // if idx === 1 -> wide
  const imageSize = ["tall", "wide", "half-tall"];

  return (
    // right main pic
    <>
      {mapImages.map((src, idx) => {
        return (
          <div
            className={`${imageSize[idx]} shadow center pointer`}
            key={Date.now() / Math.random()}
          >
            <img onClick={() => openImageViewer(idx)} src={src} alt="main pic" />
          </div>
        );
      })}
      <div className="shadow center pointer">
        <p>عرض المزيد</p>
      </div>
    </>
  );
}

function Gallery({ images }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback(index => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  let mapImages = images;

  if (images.length < 4) {
    const diff = 4 - images.length;
    for (let i = 0; i < diff; i++) {
      mapImages = [...mapImages, placeHolder];
    }
  }

  return (
    <div className="gallery">
      {generateGallery(mapImages, openImageViewer)}
      {isViewerOpen && (
        <ImageViewer
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
          src={mapImages}
          currentIndex={currentImage}
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
}

export default Gallery;

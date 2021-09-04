import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';

import s from './ImageGallery.module.css';

export default function ImageGallery({ images }) {
  return (
    <>
      <ul className={s.gallery}>
        {images && <ImageGalleryItem images={images} />}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

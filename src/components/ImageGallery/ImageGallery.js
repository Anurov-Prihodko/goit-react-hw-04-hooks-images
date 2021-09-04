import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';

import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    images: null,
  };

  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
  };

  render() {
    const { images } = this.props;

    return (
      <>
        <ul className={s.gallery}>
          {images && <ImageGalleryItem key={images.id} images={images} />}
        </ul>
      </>
    );
  }
}

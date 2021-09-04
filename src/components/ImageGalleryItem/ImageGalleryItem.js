import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import s from './ImageGalleryItem.module.css';
import Modal from '../Modal';

export default function ImageGalleryItem({ images }) {
  const [imgIdx, setImgIdx] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClick = index => {
    setImgIdx(index);
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(() => !showModal);
  };

  return (
    <>
      {images.map(({ webformatURL, tags }, index) => (
        <li
          key={shortid.generate()}
          className={s.item}
          onClick={() => handleClick(index)}
        >
          <img src={webformatURL} alt={tags} className={s.image} />
        </li>
      ))}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={images[imgIdx].largeImageURL} alt={images[imgIdx].tags} />
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
};

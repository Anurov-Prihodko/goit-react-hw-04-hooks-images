import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import s from './ImageGalleryItem.module.css';
import Modal from '../Modal';

export default class ImageGalleryItem extends Component {
  state = {
    imgIdx: null,
    showModal: false,
  };

  handleClick(index) {
    this.setState({ imgIdx: index, showModal: true });
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images } = this.props;
    const { imgIdx, showModal } = this.state;

    return (
      <>
        {images.map(({ webformatURL, tags }, index) => (
          <li
            key={shortid.generate()}
            className={s.item}
            onClick={() => this.handleClick(index)}
          >
            <img src={webformatURL} alt={tags} className={s.image} />
          </li>
        ))}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={images[imgIdx].largeImageURL} alt={images[imgIdx].tags} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
  key: PropTypes.number,
};

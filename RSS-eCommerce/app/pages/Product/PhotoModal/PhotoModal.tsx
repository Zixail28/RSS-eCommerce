import React, { useState } from "react";
import Modal from "react-modal";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import styles from "./PhotoModal.module.scss";

interface PhotoModalProps {
  isOpen: boolean;
  images: GalleryImage[];
  onClose: () => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ isOpen, images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.customStyles}
      contentLabel="Photo Modal"
    >
      <button onClick={onClose}>Close</button>
      <Gallery
        items={images}
        startIndex={currentIndex}
        onSlide={(index: number) => setCurrentIndex(index)}
        onClick={handleImageClick}
      />
    </Modal>
  );
};

export default PhotoModal;

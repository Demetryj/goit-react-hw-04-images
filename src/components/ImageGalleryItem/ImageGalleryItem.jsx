import PropTypes from 'prop-types';
import css from './imageGalleryItem.module.css';

export const ImageGalleryItem = ({
  onModal,
  onHandleModal,
  image: { id, tags, webformatURL, largeImageURL },
}) => {
  const handleClick = () => {
    onModal();
    onHandleModal(largeImageURL);
  };
  return (
    <li className={css.imageGalleryItem} onClick={handleClick}>
      <img
        src={webformatURL}
        alt={tags}
        datalargeurl={largeImageURL}
        className={css.imageGalleryItemImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  onModal: PropTypes.func.isRequired,
  onHandleModal: PropTypes.func.isRequired,
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};

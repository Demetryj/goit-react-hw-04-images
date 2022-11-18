import PropTypes from 'prop-types';

import { ImageGalleryItem } from '../ImageGalleryItem';
import css from './imageGallery.module.css';

export const ImageGallery = ({ imageItems, ...otherProps }) => {
  return (
    <ul className={css.imageGallery}>
      {imageItems.map(item => (
        <ImageGalleryItem
          image={item}
          key={item.webformatURL}
          {...otherProps}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  imageItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

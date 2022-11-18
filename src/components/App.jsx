import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { fetchImages } from '../services/fetchImages';
import { Button } from './Button';
import { Modal } from './Modal/';
import css from './app.module.css';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);

  const getSearchQuery = event => {
    event.preventDefault();
    const inputValue = event.target.elements.query.value.trim().toLowerCase();

    if (searchQuery === inputValue) {
      return;
    }

    setSearchQuery(inputValue);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        if (searchQuery === '') {
          return;
        }

        setLoaded(true);

        const searchImages = await fetchImages(searchQuery, page);

        if (searchImages.length < 1) {
          toast.info(
            `Sorry, nothing found for your search "${searchQuery}" ! Try another query.`
          );
        }

        setImages(prevImages => [...prevImages, ...searchImages]);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoaded(false);
      }
    };
    fetch();
  }, [searchQuery, page]);

  const onLoadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModal = url => {
    setLargeImageURL(url);
  };

  return (
    <div className={css.app}>
      <Searchbar handleSubmit={getSearchQuery} />

      {searchQuery && (
        <ImageGallery
          imageItems={images}
          onModal={openModal}
          onHandleModal={handleModal}
        />
      )}

      {loaded && (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="blue"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ justifyContent: 'center' }}
          visible={true}
        />
      )}

      {images.length > 0 && !loaded && (
        <Button handleClickLoadMore={onLoadMoreImages}>Load more</Button>
      )}
      {isModalOpen && (
        <Modal onCloseModal={closeModal} isModalOpen={isModalOpen}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

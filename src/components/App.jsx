import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { fetchImages } from '../services/fetchImages';
import { Button } from './Button';
import Modal from './Modal/';
import css from './app.module.css';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    error: null,
    loaded: false,
    isModalOpen: false,
    largeImageURL: null,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page)
      try {
        if (searchQuery === '') {
          return;
        }
        this.setState({ loaded: true });

        const searchImages = await fetchImages(searchQuery, page);

        if (searchImages.length < 1) {
          toast.info(
            `Sorry, nothing found for your search "${searchQuery}" ! Try another query.`
          );
        }

        this.setState(prevState => {
          return {
            images: [...prevState.images, ...searchImages],
          };
        });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.setState({ loaded: false });
      }
  }

  getSearchQuery = event => {
    event.preventDefault();
    const inputValue = event.target.elements.query.value.trim().toLowerCase();

    if (this.state.searchQuery === inputValue) {
      return;
    }
    this.setState({ searchQuery: inputValue, page: 1, images: [] });
  };

  onLoadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleModal = url => {
    this.setState({ largeImageURL: url });
  };

  render() {
    const { searchQuery, images, loaded, isModalOpen, largeImageURL } =
      this.state;
    return (
      <div className={css.app}>
        <Searchbar handleSubmit={this.getSearchQuery} />

        {searchQuery && (
          <ImageGallery
            imageItems={images}
            onModal={this.openModal}
            onHandleModal={this.handleModal}
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
          <Button handleClickLoadMore={this.onLoadMoreImages}>Load more</Button>
        )}
        {isModalOpen && (
          <Modal onCloseModal={this.closeModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default App;

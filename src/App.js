import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import { fetchImages, NUMBER_OF_PHOTOS } from './services/api';
import Button from './components/Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    requestName: '',
    imgArray: [],
    numPage: 1,
    loading: false,
    error: null,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const { requestName, numPage } = this.state;

    if (prevState.requestName !== requestName) {
      this.imageApiService(requestName, numPage);
    }
  }

  imageApiService = () => {
    const { requestName, numPage, loading } = this.state;
    this.setState({ loading: true });

    if (loading) {
      this.setState({ status: Status.PENDING });
    }

    fetchImages(requestName, numPage)
      .then(response => {
        if (response.hits.length === 0) {
          this.setState({ error: true, status: Status.REJECTED });
          toast.error('Something went wrong! Please enter a correct request.');
          return;
        }

        this.setState({
          imgArray: [...this.state.imgArray, ...response.hits],
          status: Status.RESOLVED,
          numPage: this.state.numPage + 1,
        });

        if (response.hits.length < NUMBER_OF_PHOTOS) {
          this.setState({ status: Status.IDLE });
          toast.info('No more photos for your request');
        }

        if (numPage !== 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }

        toast.success('Congratulations! You found your photo.', {
          icon: '🚀',
        });
      })
      // .then(() => {
      //   if (numPage !== 1) {
      //     window.scrollTo({
      //       top: document.documentElement.scrollHeight,
      //       behavior: 'smooth',
      //     });
      //   }
      // })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
    // .finally(() => this.setState({ status: Status.IDLE }));
  };

  handleFormSubmit = requestName => {
    this.setState({
      requestName,
      imgArray: [],
      numPage: 1,
      loading: true,
    });
  };

  handleLoadMore = () => {
    const { requestName, numPage } = this.state;

    this.setState(() => ({
      numPage: this.state.numPage + 1,
      loading: true,
    }));
    this.imageApiService(requestName, numPage);
  };

  render() {
    const { imgArray, requestName, status } = this.state;

    return (
      <div className="Container">
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery images={imgArray} />
        {!requestName && (
          <h2 className="EnterYourRequest">Enter your request</h2>
        )}

        {status === Status.PENDING && (
          <div className="Loader">
            <Loader type="Grid" color="#00BFFF" height={100} width={100} />
          </div>
        )}

        {status === Status.RESOLVED && status !== Status.PENDING && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}
        <ToastContainer autoClose={3500} />
      </div>
    );
  }
}

export default App;

import { useState, useEffect } from 'react';
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

export default function App() {
  const [requestName, setRequestName] = useState('');
  const [imgArray, setImgArray] = useState([]);
  const [numPage, setNumPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!requestName) {
      return;
    }

    function imageApiService() {
      setStatus(Status.PENDING);

      fetchImages(requestName, numPage)
        .then(response => {
          // setStatus(Status.PENDING);
          if (response.hits.length === 0) {
            setError(true);
            setStatus(Status.REJECTED);
            toast.error(
              'Something went wrong! Please enter a correct request.',
            );
            return;
          }

          setImgArray(state => [...state, ...response.hits]);
          setStatus(Status.RESOLVED);

          if (response.hits.length < NUMBER_OF_PHOTOS) {
            setStatus(Status.IDLE);
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
        .catch(error => setError(error), setStatus(Status.REJECTED));
      // .finally(() => setStatus(Status.IDLE));
    }

    imageApiService();
    setStatus(Status.IDLE);
  }, [numPage, requestName]);

  const handleFormSubmit = requestName => {
    setRequestName(requestName);
    setImgArray([]);
    setNumPage(1);
    setStatus(Status.PENDING);
  };

  const handleLoadMore = () => {
    setNumPage(state => state + 1);
    setStatus(Status.PENDING);
  };

  return (
    <div className="Container">
      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery images={imgArray} />
      {!requestName && <h2 className="EnterYourRequest">Enter your request</h2>}

      {status === Status.PENDING && (
        <div className="Loader">
          <Loader type="Grid" color="#00BFFF" height={100} width={100} />
        </div>
      )}

      {status !== Status.PENDING &&
        status !== Status.IDLE &&
        status !== Status.REJECTED && (
          <Button onClick={handleLoadMore}>Load more</Button>
        )}

      <ToastContainer autoClose={3500} />
    </div>
  );
}

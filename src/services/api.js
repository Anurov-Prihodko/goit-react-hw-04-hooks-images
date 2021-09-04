const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22328016-b5b8589f64a6d5a0340d8aa33';
const NUMBER_OF_PHOTOS = 12;

function fetchImages(requestName, numPage = 1) {
  return fetch(
    `${BASE_URL}?image_type=photo&orientation=horizontal&q=${requestName}&page=${numPage}&per_page=${NUMBER_OF_PHOTOS}&key=${API_KEY}`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`No images are available on request: ${requestName}`),
    );
  });
}

export { fetchImages, NUMBER_OF_PHOTOS };

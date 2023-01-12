import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
refs.input = refs.form.firstElementChild;
const lightbox = new SimpleLightbox('.gallery  a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const axios = require('axios').default;

//functions

async function photoSearch(userRequest, page) {
  const API_KEY = '32716636-8a2ea718c4d85502bc83e063b';
  const BASE_URL = 'https://pixabay.com/api/';

  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${userRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );

  if (!response.data.total || !refs.input.value) {
    throw notifications.onError;
  }

  // const images = response.data;
  // return images

  return response;
}

function createMarkup({ data: { totalHits, hits } }) {
  notifications.showTotalHits(totalHits);
  const markup = hits
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<a href='${largeImageURL}'><div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width='280'/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b><br>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b><br>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b><br>
      ${downloads}
    </p>
  </div>
</div></a>`
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  refs.loadMoreBtn.hidden = false;
  lightbox.refresh();
}

function clearGallery() {
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.hidden = true;
}

const notifications = {
  onError() {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  },

  endOfCollection() {
    Notify.info("We're sorry, but you've reached the end of search results.");
  },

  showTotalHits(totalHits) {
    Notify.success(`Hooray! We found ${totalHits} images.`);
  },
};

export { refs, photoSearch, clearGallery, createMarkup, notifications };

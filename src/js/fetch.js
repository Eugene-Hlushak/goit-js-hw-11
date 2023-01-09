import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
refs.input = refs.form.firstElementChild;

const axios = require('axios').default;
const API_KEY = '32716636-8a2ea718c4d85502bc83e063b';
const BASE_URL = 'https://pixabay.com/api/';

//functions

function photoSearch(userRequest, page) {
  axios
    .get(
      `${BASE_URL}?key=${API_KEY}&q=${userRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=5`
    )
    .then(response => {
      if (!response.data.total || !refs.input.value) {
        throw onError;
      }
      console.log(response);
      const images = response.data.hits;
      return images;
    })
    .then(createMarkup)
    .catch(onError);
}

function onError() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function createMarkup(images) {
  const markup = images.map(
    image => `<div class="photo-card">
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width='280'/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br>
      ${image.likes}
    </p>
    <p class="info-item">
      <b>Views</b><br>
      ${image.views}
    </p>
    <p class="info-item">
      <b>Comments</b><br>
      ${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b><br>
      ${image.downloads}
    </p>
  </div>
</div>`
  );
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function clearGallery() {
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
}

export { refs, photoSearch, clearGallery };

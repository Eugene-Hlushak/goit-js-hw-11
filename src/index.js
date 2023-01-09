import { refs, photoSearch, clearGallery } from './js/fetch';

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', loadMore);
let page = 1;

function onSubmit(e) {
  page = 1;
  e.preventDefault();
  const userRequest = refs.input.value;
  clearGallery();
  photoSearch(userRequest, page);
}

function loadMore() {
  page += 1;
  const currentRequest = refs.input.value;
  photoSearch(currentRequest, page);
}

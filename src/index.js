import {
  refs,
  photoSearch,
  clearGallery,
  createMarkup,
  notifications,
} from './js/fetch';

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', loadMore);
let page = 1;

function onSubmit(e) {
  e.preventDefault();
  clearGallery();
  photoSearch(refs.input.value, page)
    .then(createMarkup)
    .catch(notifications.onError);
}

function loadMore() {
  page += 1;
  if (page > 13) {
    refs.loadMoreBtn.hidden = true;
    notifications.endOfCollection();
    return;
  }
  photoSearch(refs.input.value, page).then(createMarkup);
}

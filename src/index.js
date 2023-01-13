import {
  refs,
  photoSearch,
  clearGallery,
  createMarkup,
  notifications,
  smoothScroll,
} from './js/fetch';

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', loadMore);
refs.gallery.addEventListener('click', onClickGallery);
let page = 1;

function onSubmit(e) {
  e.preventDefault();
  clearGallery();
  try {
    photoSearch(refs.input.value, page).then(response =>
      createMarkup(response, notifications.showTotalHits(response))
    );
  } catch {
    notifications.onError();
  }
}

function loadMore() {
  page += 1;
  if (page > 13) {
    refs.loadMoreBtn.hidden = true;
    refs.loadMoreBtn.classList.remove('load-more');
    notifications.endOfCollection();
    return;
  }

  photoSearch(refs.input.value, page).then(response => {
    createMarkup(response);
    smoothScroll();
  });
}

function onClickGallery(e) {
  e.preventDefault();
}

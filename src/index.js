import {
  refs,
  photoSearch,
  clearGallery,
  createMarkup,
  notifications,
  smoothScroll,
  showTotalHits,
  hideLoadMoreBtn,
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
      createMarkup(response, showTotalHits(response))
    );
  } catch (e) {
    console.log(e);
  }
}

function loadMore() {
  page += 1;
  if (page > 13) {
    hideLoadMoreBtn();
    Notify.info("We're sorry, but you've reached the end of search results.");
    return;
  }
  try {
    photoSearch(refs.input.value, page).then(response => {
      createMarkup(response);
      smoothScroll();
    });
  } catch (e) {}
}

function onClickGallery(e) {
  e.preventDefault();
}

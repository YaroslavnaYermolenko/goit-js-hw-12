import fetchData from './js/pixabay-api.js';
import { fillGallery, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '46912629-60bc072e101e3ae51ad98b0ad';
const list = document.querySelector('.list');
const form = document.querySelector('.searching-form');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.load-more');
form.addEventListener('submit', handlerSubmit);
loadMore.addEventListener('click', onLoadMore);
let page = 1;
let per_page = 15;

async function onLoadMore(e) {
  loadMore.disabled = true;
  page += 1;
  loader.style.display = 'block';
  const request = form.elements.search.value.trim();
  try {
    const dataList = await fetchData(request, page);
    loader.style.display = 'none';
    fillGallery(dataList.hits);
    if (page >= dataList.totalHits / per_page) {
      loadMore.classList.add('visually-hidden');
      showAlert('the end');
    }
    const galleryRect = list.lastElementChild.getBoundingClientRect();
    window.scrollBy({
      top: galleryRect.height * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    showAlert('Ooops...');
  } finally {
    loadMore.disabled = false;
  }
}

async function handlerSubmit(e) {
  e.preventDefault();
  clearGallery();
  page = 1;
  loader.style.display = 'block';
  const request = e.target.elements.search.value.trim();
  if (!request) {
    loader.style.display = 'none';
    showAlert('error');
    return;
  }
  const dataImages = await fetchData(request);
  loader.style.display = 'none';
  if (parseInt(dataImages.totalHits)) {
    fillGallery(dataImages.hits);
    loadMore.classList.remove('visually-hidden');
    if (Math.ceil(dataImages.totalHits / per_page) === 1) {
      loadMore.classList.add('visually-hidden');
    }
  } else {
    loadMore.classList.add('visually-hidden');
    clearGallery();
    showAlert('sorry');
  }
}


function showAlert(type) {
  let message = '';
  switch (type) {
    case 'error':
      message = 'Request cannot be empty, please, enter text';
      break;
    case 'sorry':
      message =
        'Sorry, there are no images matching your search query. Please try again!';
      break;
    case 'the end':
      message = "We're sorry, but you've reached the end of search results.";
      break;
    default:
      message = type;
      break;
  }
  iziToast.error({
    title: type === 'error' ? 'Error' : '',
    message: message,
    position: 'topRight',
    maxWidth: '400px',
    color: '#EF4040',
    theme: 'dark',
  });
}

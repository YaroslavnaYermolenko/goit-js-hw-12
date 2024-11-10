import fetchData from './js/pixabay-api.js';
import { fillGallery, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '46912629-60bc072e101e3ae51ad98b0ad';
const list = document.querySelector('.list');
const form = document.querySelector('.searching-form');
const loader = document.querySelector('.loader');
form.addEventListener('submit', handlerSubmit);

async function handlerSubmit(e) {
  e.preventDefault();
  list.innerHTML = '';
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
  } else {
    clearGallery();
    showAlert('sorry');
  }
}
function showAlert(type) {
  iziToast.error({
    title: type === 'error' ? 'Error' : '',
    message:
      type === 'error'
        ? 'Request cannot be empty, please, enter text'
        : `Sorry, there are no images matching your search query. Please try again!`,
    position: 'topRight',
    maxWidth: '400px',
    color: '#EF4040',
    theme: 'dark',
  });
}

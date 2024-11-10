import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const list = document.querySelector('.list');
const sLightBox = new SimpleLightbox('.list .list-item a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function fillGallery(arr) {
  const images = arr
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="list-item"><a href="${largeImageURL}">
            <div class="image-box">
              <img src="${webformatURL}" alt="${tags}" width="360"></div>
              <ul class="description">
                <li><p>Likes:</p><span>${likes}</span></li>
                <li><p>Views:</p><span>${views}</span></li>
                <li><p>Comments:</p><span>${comments}</span></li>
                <li><p>Downloads:</p><span>${downloads}</span></li>
              </ul>
              
            </a></li>`
    )
    .join('');
  list.insertAdjacentHTML('beforeend', images);

  sLightBox.refresh();
}
export function clearGallery() {
  list.innerHTML = '';
}

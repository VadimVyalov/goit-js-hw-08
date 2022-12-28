// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

// console.log(galleryItems);
const makeGalleryItem = ({ preview, original, description }) => {
  return `
  <a class="gallery__link" href=${original}>
    <img
      class="gallery__image"
      src=${preview}
      alt=${description}
    />
  </a>`;
};

const list = galleryItems.map(makeGalleryItem).join(' ');
const galleryList = document.querySelector('.gallery');

galleryList.insertAdjacentHTML('afterbegin', list);

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

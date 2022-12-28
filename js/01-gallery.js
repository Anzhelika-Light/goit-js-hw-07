import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

let currentIndex = 0;

const instance = basicLightbox.create(
  `
      <div class="modal">
          <img src="" alt="" />
      </div>
    `,
  {
    onShow: (instance) => {
      document.addEventListener("keydown", pressKeyBoard);
    },
    onClose: (instance) => {
      document.removeEventListener("keydown", pressKeyBoard);
    },
  }
);

// Task 1.2. Markup rendering
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

//Task 1.2. Event delegation
galleryContainer.addEventListener('click', onGalleryContainerClick);

//Task 1.1. Markup creation
function createGalleryMarkup(galleryItems) {
  return galleryItems.map(({preview, original, description}, index) => {
    // Створюємо розмітку, де зображення в тезі img - це мініатюра, а у тезі посилання - велике зображення
    return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    data-index="${index}"
                    alt="${description}"
                />
            </a>
        </div>
    `;
  }).join('');
}

// Task 1.2. Original img url getting
function onGalleryContainerClick (event) {
    event.preventDefault();

    if (event.target.nodeName !== 'IMG') {
        return;
    }       

    currentIndex = Number(event.target.dataset.index);
    // Task 1.4 - 1.5
    const elem = instance.element().querySelector("img");
    elem.src = event.target.dataset.source;

    instance.show();
}

//when modal window is open adding Ecs keydown event listener on document
function pressKeyBoard(event) {
    //checking if Esc pressed
    console.log("Hello", event.code);
    if (event.code === "Escape") {
      instance.close();
    }
    if (event.code === "ArrowRight") {
      currentIndex += 1;
      if (currentIndex === galleryItems.length) {
        currentIndex = 0;
      }
      const elem = instance.element().querySelector("img");
      elem.src = galleryItems[currentIndex].original;
    }
    if (event.code === "ArrowLeft") {
      currentIndex -= 1;
      if (currentIndex === -1) {
        currentIndex = galleryItems.length - 1;
      }
      const elem = instance.element().querySelector("img");
      elem.src = galleryItems[currentIndex].original;
    }
  }
  

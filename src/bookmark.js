import $ from 'jquery';
import store from   './store';
import api from './api';


const generateBookMarkElement = function (bookmark) {
  let bookmarkTitle = `<span class='js-title'>${bookmark.title}</span>`;
  let bookmarkRating = generateRatingElement(bookmark.rating);
  let bookmarkId = bookmark.id;
  if (bookmark.expanded === true) {
    return `
      <li  class="bookmarkItem" data-item-id="${bookmark.id}">
        <h3> ${bookmarkTitle}</h3>
      <div class='rating'>${bookmarkRating}</div>
      <article class='description'>${bookmark.desc}<span class="fas fa-trash"></span></article>
      <a href="${bookmark.url}">link</a>
     </li>`;
  } else {
    return `
      <li class="bookmarkItem" data-item-id="${bookmark.id}">
      <h3>${bookmarkTitle}</h3>
      <div class='rating'>${bookmarkRating}</div>
      </li> `;
  }
};

const generateRatingElement = function (rating) {
  let ratingHTML = [];
  for (let i = 0; i < rating ; i ++){
    ratingHTML.push('<span class = "fas fa-star"></span>');
  }
  return ratingHTML.join('');
};

const generateBookMarkString = function(bookmark) {
  const bookmarks = bookmark.map((item) => generateBookMarkElement(item));
  return bookmarks.join('');
};
const formTemplate = function() {
  return `<form id='#js-bookmark-form'>
    <fieldset>
      <legend>Add Bookmark:</legend>
      Title: <input type="text" required class='js-title'><br>
      URL: <input type="text" required class='js-url'><br>
      <textarea placeholder="description" class='js-description'></textarea><br>
      <select  class='js-rating'>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
        <option value="5">Five</option>
      </select>
      <input type="submit" class='js-bookmark-submit'>
      <p class='errorMessage'></p>
    </fieldset>

    </form>`;
};
const render = function () {
  if (store.adding === false) {
    let bookmarks = [...store.bookmarks];
    let toRender = [];
    let rateFilter = parseInt(getFilterValue());
    for (let i = 0; i < bookmarks.length; i ++) {
      if (bookmarks[i].rating <= rateFilter) {
        toRender.push(bookmarks[i]);
      }
    }
    const bookmarkString = generateBookMarkString(toRender);
    $('.js-bookmarks').html(bookmarkString);
  } else {
    let formString = formTemplate();
    $('.js-bookmarks').html(formString);
  }
   

};


const handleAddBookMarkSubmit = function() {
  $('main').submit(function (event) {
    event.preventDefault();
    const bookmarkTitle = $('.js-title').val();
    const bookmarkUrl = $('.js-url').val();
    const bookmarkDescription = $('.js-description').val();
    const bookmarkRating = $('.js-rating').val();
    api.addBookMark(bookmarkTitle, bookmarkUrl, bookmarkDescription, bookmarkRating)
      .then((newItem) => {
        store.addItem(newItem);
        store.toggleAdding();
        console.log(store.adding);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        outputError(store.error);
      });
  });

};
const outputError = function (error) {
  $('.js-bookmarks').find('.errorMessage').append(`${error}`);
};

const handleAddBookMark = function () {
  $('body').on('click', '.js-add-bookmark', event => {
    event.preventDefault();
    store.toggleAdding();
    console.log(store.adding);
    render();
  });
};

const handleExpand = function (){
  $('.js-bookmarks').on('click', '.js-title', event => {
    const id = getItemIdFromElement(event.currentTarget);
    console.log(id);
    store.toggleExpand(id);
    render();
  });
};

const handleDelete = function() {
  $('.js-bookmarks').on('click', '.fa-trash', event => {
    const id = getItemIdFromElement(event.currentTarget);
    store.findAndDelete(id);
    render();
  });
};

const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.bookmarkItem')
    .data('item-id');
};

const getFilterValue = function () {
  return $('.filterValue').val();
};

const handleFilterChange = function () {
  $('.filterValue').change( function() {
    store.filter = getFilterValue();
    render();
    console.log(store.filter);
  });
};

const bindEventListeners = function () {
  handleAddBookMark();
  handleAddBookMarkSubmit();
  handleExpand();
  handleDelete();
  handleFilterChange();
};



export default {
  render,
  bindEventListeners
};
let bookmarks = [];
let error = null;
let filter = 0;
let adding = false;

const findById = function (id) {
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};
  
const addItem = function (bookmark) {
  this.bookmarks.push(bookmark);
};
  
const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};

const toggleAdding = function () {
  this.adding = !this.adding;
};

const toggleExpand = function (id) {
  let currentData = this.findById(id);
  console.log(currentData);
  currentData.expanded = !currentData.expanded;
};

const setError = function (error) {
  this.error = error;
};



export default {
  bookmarks,
  error,
  filter,
  adding,
  findById,
  addItem,
  findAndDelete,
  toggleAdding,
  setError,
  toggleExpand,
};
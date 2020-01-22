import $ from 'jquery';

import './index.css';

import api from './api';
import store from './store';
import bookmark from './bookmark';

const main = function () {
  api.getBookmarks()
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      items.forEach((item) => item.expanded = false);
      bookmark.render();
    });

  bookmark.bindEventListeners();
  bookmark.render();
};

$(main);
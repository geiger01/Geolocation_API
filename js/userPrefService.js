'use strict';
const STORAGE_USER_KEY = 'user';

let gUser = null;

_makeUser();

function _makeUser() {
  let userDetails = loadFromStorage(STORAGE_USER_KEY);

  if (!userDetails || userDetails.length === 0) {
    userDetails = {
      color: '#e3baba',
      birth: '',
      places: [],
    };
  }
  gUser = userDetails;
  saveToStorage(STORAGE_USER_KEY, gUser);
}

function changeBgColor(color) {
  gUser.color = color;
  saveToStorage(STORAGE_USER_KEY, gUser);
}

function setBirthDate(birthDate) {
  if (!birthDate) return;
  gUser.birth = birthDate;
  saveToStorage(STORAGE_USER_KEY, gUser);
}

function getUser() {
  return gUser;
}

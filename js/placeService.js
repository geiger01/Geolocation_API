'use strict';

function addLocations(name, lat, long) {
  let locationDetails = { name, lat, long, id: Math.random() };
  gUser.places.push(locationDetails);
  saveToStorage('user', gUser);
}

function removeLoc(locationId) {
  var idx = gUser.places.findIndex((loc) => {
    return loc.id === locationId;
  });
  gUser.places.splice(idx, 1);
  saveToStorage('user', gUser);
}

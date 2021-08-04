'use strict';

function onInit() {
  renderBgColor();
}
renderLocations();

function renderBgColor() {
  let bgColor = getUser().color;
  let birthDate = getUser().birth;
  console.log(birthDate);
  document.querySelector('body').style.backgroundColor = bgColor;

  if (birthDate !== '') {
    document.querySelector('.quote').style.opacity = 1;
    document.querySelector('p span').innerText = getRandomQuotes();
  } else {
    document.querySelector('.quote').style.opacity = 0;
  }
}

function onSetBgColor(ev) {
  ev.preventDefault();

  let color = document.querySelector('[name="color"]').value;
  let birthDate = document.querySelector('[name="date"]').value;

  changeBgColor(color);
  setBirthDate(birthDate);

  renderBgColor();
}

function getRandomQuotes() {
  let quotes = [
    'We grow fearless when we do the things we fear.',
    'And, when you want something, all the universe conspires in helping you to achieve it.',
    "If you hear a voice within you say 'you cannot paint,' then by all means paint and that voice will be silenced.",
    "You can't be great if you don't feel great. Make exceptional health your number one priority.",
    'Impossible is just an opinion.',
    'The secret of getting ahead is getting started.',
    'Waiting is painful. Forgetting is painful. But not knowing which to do is the worst kind of suffering.',
    'All our dreams can come true if we have the courage to pursue them.',
  ];

  let randIdx = Math.floor(Math.random() * quotes.length);
  return quotes[randIdx];
}

///// map

let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 32.794, lng: 34.989 },
    zoom: 12,
  });

  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.querySelector('button');
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  locationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
  map.addListener('click', (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    let lat = JSON.stringify(mapsMouseEvent.latLng.toJSON().lat);
    let long = JSON.stringify(mapsMouseEvent.latLng.toJSON().lng);
    let placeName = prompt('Location?');
    addLocations(placeName, lat, long);
    renderLocations();
    infoWindow.open(map);
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

function renderLocations() {
  let locations = gUser.places;
  let strHtmls = `<th>Name</th><th>Lan</th><th>Lon</th><th>Id</th><th>Actions</th>`;
  console.log(locations);

  locations.map((loc) => {
    strHtmls += `<tr>
      <td>${loc.name}</td>
      <td>${loc.lat}</td>
      <td>${loc.long}</td>
      <td>${loc.id}</td>
      <td><button onclick="onRemoveLoc(${loc.id})" class="delete">Delete</button></td>
      </tr>`;
  });

  document.querySelector('tbody').innerHTML = strHtmls;
}
function onRemoveLoc(locationId) {
  removeLoc(locationId);
  renderLocations();
}

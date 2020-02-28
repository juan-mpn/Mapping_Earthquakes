// Add console.log to check to see if our code is working.
console.log("working.. Mapping Multiple Points");

// Get data from cities.js
let cityData = cities;
// Coordinates for each point to be used in the line.
let line = [
	[33.9416, -118.4085],
	[37.6213, -122.3790],
	[40.7899, -111.9791],
	[47.4502, -122.3088],
	[40.4502, -73.7781],
  ];
// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([37.6213, -122.3790], 5);

// Loop through the cities array and create one marker for each city.

// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
	color: "yellow"
  }).addTo(map);

cityData.forEach(function(city) {
	console.log(city, city.location)
	L.circleMarker(city.location, {
		radius: (city.population-200000)/100000
	})
.bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
  .addTo(map);
});

//  Add a marker to the map for Los Angeles, California.
L.circle([34.0522, -118.2437], {
	radius: 100,
	color: 'black',
	fillColor: '#ffffa1'
 }).addTo(map);

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox/streets-v11',
  // id: 'mapbox/dark-v10',
	accessToken: API_KEY
})

// Then we add our 'graymap' tile layer to the map. Es
streets.addTo(map);
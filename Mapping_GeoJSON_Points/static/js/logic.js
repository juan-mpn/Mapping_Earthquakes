// Add console.log to check to see if our code is working.
console.log("working.. GeoJSON"); 

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
// Create the map object with center at the San Francisco airport.
let map = L.map('map').setView([37.5, -122.5], 10);

// Grabbing our GeoJSON data.

// L.geoJson(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: function(feature, latlng) {
// 	  console.log('Feature--->', feature);
// 	  return L.marker(latlng)
// 	  .bindPopup("<h2>"  + feature.properties.faa +': ' + feature.properties.city + ", " + feature.properties.country + 
// 	  "</h2> <hr> <h3>" + feature.properties.name + "</h3>" 	  );
// 	}
	
// // .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")	  
//   }).addTo(map)

// Grabbing our GeoJSON data.
  L.geoJson(sanFranAirport, {
	onEachFeature: function(feature, layer) {
		console.log('Layer', layer);
		layer.bindPopup("<h2>"  + feature.properties.faa +': ' + feature.properties.city + ", " + feature.properties.country + 
	  "</h2> <hr> <h3>" + feature.properties.name + "</h3>" 	  );
	}
  }).addTo(map)
// Loop through the cities array and create one marker for each city.

// Create a polyline using the line coordinates and make the line red.
// L.polyline(line, {
// 	color: "yellow"
//   }).addTo(map);

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
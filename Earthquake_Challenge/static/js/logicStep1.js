// Add console.log to check to see if our code is working.
console.log("working.. GeoJSON eql7."); 

// Create the tile layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox/streets-v11',	
  	accessToken: API_KEY
})
//

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets  = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
	"Streets": streets,
	"Satellite": satelliteStreets 
  };

  // Create the map object with center, zoom level and default layer.
let map = L.map('map', {
	center: [39.5, -98.5],
zoom: 3,
	layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// Accessing the airport GeoJSON URL
let earthql = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var myStyle = {
    color: "#ffffa1",
	weight: 2
	
};
// Grabbing our GeoJSON data.
d3.json(earthql).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, myStyle).addTo(map);

  L.geoJson(data, {
	  style: myStyle,
	  onEachFeature: function(feature, layer) {
		console.log('Layer', layer);
		layer.bindPopup("<h2> Magnitude: "  + feature.properties.mag +' Location: ' + 
		feature.properties.place + " </h2> <hr> <h3> Time: " + feature.properties.time + "</h3>" );
	}
  }).addTo(map)

});


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


// Loop through the cities array and create one marker for each city.

// Create a polyline using the line coordinates and make the line red.
// L.polyline(line, {
// 	color: "yellow"
//   }).addTo(map);

// cityData.forEach(function(city) {
// 	console.log(city, city.location)
// 	L.circleMarker(city.location, {
// 		radius: (city.population-200000)/100000
// 	})
// .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//   .addTo(map);
// });

//  Add a marker to the map for Los Angeles, California.
// L.circle([34.0522, -118.2437], {
// 	radius: 100,
// 	color: 'black',
// 	fillColor: '#ffffa1'
//  }).addTo(map);

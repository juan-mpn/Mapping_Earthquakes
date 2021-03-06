// Add console.log to check to see if our code is working.
console.log("working.. GeoJSON EarthQ L7 step5"); 

// Create the tile layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox/streets-v11',	
  	accessToken: API_KEY
})
//

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets  = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
	"Streets": streets,
	"Satellite": satelliteStreets 
  };

// Create the earthquake layer for our map.
let earthquakes = new L.LayerGroup();
// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
	Earthquakes: earthquakes
  };

  // Create the map object with center, zoom level and default layer.
let map = L.map('map', {
	center: [39.5, -98.5],
zoom: 3,
	layers: [streets]
})

// Then we add a control to the map that will allow the user to change
// which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

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
//  L.geoJson(data, myStyle).addTo(map);
// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
	function styleInfo(feature) {
		return {
		opacity: 1,
		fillOpacity: 1,
		fillColor: getColor(feature.properties.mag),
		color: "#000000",
		radius: getRadius(),
		stroke: true,
		weight: 0.5
		};
	}

	// This function determines the radius of the earthquake marker based on its magnitude.
	// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
	function getRadius(magnitude) {
		if (magnitude === 0) {
		return 1;
		}
		return magnitude * 4;
	}
// This function determines the color of the circle based on the magnitude of the earthquake.
	function getColor(magnitude) {
		if (magnitude > 5) {
		return "#ea2c2c";
		}
		if (magnitude > 4) {
		return "#ea822c";
		}
		if (magnitude > 3) {
		return "#ee9c00";
		}
		if (magnitude > 2) {
		return "#eecc00";
		}
		if (magnitude > 1) {
		return "#d4ee00";
		}
		return "#98ee00";
	}

  L.geoJson(data, {
	  pointToLayer: function(feature, latlng) {
		console.log(data);
		return L.circleMarker(latlng);

//		.bindPopup("<h2> Magnitude: "  + feature.properties.mag +' Location: ' + 
//		feature.properties.place + " </h2> <hr> <h3> Time: " + feature.properties.time + "</h3>" );
	},

	// We set the style for each circleMarker using our styleInfo function.
	style: styleInfo,
    // We create a popup for each circleMarker to display the magnitude and
    //  location of the earthquake after the marker has been created and styled.
    onEachFeature: function(feature, layer) {
		layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
	}
  }).addTo(earthquakes);

  earthquakes.addTo(map);
 legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend')
	const magnitudes = [0, 1, 2, 3, 4, 5];
	const colors = [
	  "#98ee00",
	  "#d4ee00",
	  "#eecc00",
	  "#ee9c00",
	  "#ea822c",
	  "#ea2c2c"
	]
	// Looping through our intervals to generate a label with a colored square for each interval.
	for (var i = 0; i < magnitudes.length; i++) {
		console.log(colors[i]);
		div.innerHTML +=
		"<i style='background: " + colors[i] + "'></i> " +
		magnitudes[i] + (magnitudes[i + 1] ? "–" + magnitudes[i + 1] + "<br>" : "+");
	}
	return div;
};

legend.addTo(map);
});

var legend = L.control({position: 'bottomright'});



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

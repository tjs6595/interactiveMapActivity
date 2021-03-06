// Define Map Object
const myMap = {
	coordinates: [],
	businesses: [],
	map: {},
	markers: {},

	// Build Leaflet Map.
	buildMap() {
		this.map = L.map('map', {
		center: this.coordinates,
		zoom: 11,
		});
		// Add Openstreetmap Tiles.
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		minZoom: '15',
		}).addTo(this.map)
		// Create and Add Geolocation Marker.
		const marker = L.marker(this.coordinates) 
			marker.addTo(this.map).bindPopup('<p1><b>You are here</b><br></p1>').openPopup()
	},

	// Add Business Markers.
	addMarkers() {
		for (var i = 0; i < this.businesses.length; i++) {
		this.markers = L.marker([
			this.businesses[i].lat,
			this.businesses[i].long,
		])
			.bindPopup(`<p1>${this.businesses[i].name}</p1>`)
			.addTo(this.map)
		}
	},
}

// Get Coordinates via Geolocation API.
async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}

// Get Foursquare Businesses
async function getBusinesses(business){
	const options = {
		method: 'GET',
		headers: {
		  Accept: 'application/json',
		  Authorization: 'fsq3hPiG1DeKxDIdXQK7F4ZYkmFO2dDvEXQSNA1uhn/iFYY='
		},
	};
	let limit = 5
	let lat = myMap.coordinates[0]
	let lon = myMap.coordinates[1]
	let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
	let data = await response.text()
	let parsedData = JSON.parse(data)
	let businesses = parsedData.results
	return businesses
}

// Process Foursquare Array
function processBusinesses(data) {
	let businesses = data.map((element) => {
		let location = {
			name: element.name,
			lat: element.geocodes.main.latitude,
			long: element.geocodes.main.longitude
		};
		return location
	})
	return businesses
}

// Event Handlers

// Window Load
window.onload = async () => {
	const coords = await getCoords()
	//console.log(coords)
	myMap.coordinates = coords
	myMap.buildMap()
}

// Business Submit Button
document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.getElementById('business').value
	let businessData = await getBusinesses(business);
	myMap.businesses = processBusinesses(businessData)
	myMap.addMarkers()
})









//Example Code:

// const myMap = L.map('map', {
//     center: [38.868672, -98.342130],
//     zoom: 15,
// });

// Add Geolocation and Get User Coordinates:
// async function getCoordinates(){
//     let userLocation = L.control.locate().addTo(myMap);
// }
// let currentUserPosition = userLocation.getLatLng();
// alert(userLocation.getLatLng());

// //Create and add a geolocation marker:
// const marker = L.marker([38.868672, -98.342130])
// marker.addTo(myMap).bindPopup('<p1><b>The Center of Kansas</b></p1>').openPopup()


// function addmarker() {
//     var inputX = document.getElementById('x').value;
//     var inputY = document.getElementById('y').value;
//     var pj = proj4(secondProjection, firstProjection, [inputX, inputY]);
//     var lng = pj[0];
//     var lat = pj[1];
//     var latlng = L.latLng(lat, lng);
//     L.marker(latlng).addTo(map);  
// };

//var stuSplit = L.latLng(55.4411764, 11.7928708);
// var myMarker = L.circleMarker(stuSplit, 
//     { title: 'unselected' })
//         .addTo(map);
// $("#One").click(function(){
//                 var curPos = myMarker.getLatLng();
//                 map.panTo([curPos.lat, curPos.lng]);
//                 alert(curPos.lng + " : " + curPos.lat);
//             });

// // Draw the 2nd Arrondissement                                          
// const secondArrondiccement = [
                                      
// [48.863368120198004, 2.3509079846928516]
// [48.86933262048345, 2.3542531602919805]
// [48.87199261164275, 2.3400569901592183]
// [48.86993336274516, 2.3280142476578813] 
// [48.86834104280146, 2.330308418109664]

// ];

// const polygon = L.polygon(secondArrondiccement, {
//     color: 'blue',
//     fillOpacity: 0.0,
// }).addTo(myMap);


// create red pin marker


// metro station markers



// const myMap = L.map('map', {
//     coordinates: [],
//  businesses: [],
//  map: {},
//  markers: {},

//  // build leaflet map
//  buildMap() {
//      this.map = L.map('map', {
//      center: this.coordinates,
//      zoom: 11,
//      });
//      // add openstreetmap tiles
//      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//      attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//      minZoom: '15',
//      }).addTo(this.map)

//      // create and add geolocation marker
//      const marker = L.marker(this.coordinates)
//      marker
//      .addTo(this.map)
//      .bindPopup('<p1><b>You are here</b><br></p1>')
//      .openPopup()
//  },
// });
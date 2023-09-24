// Replace 'YOUR_USERNAME' and 'YOUR_PASSWORD' with your actual OpenSky username and password.
const OpenSkyUser = 'yourusername';
const OpenSkyPassWord = 'yourpassword';

// Combine the username and password for Basic Authentication.
const credentials = `${OpenSkyUser}:${OpenSkyPassWord}`;

// Encode the credentials as base64.
const base64Credentials = btoa(credentials);


// Create a Leaflet map and set its initial view.
const mymap = L.map('map').setView([0, 0], 2); // Centered at [0, 0] and zoom level 2.

// Add a Tile Layer (you can choose a different tile layer URL if needed).
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(mymap);

// Function to fetch flight data from OpenSky API with username and password.
async function fetchFlightData() {
    try {

        // Make an API request to get flight data.
        const response = await fetch('https://opensky-network.org/api/states/all', {
            method: 'GET',
            headers: {
                Authorization: `Basic ${base64Credentials}`, // Use Basic Auth with username and password.
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
        }

        const data = await response.json();

        // Process and display the flight data on the map.
        displayFlightDataOnMap(data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}
// Define custom plane icons using L.icon
const horizontalPlaneIcon = L.icon({
    iconUrl: 'horizontal-plane.png', // Path to the horizontal plane icon image
    iconSize: [32, 32], // Adjust the size as needed
});

const verticalPlaneIcon = L.icon({
    iconUrl: 'vertical-plane.png', // Path to the vertical plane icon image
    iconSize: [32, 32], // Adjust the size as needed
});

// Function to display flight data on the map with custom icons
function displayFlightDataOnMap(data) {
    // Check if data is defined and contains the 'states' property.
    if (data && data.states) {
        // Clear existing markers on the map.
        mymap.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                mymap.removeLayer(layer);
            }
        });

        // Loop through the flight data and create markers on the map for each aircraft.
        data.states.forEach((aircraft) => {
            const icao24 = aircraft[0];
            const callsign = aircraft[1];
            const originCountry = aircraft[2];
            const latitude = aircraft[6];
            const longitude = aircraft[5];
            const altitude = aircraft[7];
            const velocity = aircraft[9];
            const verticalRate = aircraft[10];

            // Check if both latitude and longitude are valid numbers.
            if (!isNaN(latitude) && !isNaN(longitude)) {
                const markerIcon = verticalRate > 0 ? verticalPlaneIcon : horizontalPlaneIcon;
                const marker = L.marker([latitude, longitude], { icon: markerIcon }).addTo(mymap);
                marker.bindPopup(
                    `<strong>ICAO24:</strong> ${icao24 || '-'}<br>` +
                    `<strong>Callsign:</strong> ${callsign || '-'}<br>` +
                    `<strong>Origin Country:</strong> ${originCountry || '-'}<br>` +
                    `<strong>Altitude:</strong> ${altitude || '-'} meters<br>` +
                    `<strong>Velocity:</strong> ${velocity || '-'} m/s<br>` +
                    `<strong>Vertical Rate:</strong> ${verticalRate || '-'} m/s`
                );
            }
        });
    } else {
        console.error('Invalid or missing data from the API.');
    }
}







// Function to start fetching data periodically (e.g., every 5 seconds).
/*function startFetchingData() {
    fetchFlightData();
    setInterval(fetchFlightData, 30000); // Adjust the interval as needed.
}*/

// Call the function to start fetching data.
//startFetchingData();

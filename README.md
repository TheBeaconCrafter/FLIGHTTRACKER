# Flight Tracker

Welcome to the Flight Tracker Web App! This application allows you to track flights in real-time using data from the OpenSky Network API. It provides a user-friendly map interface to visualize the positions and details of aircraft worldwide. It is written in vanilla JavaScript and works on almost any device.

## Features

- **Real-Time Tracking**: Track flights in real-time and see their current positions on the map.

- **Custom Icons**: Aircraft are displayed as custom icons, indicating whether they are ascending or flying horizontally.

- **Detailed Information**: Click on an aircraft icon to view detailed information about the flight, including ICAO24 code, callsign, origin country, altitude, velocity, and vertical rate.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- A webserver of your choice running on your computer
- A free OpenSky Network Account

### Installation

Clone the repository:

   ```bash
   git clone https://github.com/TheBeaconCrafter/FLIGHTTRACKER.git

    Navigate to the project directory:

```bash
cd FLIGHTTRACKER
bash

Install the required packages:

Usage

    Replace 'YOUR_USERNAME' and 'YOUR_PASSWORD' in app.js with your actual OpenSky username and password.

    Place the project directory in your webservers root directory.

    Click the "Refetch" button to fetch flight data from OpenSky and update the map.

Customization

    You can customize the map's appearance and behavior by modifying the Leaflet settings in app.js.

    To change the custom icons used for aircraft, replace horizontal-plane.png and vertical-plane.png with your preferred icons.

Built With

    Leaflet - An open-source JavaScript library for interactive maps.

    OpenSky Network API - Provides real-time and historical flight data.

License

This project is licensed under the MIT License.

Acknowledgments

    Special thanks to the OpenSky Network for providing access to their flight data.

    Icon credits: Iconfinder

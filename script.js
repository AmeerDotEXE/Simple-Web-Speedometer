"use strict";

if (!"geolocation" in navigator) {
	alert("No geolocation API available");
	speedDiv.textContent = "No API";
	throw Error("geolocation API not available");
}

if (navigator.serviceWorker) {
	navigator.serviceWorker.register("service.js");
}

const speedometerEl = document.getElementById("speedometer");
speedometerEl.textContent = "loaded";
const WID = navigator.geolocation.watchPosition(
	(loc) => {
		if (loc.coords.speed == null) {
			speedometerEl.textContent = "-";
			return;
		}
		
		console.log("Got speed:", loc.coords.speed);
		speedometerEl.textContent = loc.coords.speed.toFixed(2);
	},
	(err) => {
		speedometerEl.textContent = err.message;
		console.error("Could not determine GPS position", err)
	},
	{
		enableHighAccuracy: true,
	}
);

'use strict';
let $ = require('jquery');
let getAPI = require('./api.js');
let api = getAPI();

//to get api key --->  api.apiKey

let apiCalls = {
	getWeatherData: (typeId, zipCode) => {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: `${api.url}data/2.5/${typeId}?zip=${zipCode},us&APPID=${api.apiKey}&units=imperial`
			}).done((data) => {
				resolve(data);
			});
		});
	}
};

module.exports = apiCalls;

//Example URLs
//1 day:  api.openweathermap.org/data/2.5/weather?zip=94040,us
//3 day:  api.openweathermap.org/data/2.5/forecast?zip=94040,us
//7 day:  api.openweathermap.org/data/2.5/forecast/daily?zip=94040,us
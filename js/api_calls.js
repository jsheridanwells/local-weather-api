'use strict';
let $ = require('jquery');
let getAPI = require('./api.js');
let api = getAPI();

let apiCalls = {
  //makes call to openweather api, takes weather type and zip code as parameters
	getWeatherData: (typeId, zipCode) => {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: `${api.url}data/2.5/${typeId}?zip=${zipCode},us&APPID=${api.apiKey}&units=imperial`,
				statusCode: {
					400: () => {
						window.alert('Please enter a valid zip code.');
					}
				}
			}).done((data) => {
				resolve(data);
			});
		});
	}
};

module.exports = apiCalls;

'use strict';
let $ = require('jquery');
let DOM = require('./dom_builder');
let apiCalls = require('./api_calls');

//load zip code form on page load
$(window).ready(function(){
	// DOM.loadZipForm();
	apiCalls.getWeatherData('weather', '37206').then((data) =>{
		DOM.loadCurrent(data);
	});
});
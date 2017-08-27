'use strict';
let $ = require('jquery');
let DOM = require('./dom_builder');
let apiCalls = require('./api_calls');

//load zip code form on page load
$(window).ready(function(){
	DOM.loadZipForm();

	apiCalls.getWeatherData('forecast', '53213').then(function(data){
		console.log("data is ", data);
	});


});
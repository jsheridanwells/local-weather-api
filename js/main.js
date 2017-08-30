'use strict';
let $ = require('jquery');
let apiCalls = require('./api_calls');
let DOM = require('./dom_builder');


//load zip code form on page load
// $(window).ready(function(){
// 	DOM.loadZipForm();
// });

//testing
$(window).ready(()=>{
	apiCalls.getWeatherData('forecast', 37206)
	.then((data)=>{
		console.log("data", data);
		DOM.DOM.load3Day(data);
	});
});

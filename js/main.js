'use strict';
let $ = require('jquery');
let apiCalls = require('./api_calls');
let DomBuilder = require('./dom_builder');
let DOM = DomBuilder.DOM;


// load zip code form on page load
$(window).ready(function(){
	DOM.loadZipForm();
});

//testing
// $(window).ready(()=>{
// 	apiCalls.getWeatherData('forecast', 37206)
// 	.then((data)=>{
// 		console.log("data", data);
// 		DOM.DOM.load3Day(data);
// 	});
// });

// //testing
// $(window).ready(()=>{
// 	apiCalls.getWeatherData()
// 	.then((data)=>{
// 		DOM.loadCurrent(data);
// 	});
// });

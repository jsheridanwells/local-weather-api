'use strict';
let $ = require('jquery');
let DOM = require('./dom_builder');
let apiCalls = require('./api_calls');



//load zip code form on page load
$(window).ready(function(){
	DOM.loadZipForm();
});

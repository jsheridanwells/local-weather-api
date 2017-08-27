'use strict';

let DOM = require('./dom_builder.js');

//load zip code form on page load
$(window).ready(function(){
	DOM.loadZipForm();
});
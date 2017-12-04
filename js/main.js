'use strict';
let $ = require('jquery');
let apiCalls = require('./api_calls');
let DomBuilder = require('./dom_builder');
let DOM = DomBuilder.DOM;


// load zip code form on page load
$(window).ready(function(){
	DOM.loadZipForm();
});

// reload page when title is clicked
$('#title').click(() => location.reload());

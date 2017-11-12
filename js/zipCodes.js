'use strict';

let $zip;

//retrieves zip code setting entered by the user
function setZip() {
	$zip = $('#zip-code-enter').val();
}

//makes zip code setting available to other parts of the application
function getZip() {
	return $zip;
}

module.exports = {setZip, getZip};

'use strict';

let $zip;

function setZip() {
	console.log("zip firing");
	$zip = $('#zip-code-enter').val();
	console.log("zip is ", $zip);
}

function getZip() {
	console.log("zip in getZip is ", $zip);
	return $zip;
}

module.exports = {setZip, getZip};
'use strict';
let DOM = {
	//loads form for submitting zip code to query
	loadZipForm: () => {
		let content = `
			<div class="jumbotron">
				<h2 class="display-5">Enter a Zip Code:</h2>
				<form action="submit"><input type="text" pattern="[0-9]{5}" maxlength="5" id="zip-code-enter" value="53213"></form>
				<p class="lead">
					<a class="btn btn-primary btn-lg" href="#" role="button">Get Weather</a>
				</p>
			</div>
		`;
		$('#frame').html(content);
	},
	loadCurrent: (data) => {
		let content = `
			<div class="jumbotron">
				<div class="weather-img<img src="img/${data.weather[0].icon}.svg" alt="">
				<p><strong>Temperature: </strong></p>
				<p><strong></strong></p>
				<p><strong></strong></p>
				<p><strong></strong></p>
			</div>
		`;
		$('#frame').html(content);
	}
};

module.exports = DOM;
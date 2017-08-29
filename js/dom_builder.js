'use strict';
let apiCalls = require('./api_calls');

let DOM = {
	//loads form for submitting zip code to query
	loadZipForm: () => {
		let content = `
			<div class="jumbotron">
				<h2 class="display-5">Enter a Zip Code:</h2>
				<form><input type="text" pattern="[0-9]{5}" maxlength="5" id="zip-code-enter" value="53213"></form>
				<p class="lead">
					<a class="btn btn-primary btn-lg" href="#" role="button">Get Weather</a>
				</p>
			</div>
		`;
		$('#frame').html(content);
		//on button click, get weather data});
		Handlers.addBtnClick();

	},
	//loads current / 3-day / 5-day tabs at th top of the view
	loadTabs: () => {
		$('#frame').html('');
		let content = `
			<div class="tabs">
		        <ul class="nav nav-tabs">
		          <li class="nav-item">
		            <a id="current" class="nav-link" href="#">Current Weather</a>
		          </li>
		          <li id="three-day" class="nav-item">
		            <a class="nav-link" href="#">3-Day Forecast</a>
		          </li>
		          <li class="nav-item">
		            <a id="five-day" class="nav-link" href="#">5-Day Forecast</a>
		          </li>
		        </ul>
	        </div>
		`;
		$('#frame').append(content);
	},
	loadCurrent: (data) => {
		DOM.loadTabs();
		$('#current').addClass('active');
		let content = `
			<div class="jumbotron no-back">
		        <div class="weather-img"><img src="img/${data.weather[0].icon}.svg" class="weather-svg" alt=""></div>
		        <p><strong>Temperature: </strong>${data.main.temp.toFixed(0)} &deg; F</p>
		        <p><strong>Conditions: </strong>${data.weather[0].description}</p>
		        <p><strong>Air Pressure: </strong>${data.main.pressure}</p>
		        <p><strong>Wind Speed: </strong>${data.wind.speed.toFixed(0)} mph</p>
		    </div>
		    <div class="bottom-row"><a href="#" id="next-zip">Search Another Zip Code</a></div>
		`;
		$('#frame').append(content);
		$('#next-zip').on('click', DOM.loadZipForm);
	},
	load3Day: (data) => {
		DOM.loadTabs();
		$('three-day').attr('class', 'active');
		let content = '';
		for (let i = 0; i <= 16; i+=8) {
			content +=`
	          <div class="col-md-4">
	              <div class="weather-img"><img src="img/${data.list[i].weather[0].icon}.svg" class="weather-svg" alt="${data.list[i].weather[0].description}"></div>
	                <p><strong>Temperature: </strong>${data.list[i].main.temp} &deg; F</p>
	                <p><strong>Conditions: </strong>${data.list[i].weather[0].description}</p>
	                <p><strong>Air Pressure: </strong>${data.list[i].main.pressure}</p>
	                <p><strong>Wind Speed: </strong>${data.list[i].wind.speed}</p>
	          </div>
          `;
        }
        let $row = $('<div></div>').attr('class', 'row');
        $($row).append(content);
		$('#frame').append($row);
		$('#next-zip').on('click', DOM.loadZipForm);

	}
};

let Handlers = {
	addBtnClick: () => {
		$('.btn').click(()=> {
			console.log("clicking");
			apiCalls.getWeatherData('weather', $('#zip-code-enter').val())
			.then((data)=>{
				console.log("data", data);
				DOM.loadCurrent(data);
			});
		});
	}
};

module.exports = {DOM, Handlers};
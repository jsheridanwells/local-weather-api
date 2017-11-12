  'use strict';
let apiCalls = require('./api_calls');
let zipCodes = require('./zipCodes.js');

let DOM = {
	//loads form for submitting zip code to query
	loadZipForm: () => {
		let content = `
			<div class="jumbotron">
				<h2 class="display-5">Enter a Zip Code:</h2>
				<form><input type="text" pattern="[0-9]{5}" maxlength="5" id="zip-code-enter" placeholder="53213"></form>
				<p class="lead">
					<a class="btn btn-primary btn-lg" href="#" role="button">Get Weather</a>
				</p>
			</div>
		`;
		$('#frame').html(content);
		//on button click, get weather data});
		Handlers.addBtnClick();

	},
	//loads current / 3-day / 5-day tabs at th top of the view, madeActive specifies which tab is active
	loadTabs: () => {
		$('#frame').html('');
		let content = `
			<div class="tabs">
		        <ul class="nav nav-tabs">
		          <li class="nav-item">
		            <a id="current" class="nav-link" href="#">Current Weather</a>
		          </li>
		          <li class="nav-item">
		            <a id="three-day" class="nav-link" href="#">3-Day Forecast</a>
		          </li>
		          <li class="nav-item">
		            <a id="five-day" class="nav-link" href="#">5-Day Forecast</a>
		          </li>
		        </ul>
	        </div>
	        <div id="weather-data"></div>
		`;
		$('#frame').append(content);
		//load listeners for current
		DOM.loadListeners('#current', 'weather', DOM.loadCurrent, 0);
		//load listeners for 3-day
		DOM.loadListeners('#three-day', 'forecast', DOM.loadMultiDay, 16);
		//load listeners for 5-day
		DOM.loadListeners('#five-day', 'forecast', DOM.loadMultiDay, 32);
	},
	// creates an Ajax call, parameters indicate type of button clicked, forecast type, callback function, # of array items
	loadListeners: (id, forecastType, loaderType, limit) => {
		$(id).click(()=>{
			let $zip = zipCodes.getZip();
			apiCalls.getWeatherData(forecastType, $zip)
			.then((data)=>{
				loaderType(data, limit);
			});
		});
	},
	//sets up HTML elements for current forecast
	loadCurrent: (data, limit) => {
		DOM.loadTabs();
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
		$('#weather-data').html(content);
		$('#next-zip').on('click', DOM.loadZipForm);
	},
	//sets up HTML elements for 3- and 5-day forecasts
	loadMultiDay: (data, limit) => {
		let content = '';
		for (let i = 0; i <= limit; i+=8) {
			console.log("loadMultiDay Firing");
			content +=`
	          <div class="col-md-4">
	              <div class="weather-img"><img src="img/${data.list[i].weather[0].icon}.svg" class="weather-svg" alt="${data.list[i].weather[0].description}"></div>
	                <p><strong>Temperature: </strong>${data.list[i].main.temp.toFixed(0)} &deg; F</p>
	                <p><strong>Conditions: </strong>${data.list[i].weather[0].description}</p>
	                <p><strong>Air Pressure: </strong>${data.list[i].main.pressure}</p>
	                <p><strong>Wind Speed: </strong>${data.list[i].wind.speed.toFixed(0)}</p>
	          </div>
          `;
        }
        let $row = $('<div></div>').attr('class', 'row');
        $($row).append(content);
		$('#weather-data').html($row);
		$('#next-zip').on('click', DOM.loadZipForm);
	},
	load3Day: (data) => {
		DOM.loadTabs('#three-day');
		DOM.buildMultiDay(data, 16);
	},
	load5day: (data) => {
		DOM.loadTabs('#five-day');
		DOM.buildMultiDay(data, 32);
	}
};

let Handlers = {
	addBtnClick: () => {
		$('.btn').click(()=> {
			apiCalls.getWeatherData('weather', $('#zip-code-enter').val())
			.then((data)=>{
				zipCodes.setZip();
				DOM.loadCurrent(data);
			});
		});
	}
};

module.exports = {DOM, Handlers};

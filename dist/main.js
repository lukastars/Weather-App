/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDataFromInput": () => (/* binding */ getDataFromInput),
/* harmony export */   "buildRequestCoordsUrl": () => (/* binding */ buildRequestCoordsUrl),
/* harmony export */   "buildRequestForecastUrl": () => (/* binding */ buildRequestForecastUrl),
/* harmony export */   "getCoords": () => (/* binding */ getCoords),
/* harmony export */   "getForecast": () => (/* binding */ getForecast)
/* harmony export */ });
/* harmony import */ var _domFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

function getDataFromInput() {
  const input = document.querySelector('.search-box-input');
  const cityName = input.value;

  // if not an empty string
  if (cityName) {
    // remove whitespace for the api call

    return cityName
      .replace(/(\s+$|^\s+)/g, '') // remove whitespace from begining and end of string
      .replace(/(,\s+)/g, ',') // remove any white space that follows a comma
      .replace(/(\s+,)/g, ',') // remove any white space that preceeds a comma
      .replace(/\s+/g, '+'); // replace any remaining white space with +, so it works in api call
  }
  return '';
}

// To get full weather data, 2 API requests need to be made. The current weather response returns
// coordinates, which can then be used to make a request for the full forecast.

// Builds request url to obtain coordinates
function buildRequestCoordsUrl(cityName) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=0b0ed20c25bb6e26c07c28eff9ffc718`;
}

// Builds request url to obtain weather forecast
function buildRequestForecastUrl(coordinates, units) {
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,alerts&units=${units}&appid=0b0ed20c25bb6e26c07c28eff9ffc718`;
}

// Returns coordinates and city name for a specified city name.
async function getCoords(url) {
  try {
    const response = await fetch(url);
    const weatherData = await response.json();
    const { coord } = weatherData;
    coord.name = weatherData.name;
    coord.country = weatherData.sys.country;

    return coord;
  } catch (err) {
    console.log(err);
  }
}

// Returns forecast data for specified coordinates.
async function getForecast(url) {
  (0,_domFunctions__WEBPACK_IMPORTED_MODULE_0__.displayLoading)();
  const response = await fetch(url);
  const forecastData = await response.json();
  (0,_domFunctions__WEBPACK_IMPORTED_MODULE_0__.hideLoading)();
  return forecastData;
}




/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeHoursPage": () => (/* binding */ changeHoursPage),
/* harmony export */   "displayDailyForecast": () => (/* binding */ displayDailyForecast),
/* harmony export */   "displayHourlyForecast": () => (/* binding */ displayHourlyForecast),
/* harmony export */   "renderWeatherData": () => (/* binding */ renderWeatherData),
/* harmony export */   "displayLoading": () => (/* binding */ displayLoading),
/* harmony export */   "hideLoading": () => (/* binding */ hideLoading)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


// changes the hour forecast display to next or previous forecasts
function changeHoursPage(hoursPage) {
  const hourForecasts = document.querySelectorAll('.forecast-hourly');
  const hourlyContainer = document.querySelector(
    '.forecast-hourly-outer-container'
  );
  const dots = document.querySelectorAll('.dot');
  const dot1 = document.querySelector('.dot1');
  const dot2 = document.querySelector('.dot2');
  const dot3 = document.querySelector('.dot3');

  // set all forecasts to display: none
  hourForecasts.forEach((forecast) => {
    forecast.style.display = 'none';
  });

  // remove selected styling from hour page nav dots
  dots.forEach((dot) => {
    dot.classList.remove('dot-selected');
  });

  // if hours page = 1, display first hours page
  if (hoursPage === 1) {
    document.querySelector('#current-hour-plus-1').style.display = 'flex';
    document.querySelector('#current-hour-plus-2').style.display = 'flex';
    document.querySelector('#current-hour-plus-3').style.display = 'flex';
    document.querySelector('#current-hour-plus-4').style.display = 'flex';
    document.querySelector('#current-hour-plus-5').style.display = 'flex';
    document.querySelector('#current-hour-plus-6').style.display = 'flex';
    document.querySelector('#current-hour-plus-7').style.display = 'flex';
    document.querySelector('#current-hour-plus-8').style.display = 'flex';

    dot1.classList.add('dot-selected');
  }
  // if hours page = 2, display second hours page
  if (hoursPage === 2) {
    document.querySelector('#current-hour-plus-9').style.display = 'flex';
    document.querySelector('#current-hour-plus-10').style.display = 'flex';
    document.querySelector('#current-hour-plus-11').style.display = 'flex';
    document.querySelector('#current-hour-plus-12').style.display = 'flex';
    document.querySelector('#current-hour-plus-13').style.display = 'flex';
    document.querySelector('#current-hour-plus-14').style.display = 'flex';
    document.querySelector('#current-hour-plus-15').style.display = 'flex';
    document.querySelector('#current-hour-plus-16').style.display = 'flex';

    dot2.classList.add('dot-selected');
  }

  // if hours page = 3, display third hours page
  if (hoursPage === 3) {
    document.querySelector('#current-hour-plus-17').style.display = 'flex';
    document.querySelector('#current-hour-plus-18').style.display = 'flex';
    document.querySelector('#current-hour-plus-19').style.display = 'flex';
    document.querySelector('#current-hour-plus-20').style.display = 'flex';
    document.querySelector('#current-hour-plus-21').style.display = 'flex';
    document.querySelector('#current-hour-plus-22').style.display = 'flex';
    document.querySelector('#current-hour-plus-23').style.display = 'flex';
    document.querySelector('#current-hour-plus-24').style.display = 'flex';

    dot3.classList.add('dot-selected');
  }
  hourlyContainer.classList.add('change');
  hourlyContainer.onanimationend = () => {
    hourlyContainer.classList.remove('change');
  };
}

function displayDailyForecast() {
  // toggle selected button styling for different forecast buttons
  document.querySelector('.hourly-btn').classList.toggle('forecast-selected');
  document.querySelector('.daily-btn').classList.toggle('forecast-selected');

  const daily = document.querySelector('.forecast-daily-container');
  const hourly = document.querySelector('.forecast-hourly-outer-container');
  hourly.classList.add('leave-right');
  hourly.onanimationend = () => {
    // hide hourly forecasts
    hourly.style.display = 'none';

    // show daily forecast
    daily.style.display = 'flex';
    daily.classList.add('enter-left');
    daily.onanimationend = () => {
      daily.classList.remove('enter-left');
    };

    // hide change hourly forecast page buttons
    document.querySelector('.change-hours').style.display = 'none';

    hourly.classList.remove('leave-right');
  };
}

function displayHourlyForecast() {
  // toggle selected button styling for different forecast buttons
  document.querySelector('.hourly-btn').classList.toggle('forecast-selected');
  document.querySelector('.daily-btn').classList.toggle('forecast-selected');

  const daily = document.querySelector('.forecast-daily-container');
  const hourly = document.querySelector('.forecast-hourly-outer-container');
  daily.classList.add('leave-left');

  daily.onanimationend = () => {
    // hide daily forecasts
    daily.style.display = 'none';

    // show hourly forecasts
    hourly.style.display = 'block';
    hourly.classList.add('enter-right');
    hourly.onanimationend = () => {
      hourly.classList.remove('enter-right');
    };

    // show change hourly forecast page buttons
    document.querySelector('.change-hours').style.display = 'flex';

    daily.classList.remove('leave-left');
  };
}

// render top left weather data
// render top left weather data
function renderWeatherInformation(data, units) {
  let tempUnit = '°C';

  if (units === 'imperial') {
    tempUnit = '°F';
  }
  const weatherDescription = document.querySelector(
    '.weather-info__description'
  );
  weatherDescription.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.capitalize(
    data.current.weather[0].description
  );
  const city = document.querySelector('.weather-info__city');
  city.textContent = data.name;
  const date = document.querySelector('.weather-info__date');
  date.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatDate(data.current.dt, data.timezone_offset);
  const time = document.querySelector('.weather-info__time');
  time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(data.current.dt, data.timezone_offset);

  const temperature = document.querySelector('.weather-info__temperature');
  temperature.textContent = `${Math.round(data.current.temp)} ${tempUnit}`;
  const temperatureIcon = document.querySelector('.weather-info__icon');
  temperatureIcon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.current.weather[0].icon);
}

// render top right weather details
function renderWeatherDetails(data, units) {
  let tempUnit = '°C';
  let speedUnit = 'km/h';

  if (units === 'imperial') {
    tempUnit = '°F';
    speedUnit = 'mph';
  }

  // convert windspeed from meters per second to km/h
  if (units === 'metric') {
    data.current.wind_speed *= 3.6;
  }

  const temperatureFeelsLike = document.querySelector('#feels-like');
  temperatureFeelsLike.textContent = `${Math.round(
    data.current.feels_like
  )} ${tempUnit}`;

  const humidity = document.querySelector('#humidity');
  humidity.textContent = `${data.current.humidity} %`;
  const chanceOfRain = document.querySelector('#chance-of-rain');
  chanceOfRain.textContent = `${data.daily[0].pop} %`;
  const windSpeed = document.querySelector('#wind-speed');
  // round to 1 decimal place
  windSpeed.textContent = `${
    Math.round(data.current.wind_speed * 10) / 10
  } ${speedUnit}`;
}

// render daily forecast
function renderDailyForecast(data, units) {
  let tempUnit = '°C';

  if (units === 'imperial') {
    tempUnit = '°F';
  }

  // ##############################
  // render the day of week name
  // ##############################
  const dayPlusOneDay = document.querySelector(
    '#current-day-plus-one .forecast-daily__day'
  );

  dayPlusOneDay.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatDate(
    data.daily[1].dt,
    data.timezone_offset,
    'day'
  );

  const dayPlusTwoDay = document.querySelector(
    '#current-day-plus-two .forecast-daily__day'
  );
  dayPlusTwoDay.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatDate(
    data.daily[2].dt,
    data.timezone_offset,
    'day'
  );

  const dayPlusThreeDay = document.querySelector(
    '#current-day-plus-three .forecast-daily__day'
  );
  dayPlusThreeDay.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatDate(
    data.daily[3].dt,
    data.timezone_offset,
    'day'
  );

  const dayPlusFourDay = document.querySelector(
    '#current-day-plus-four .forecast-daily__day'
  );
  dayPlusFourDay.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatDate(
    data.daily[4].dt,
    data.timezone_offset,
    'day'
  );

  const dayPlusFiveDay = document.querySelector(
    '#current-day-plus-five .forecast-daily__day'
  );
  dayPlusFiveDay.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatDate(
    data.daily[5].dt,
    data.timezone_offset,
    'day'
  );

  const dayPlusSixDay = document.querySelector(
    '#current-day-plus-six .forecast-daily__day'
  );
  dayPlusSixDay.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatDate(
    data.daily[6].dt,
    data.timezone_offset,
    'day'
  );

  const dayPlusSevenDay = document.querySelector(
    '#current-day-plus-seven .forecast-daily__day'
  );
  dayPlusSevenDay.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatDate(
    data.daily[7].dt,
    data.timezone_offset,
    'day'
  );

  // ##############################
  // render daily high temperature
  // ##############################

  const dayPlusOneTempHigh = document.querySelector(
    '#current-day-plus-one .forecast-daily__temperature-high'
  );
  dayPlusOneTempHigh.textContent = `${Math.round(
    data.daily[1].temp.max
  )} ${tempUnit}`;

  const dayPlusTwoTempHigh = document.querySelector(
    '#current-day-plus-two .forecast-daily__temperature-high'
  );
  dayPlusTwoTempHigh.textContent = `${Math.round(
    data.daily[2].temp.max
  )} ${tempUnit}`;

  const dayPlusThreeTempHigh = document.querySelector(
    '#current-day-plus-three .forecast-daily__temperature-high'
  );
  dayPlusThreeTempHigh.textContent = `${Math.round(
    data.daily[3].temp.max
  )} ${tempUnit}`;

  const dayPlusFourTempHigh = document.querySelector(
    '#current-day-plus-four .forecast-daily__temperature-high'
  );
  dayPlusFourTempHigh.textContent = `${Math.round(
    data.daily[4].temp.max
  )} ${tempUnit}`;

  const dayPlusFiveTempHigh = document.querySelector(
    '#current-day-plus-five .forecast-daily__temperature-high'
  );
  dayPlusFiveTempHigh.textContent = `${Math.round(
    data.daily[5].temp.max
  )} ${tempUnit}`;

  const dayPlusSixTempHigh = document.querySelector(
    '#current-day-plus-six .forecast-daily__temperature-high'
  );
  dayPlusSixTempHigh.textContent = `${Math.round(
    data.daily[6].temp.max
  )} ${tempUnit}`;

  const dayPlusSevenTempHigh = document.querySelector(
    '#current-day-plus-seven .forecast-daily__temperature-high'
  );
  dayPlusSevenTempHigh.textContent = `${Math.round(
    data.daily[7].temp.max
  )} ${tempUnit}`;

  // ##############################
  // render daily low temperature
  // ##############################
  const dayPlusOneTempLow = document.querySelector(
    '#current-day-plus-one .forecast-daily__temperature-low'
  );
  dayPlusOneTempLow.textContent = `${Math.round(
    data.daily[1].temp.min
  )} ${tempUnit}`;

  const dayPlusTwoTempLow = document.querySelector(
    '#current-day-plus-two .forecast-daily__temperature-low'
  );
  dayPlusTwoTempLow.textContent = `${Math.round(
    data.daily[2].temp.min
  )} ${tempUnit}`;

  const dayPlusThreeTempLow = document.querySelector(
    '#current-day-plus-three .forecast-daily__temperature-low'
  );
  dayPlusThreeTempLow.textContent = `${Math.round(
    data.daily[3].temp.min
  )} ${tempUnit}`;

  const dayPlusFourTempLow = document.querySelector(
    '#current-day-plus-four .forecast-daily__temperature-low'
  );
  dayPlusFourTempLow.textContent = `${Math.round(
    data.daily[4].temp.min
  )} ${tempUnit}`;

  const dayPlusFiveTempLow = document.querySelector(
    '#current-day-plus-five .forecast-daily__temperature-low'
  );
  dayPlusFiveTempLow.textContent = `${Math.round(
    data.daily[5].temp.min
  )} ${tempUnit}`;

  const dayPlusSixTempLow = document.querySelector(
    '#current-day-plus-six .forecast-daily__temperature-low'
  );
  dayPlusSixTempLow.textContent = `${Math.round(
    data.daily[6].temp.min
  )} ${tempUnit}`;

  const dayPlusSevenTempLow = document.querySelector(
    '#current-day-plus-seven .forecast-daily__temperature-low'
  );
  dayPlusSevenTempLow.textContent = `${Math.round(
    data.daily[7].temp.min
  )} ${tempUnit}`;

  // ##############################
  // render daily weather icon
  // ##############################
  const dayPlusOneIcon = document.querySelector(
    '#current-day-plus-one .forecast-daily__icon'
  );
  dayPlusOneIcon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.daily[1].weather[0].icon);

  const dayPlusTwoIcon = document.querySelector(
    '#current-day-plus-two .forecast-daily__icon'
  );
  dayPlusTwoIcon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.daily[2].weather[0].icon);

  const dayPlusThreeIcon = document.querySelector(
    '#current-day-plus-three .forecast-daily__icon'
  );
  dayPlusThreeIcon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.daily[3].weather[0].icon);

  const dayPlusFourIcon = document.querySelector(
    '#current-day-plus-four .forecast-daily__icon'
  );
  dayPlusFourIcon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.daily[4].weather[0].icon);

  const dayPlusFiveIcon = document.querySelector(
    '#current-day-plus-five .forecast-daily__icon'
  );
  dayPlusFiveIcon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.daily[5].weather[0].icon);

  const dayPlusSixIcon = document.querySelector(
    '#current-day-plus-six .forecast-daily__icon'
  );
  dayPlusSixIcon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.daily[6].weather[0].icon);

  const dayPlusSevenIcon = document.querySelector(
    '#current-day-plus-seven .forecast-daily__icon'
  );
  dayPlusSevenIcon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.daily[7].weather[0].icon);
}

function renderHourlyForecast(data, units) {
  let tempUnit = '°C';

  if (units === 'imperial') {
    tempUnit = '°F';
  }

  // ##############################
  // render hourly time
  // ##############################

  const hourPlus1Time = document.querySelector(
    '#current-hour-plus-1 .forecast-hourly__day'
  );
  hourPlus1Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[1].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus2Time = document.querySelector(
    '#current-hour-plus-2 .forecast-hourly__day'
  );
  hourPlus2Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[2].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus3Time = document.querySelector(
    '#current-hour-plus-3 .forecast-hourly__day'
  );
  hourPlus3Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[3].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus4Time = document.querySelector(
    '#current-hour-plus-4 .forecast-hourly__day'
  );
  hourPlus4Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[4].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus5Time = document.querySelector(
    '#current-hour-plus-5 .forecast-hourly__day'
  );
  hourPlus5Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[5].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus6Time = document.querySelector(
    '#current-hour-plus-6 .forecast-hourly__day'
  );
  hourPlus6Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[6].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus7Time = document.querySelector(
    '#current-hour-plus-7 .forecast-hourly__day'
  );
  hourPlus7Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[7].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus8Time = document.querySelector(
    '#current-hour-plus-8 .forecast-hourly__day'
  );
  hourPlus8Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[8].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus9Time = document.querySelector(
    '#current-hour-plus-9 .forecast-hourly__day'
  );
  hourPlus9Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[9].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus10Time = document.querySelector(
    '#current-hour-plus-10 .forecast-hourly__day'
  );
  hourPlus10Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[10].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus11Time = document.querySelector(
    '#current-hour-plus-11 .forecast-hourly__day'
  );
  hourPlus11Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[11].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus12Time = document.querySelector(
    '#current-hour-plus-12 .forecast-hourly__day'
  );
  hourPlus12Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[12].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus13Time = document.querySelector(
    '#current-hour-plus-13 .forecast-hourly__day'
  );
  hourPlus13Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[13].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus14Time = document.querySelector(
    '#current-hour-plus-14 .forecast-hourly__day'
  );
  hourPlus14Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[14].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus15Time = document.querySelector(
    '#current-hour-plus-15 .forecast-hourly__day'
  );
  hourPlus15Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[15].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus16Time = document.querySelector(
    '#current-hour-plus-16 .forecast-hourly__day'
  );
  hourPlus16Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[16].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus17Time = document.querySelector(
    '#current-hour-plus-17 .forecast-hourly__day'
  );
  hourPlus17Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[17].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus18Time = document.querySelector(
    '#current-hour-plus-18 .forecast-hourly__day'
  );
  hourPlus18Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[18].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus19Time = document.querySelector(
    '#current-hour-plus-19 .forecast-hourly__day'
  );
  hourPlus19Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[19].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus20Time = document.querySelector(
    '#current-hour-plus-20 .forecast-hourly__day'
  );
  hourPlus20Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[20].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus21Time = document.querySelector(
    '#current-hour-plus-21 .forecast-hourly__day'
  );
  hourPlus21Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[21].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus22Time = document.querySelector(
    '#current-hour-plus-22 .forecast-hourly__day'
  );
  hourPlus22Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[22].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus23Time = document.querySelector(
    '#current-hour-plus-23 .forecast-hourly__day'
  );
  hourPlus23Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[23].dt,
    data.timezone_offset,
    'hour'
  );

  const hourPlus24Time = document.querySelector(
    '#current-hour-plus-24 .forecast-hourly__day'
  );
  hourPlus24Time.textContent = _utils__WEBPACK_IMPORTED_MODULE_0__.formatTime(
    data.hourly[24].dt,
    data.timezone_offset,
    'hour'
  );

  // ##############################
  // render hourly temperature
  // ##############################

  const hourPlus1Temperature = document.querySelector(
    '#current-hour-plus-1 .forecast-hourly__temperature-high'
  );
  hourPlus1Temperature.textContent = `${Math.round(
    data.hourly[1].temp
  )} ${tempUnit}`;

  const hourPlus2Temperature = document.querySelector(
    '#current-hour-plus-2 .forecast-hourly__temperature-high'
  );
  hourPlus2Temperature.textContent = `${Math.round(
    data.hourly[2].temp
  )} ${tempUnit}`;

  const hourPlus3Temperature = document.querySelector(
    '#current-hour-plus-3 .forecast-hourly__temperature-high'
  );
  hourPlus3Temperature.textContent = `${Math.round(
    data.hourly[3].temp
  )} ${tempUnit}`;

  const hourPlus4Temperature = document.querySelector(
    '#current-hour-plus-4 .forecast-hourly__temperature-high'
  );
  hourPlus4Temperature.textContent = `${Math.round(
    data.hourly[4].temp
  )} ${tempUnit}`;

  const hourPlus5Temperature = document.querySelector(
    '#current-hour-plus-5 .forecast-hourly__temperature-high'
  );
  hourPlus5Temperature.textContent = `${Math.round(
    data.hourly[5].temp
  )} ${tempUnit}`;

  const hourPlus6Temperature = document.querySelector(
    '#current-hour-plus-6 .forecast-hourly__temperature-high'
  );
  hourPlus6Temperature.textContent = `${Math.round(
    data.hourly[6].temp
  )} ${tempUnit}`;

  const hourPlus7Temperature = document.querySelector(
    '#current-hour-plus-7 .forecast-hourly__temperature-high'
  );
  hourPlus7Temperature.textContent = `${Math.round(
    data.hourly[7].temp
  )} ${tempUnit}`;

  const hourPlus8Temperature = document.querySelector(
    '#current-hour-plus-8 .forecast-hourly__temperature-high'
  );
  hourPlus8Temperature.textContent = `${Math.round(
    data.hourly[8].temp
  )} ${tempUnit}`;

  const hourPlus9Temperature = document.querySelector(
    '#current-hour-plus-9 .forecast-hourly__temperature-high'
  );
  hourPlus9Temperature.textContent = `${Math.round(
    data.hourly[9].temp
  )} ${tempUnit}`;

  const hourPlus10Temperature = document.querySelector(
    '#current-hour-plus-10 .forecast-hourly__temperature-high'
  );
  hourPlus10Temperature.textContent = `${Math.round(
    data.hourly[10].temp
  )} ${tempUnit}`;

  const hourPlus11Temperature = document.querySelector(
    '#current-hour-plus-11 .forecast-hourly__temperature-high'
  );
  hourPlus11Temperature.textContent = `${Math.round(
    data.hourly[11].temp
  )} ${tempUnit}`;

  const hourPlus12Temperature = document.querySelector(
    '#current-hour-plus-12 .forecast-hourly__temperature-high'
  );
  hourPlus12Temperature.textContent = `${Math.round(
    data.hourly[12].temp
  )} ${tempUnit}`;

  const hourPlus13Temperature = document.querySelector(
    '#current-hour-plus-13 .forecast-hourly__temperature-high'
  );
  hourPlus13Temperature.textContent = `${Math.round(
    data.hourly[13].temp
  )} ${tempUnit}`;

  const hourPlus14Temperature = document.querySelector(
    '#current-hour-plus-14 .forecast-hourly__temperature-high'
  );
  hourPlus14Temperature.textContent = `${Math.round(
    data.hourly[14].temp
  )} ${tempUnit}`;

  const hourPlus15Temperature = document.querySelector(
    '#current-hour-plus-15 .forecast-hourly__temperature-high'
  );
  hourPlus15Temperature.textContent = `${Math.round(
    data.hourly[15].temp
  )} ${tempUnit}`;

  const hourPlus16Temperature = document.querySelector(
    '#current-hour-plus-16 .forecast-hourly__temperature-high'
  );
  hourPlus16Temperature.textContent = `${Math.round(
    data.hourly[16].temp
  )} ${tempUnit}`;

  const hourPlus17Temperature = document.querySelector(
    '#current-hour-plus-17 .forecast-hourly__temperature-high'
  );
  hourPlus17Temperature.textContent = `${Math.round(
    data.hourly[17].temp
  )} ${tempUnit}`;

  const hourPlus18Temperature = document.querySelector(
    '#current-hour-plus-18 .forecast-hourly__temperature-high'
  );
  hourPlus18Temperature.textContent = `${Math.round(
    data.hourly[18].temp
  )} ${tempUnit}`;

  const hourPlus19Temperature = document.querySelector(
    '#current-hour-plus-19 .forecast-hourly__temperature-high'
  );
  hourPlus19Temperature.textContent = `${Math.round(
    data.hourly[19].temp
  )} ${tempUnit}`;

  const hourPlus20Temperature = document.querySelector(
    '#current-hour-plus-20 .forecast-hourly__temperature-high'
  );
  hourPlus20Temperature.textContent = `${Math.round(
    data.hourly[20].temp
  )} ${tempUnit}`;

  const hourPlus21Temperature = document.querySelector(
    '#current-hour-plus-21 .forecast-hourly__temperature-high'
  );
  hourPlus21Temperature.textContent = `${Math.round(
    data.hourly[21].temp
  )} ${tempUnit}`;

  const hourPlus22Temperature = document.querySelector(
    '#current-hour-plus-22 .forecast-hourly__temperature-high'
  );
  hourPlus22Temperature.textContent = `${Math.round(
    data.hourly[22].temp
  )} ${tempUnit}`;

  const hourPlus23Temperature = document.querySelector(
    '#current-hour-plus-23 .forecast-hourly__temperature-high'
  );
  hourPlus23Temperature.textContent = `${Math.round(
    data.hourly[23].temp
  )} ${tempUnit}`;

  const hourPlus24Temperature = document.querySelector(
    '#current-hour-plus-24 .forecast-hourly__temperature-high'
  );
  hourPlus24Temperature.textContent = `${Math.round(
    data.hourly[24].temp
  )} ${tempUnit}`;

  // ##############################
  // render hourly weather icon
  // ##############################
  const hourPlus1Icon = document.querySelector(
    '#current-hour-plus-1 .forecast-hourly__icon'
  );
  hourPlus1Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[1].weather[0].icon);

  const hourPlus2Icon = document.querySelector(
    '#current-hour-plus-2 .forecast-hourly__icon'
  );
  hourPlus2Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[2].weather[0].icon);

  const hourPlus3Icon = document.querySelector(
    '#current-hour-plus-3 .forecast-hourly__icon'
  );
  hourPlus3Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[3].weather[0].icon);

  const hourPlus4Icon = document.querySelector(
    '#current-hour-plus-4 .forecast-hourly__icon'
  );
  hourPlus4Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[4].weather[0].icon);

  const hourPlus5Icon = document.querySelector(
    '#current-hour-plus-5 .forecast-hourly__icon'
  );
  hourPlus5Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[5].weather[0].icon);

  const hourPlus6Icon = document.querySelector(
    '#current-hour-plus-6 .forecast-hourly__icon'
  );
  hourPlus6Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[6].weather[0].icon);

  const hourPlus7Icon = document.querySelector(
    '#current-hour-plus-7 .forecast-hourly__icon'
  );
  hourPlus7Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[7].weather[0].icon);

  const hourPlus8Icon = document.querySelector(
    '#current-hour-plus-8 .forecast-hourly__icon'
  );
  hourPlus8Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[8].weather[0].icon);

  const hourPlus9Icon = document.querySelector(
    '#current-hour-plus-9 .forecast-hourly__icon'
  );
  hourPlus9Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[9].weather[0].icon);

  const hourPlus10Icon = document.querySelector(
    '#current-hour-plus-10 .forecast-hourly__icon'
  );
  hourPlus10Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[10].weather[0].icon);

  const hourPlus11Icon = document.querySelector(
    '#current-hour-plus-11 .forecast-hourly__icon'
  );
  hourPlus11Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[11].weather[0].icon);

  const hourPlus12Icon = document.querySelector(
    '#current-hour-plus-12 .forecast-hourly__icon'
  );
  hourPlus12Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[12].weather[0].icon);

  const hourPlus13Icon = document.querySelector(
    '#current-hour-plus-13 .forecast-hourly__icon'
  );
  hourPlus13Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[13].weather[0].icon);

  const hourPlus14Icon = document.querySelector(
    '#current-hour-plus-14 .forecast-hourly__icon'
  );
  hourPlus14Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[14].weather[0].icon);

  const hourPlus15Icon = document.querySelector(
    '#current-hour-plus-15 .forecast-hourly__icon'
  );
  hourPlus15Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[15].weather[0].icon);

  const hourPlus16Icon = document.querySelector(
    '#current-hour-plus-16 .forecast-hourly__icon'
  );
  hourPlus16Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[16].weather[0].icon);

  const hourPlus17Icon = document.querySelector(
    '#current-hour-plus-17 .forecast-hourly__icon'
  );
  hourPlus17Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[17].weather[0].icon);

  const hourPlus18Icon = document.querySelector(
    '#current-hour-plus-18 .forecast-hourly__icon'
  );
  hourPlus18Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[18].weather[0].icon);

  const hourPlus19Icon = document.querySelector(
    '#current-hour-plus-19 .forecast-hourly__icon'
  );
  hourPlus19Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[19].weather[0].icon);

  const hourPlus20Icon = document.querySelector(
    '#current-hour-plus-20 .forecast-hourly__icon'
  );
  hourPlus20Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[20].weather[0].icon);

  const hourPlus21Icon = document.querySelector(
    '#current-hour-plus-21 .forecast-hourly__icon'
  );
  hourPlus21Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[21].weather[0].icon);

  const hourPlus22Icon = document.querySelector(
    '#current-hour-plus-22 .forecast-hourly__icon'
  );
  hourPlus22Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[22].weather[0].icon);

  const hourPlus23Icon = document.querySelector(
    '#current-hour-plus-23 .forecast-hourly__icon'
  );
  hourPlus23Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[23].weather[0].icon);

  const hourPlus24Icon = document.querySelector(
    '#current-hour-plus-24 .forecast-hourly__icon'
  );
  hourPlus24Icon.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.getIcon(data.hourly[24].weather[0].icon);
}

function renderWeatherData(data, units) {
  renderWeatherInformation(data, units);
  renderWeatherDetails(data, units);
  renderDailyForecast(data, units);
  renderHourlyForecast(data, units);
}

function displayLoading() {
  const ring = document.querySelector('.lds-ring');
  ring.classList.add('display');
}
function hideLoading() {
  const ring = document.querySelector('.lds-ring');
  ring.classList.remove('display');
}




/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "capitalize": () => (/* binding */ capitalize),
/* harmony export */   "formatDate": () => (/* binding */ formatDate),
/* harmony export */   "formatTime": () => (/* binding */ formatTime),
/* harmony export */   "getIcon": () => (/* binding */ getIcon)
/* harmony export */ });
/* harmony import */ var date_fns_fromUnixTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);


// title case a string
function capitalize(words) {
  const separateWord = words.toLowerCase().split(' ');
  for (let i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}

// I couldnt get date-fns to give the local time of a country,
// so I wrote my own functions.

// format a unix date to "Wednesday, 16th Feb '21"
// return just the day of week if dateFormat = 'day'
function formatDate(unix, offset, dateFormat = 'full') {
  const date = (0,date_fns_fromUnixTime__WEBPACK_IMPORTED_MODULE_0__.default)(unix + offset).toUTCString();
  let dayOfWeek = date.slice(0, 3);
  let dayOfMonth = date.slice(5, 7);
  const month = date.slice(8, 11);
  const year = date.slice(14, 16);
  let suffix;

  // change 01 to 1 etc
  if (dayOfMonth < 10) {
    dayOfMonth = dayOfMonth.slice(1);
  }

  // generate corect date suffix
  if (dayOfMonth.slice(-1) === '1') {
    suffix = 'st';
  } else if (dayOfMonth.slice(-1) === '2') {
    suffix = 'nd';
  } else if (dayOfMonth.slice(-1) === '3') {
    suffix = 'rd';
  } else {
    suffix = 'th';
  }

  // those pesky 11, 12, 13 ths
  if (dayOfMonth > 3 && dayOfMonth < 21) {
    suffix = 'th';
  }

  // convert short day name to full day name
  if (dayOfWeek === 'Mon') {
    dayOfWeek = 'Monday';
  } else if (dayOfWeek === 'Tue') {
    dayOfWeek = 'Tuesday';
  } else if (dayOfWeek === 'Wed') {
    dayOfWeek = 'Wednesday';
  } else if (dayOfWeek === 'Thu') {
    dayOfWeek = 'Thursday';
  } else if (dayOfWeek === 'Fri') {
    dayOfWeek = 'Friday';
  } else if (dayOfWeek === 'Sat') {
    dayOfWeek = 'Saturday';
  } else if (dayOfWeek === 'Sun') {
    dayOfWeek = 'Sunday';
  }

  // return only the day of week
  if (dateFormat === 'day') {
    return dayOfWeek;
  }

  // return full date string
  return `${dayOfWeek}, ${dayOfMonth}${suffix} ${month} '${year}`;
}

// convert utc string to format of 8:30 pm / 8:30 am
// return just 9pm or 9am with timeFormat="hour"
function formatTime(unix, offset, timeFormat = 'full') {
  const date = (0,date_fns_fromUnixTime__WEBPACK_IMPORTED_MODULE_0__.default)(unix + offset).toUTCString();
  let hour = date.slice(17, 19);
  const minute = date.slice(20, 22);
  let amOrPm;

  if (hour > 11) {
    amOrPm = 'pm';
  } else {
    amOrPm = 'am';
  }

  // change 24hr to 12hr time
  if (hour > 12) {
    hour -= 12;
  }

  // change am times to 12hr time
  if (hour < 10 && amOrPm === 'am') {
    hour = hour.slice(1, 2);
  }

  // midnight formating
  if (hour === '0') {
    hour = 12;
  }

  // return just the hour
  if (timeFormat === 'hour') {
    return `${hour} ${amOrPm}`;
  }
  return `${hour}:${minute} ${amOrPm}`;
}

// return a weather icon given a weather code
function getIcon(code) {
  if (code === '01d') {
    return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#f5f5f5" viewBox="3 3 26 26">
    <title>sun</title>
    <path d="M16 9c-3.859 0-7 3.141-7 7s3.141 7 7 7 7-3.141 7-7c0-3.859-3.141-7-7-7zM16 21c-2.762 0-5-2.238-5-5s2.238-5 5-5 5 2.238 5 5-2.238 5-5 5zM16 7c0.552 0 1-0.448 1-1v-2c0-0.552-0.448-1-1-1s-1 0.448-1 1v2c0 0.552 0.448 1 1 1zM16 25c-0.552 0-1 0.448-1 1v2c0 0.552 0.448 1 1 1s1-0.448 1-1v-2c0-0.552-0.448-1-1-1zM23.777 9.635l1.414-1.414c0.391-0.391 0.391-1.023 0-1.414s-1.023-0.391-1.414 0l-1.414 1.414c-0.391 0.391-0.391 1.023 0 1.414s1.023 0.391 1.414 0zM8.223 22.365l-1.414 1.414c-0.391 0.391-0.391 1.023 0 1.414s1.023 0.391 1.414 0l1.414-1.414c0.391-0.392 0.391-1.023 0-1.414s-1.023-0.392-1.414 0zM7 16c0-0.552-0.448-1-1-1h-2c-0.552 0-1 0.448-1 1s0.448 1 1 1h2c0.552 0 1-0.448 1-1zM28 15h-2c-0.552 0-1 0.448-1 1s0.448 1 1 1h2c0.552 0 1-0.448 1-1s-0.448-1-1-1zM8.221 9.635c0.391 0.391 1.024 0.391 1.414 0s0.391-1.023 0-1.414l-1.414-1.414c-0.391-0.391-1.023-0.391-1.414 0s-0.391 1.023 0 1.414l1.414 1.414zM23.779 22.363c-0.392-0.391-1.023-0.391-1.414 0s-0.392 1.023 0 1.414l1.414 1.414c0.391 0.391 1.023 0.391 1.414 0s0.391-1.023 0-1.414l-1.414-1.414z"/>
    </svg>`;
  }

  if (code === '01n') {
    return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#f5f5f5" viewBox="8.21 8.21 15.57 15.57">
    <title>moon</title>
    <path d="M21.866 21.447c-3.117 3.12-8.193 3.12-11.313 0s-3.12-8.195 0-11.314c0.826-0.824 1.832-1.453 2.989-1.863 0.365-0.128 0.768-0.035 1.039 0.237 0.274 0.273 0.366 0.677 0.237 1.039-0.784 2.211-0.25 4.604 1.391 6.245 1.638 1.639 4.031 2.172 6.245 1.391 0.362-0.129 0.767-0.036 1.039 0.237 0.273 0.271 0.365 0.676 0.236 1.039-0.408 1.157-1.038 2.164-1.863 2.989zM11.967 11.547c-2.34 2.34-2.34 6.147 0 8.486 2.5 2.501 6.758 2.276 8.937-0.51-2.247 0.141-4.461-0.671-6.109-2.318s-2.458-3.861-2.318-6.108c-0.18 0.141-0.35 0.29-0.51 0.451z"/>
    </svg>`;
  }
  if (code === '02d') {
    return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#f5f5f5" viewBox="0 0 32 32">
    <title>cloudy-day</title>
    <path d="M13 4c0.552 0 1-0.448 1-1v-2c0-0.552-0.448-1-1-1s-1 0.448-1 1v2c0 0.552 0.448 1 1 1zM20.777 6.635l1.414-1.414c0.391-0.391 0.391-1.023 0-1.414s-1.023-0.391-1.414 0l-1.414 1.414c-0.391 0.391-0.391 1.023 0 1.414s1.023 0.391 1.414 0zM1 14h2c0.552 0 1-0.448 1-1s-0.448-1-1-1h-2c-0.552 0-1 0.448-1 1s0.448 1 1 1zM22 13c0 0.552 0.448 1 1 1h2c0.552 0 1-0.448 1-1s-0.448-1-1-1h-2c-0.552 0-1 0.448-1 1zM5.221 6.635c0.391 0.391 1.024 0.391 1.414 0s0.391-1.023 0-1.414l-1.414-1.414c-0.391-0.391-1.023-0.391-1.414 0s-0.391 1.023 0 1.414l1.414 1.414zM25 16c-0.332 0-0.66 0.023-0.987 0.070-1.048-1.43-2.445-2.521-4.029-3.219-0.081-3.789-3.176-6.852-6.984-6.852-3.859 0-7 3.141-7 7 0 1.090 0.271 2.109 0.719 3.027-3.727 0.152-6.719 3.211-6.719 6.973 0 3.859 3.141 7 7 7 0.856 0 1.693-0.156 2.482-0.458 1.81 1.578 4.112 2.458 6.518 2.458 2.409 0 4.708-0.88 6.518-2.458 0.789 0.302 1.626 0.458 2.482 0.458 3.859 0 7-3.141 7-7s-3.141-7-7-7zM13 8c2.488 0 4.535 1.823 4.919 4.203-0.626-0.125-1.266-0.203-1.919-0.203-2.871 0-5.531 1.238-7.398 3.328-0.371-0.698-0.602-1.482-0.602-2.328 0-2.762 2.238-5 5-5zM25 28c-1.070 0-2.057-0.344-2.871-0.917-1.467 1.768-3.652 2.917-6.129 2.917s-4.662-1.148-6.129-2.917c-0.813 0.573-1.801 0.917-2.871 0.917-2.762 0-5-2.238-5-5s2.238-5 5-5c0.484 0 0.941 0.091 1.383 0.221 0.176 0.049 0.354 0.089 0.52 0.158 0.273-0.535 0.617-1.025 0.999-1.484 1.461-1.758 3.634-2.895 6.099-2.895 0.633 0 1.24 0.091 1.828 0.232 0.66 0.156 1.284 0.393 1.865 0.706 1.456 0.773 2.651 1.971 3.404 3.441 0.587-0.242 1.229-0.379 1.904-0.379 2.762 0 5 2.238 5 5s-2.238 5-5 5z"/>
    </svg>`;
  }
  if (code === '02n') {
    return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#f5f5f5" viewBox="0 2.42 32 29.57">
    <title>cloudy-night</title>
    <path d="M27.191 16.385c0.305-0.227 0.613-0.449 0.889-0.725 0.826-0.827 1.454-1.833 1.862-2.991 0.13-0.362 0.038-0.768-0.236-1.039-0.272-0.273-0.676-0.366-1.039-0.237-2.212 0.781-4.605 0.25-6.244-1.391-1.641-1.641-2.174-4.033-1.391-6.244 0.128-0.363 0.036-0.767-0.237-1.040-0.271-0.271-0.676-0.365-1.039-0.237-1.159 0.411-2.164 1.039-2.99 1.864-2.096 2.094-2.749 5.063-2.030 7.737-2.703 0.345-5.133 1.781-6.751 3.987-0.327-0.047-0.655-0.070-0.987-0.070-3.859 0-7 3.141-7 7s3.141 7 7 7c0.856 0 1.693-0.156 2.482-0.458 1.81 1.578 4.112 2.458 6.518 2.458 2.409 0 4.708-0.88 6.518-2.458 0.789 0.302 1.626 0.458 2.482 0.458 3.859 0 7-3.141 7-7 0-3.090-2.026-5.689-4.809-6.615zM18.182 5.76c0.159-0.161 0.329-0.311 0.509-0.452-0.141 2.249 0.671 4.461 2.319 6.108 1.648 1.648 3.861 2.458 6.109 2.319-0.862 1.099-2.050 1.783-3.32 2.074-1.711-2.172-4.225-3.539-6.997-3.762-0.767-2.122-0.318-4.59 1.38-6.288zM25 28c-1.070 0-2.057-0.344-2.871-0.917-1.467 1.768-3.652 2.917-6.129 2.917s-4.662-1.148-6.129-2.917c-0.813 0.573-1.801 0.917-2.871 0.917-2.762 0-5-2.238-5-5s2.238-5 5-5c0.676 0 1.316 0.137 1.902 0.379 1.262-2.46 3.734-4.181 6.645-4.346 0.152-0.009 0.301-0.033 0.453-0.033 0.807 0 1.582 0.126 2.313 0.349 0.987 0.302 1.887 0.794 2.668 1.428 0.746 0.605 1.371 1.348 1.863 2.181 0.083 0.141 0.177 0.273 0.253 0.421 0.587-0.242 1.229-0.379 1.904-0.379 2.762 0 5 2.238 5 5s-2.238 5-5 5z"/>
    </svg>`;
  }
  if (code === '03d' || code === '03n') {
    return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#f5f5f5" viewBox="0 6 32 20">
    <title>cloud</title>
    <path d="M25 10c-0.332 0-0.66 0.023-0.987 0.070-1.867-2.544-4.814-4.070-8.013-4.070s-6.145 1.526-8.013 4.070c-0.327-0.047-0.655-0.070-0.987-0.070-3.859 0-7 3.141-7 7s3.141 7 7 7c0.856 0 1.693-0.156 2.482-0.458 1.81 1.578 4.112 2.458 6.518 2.458 2.409 0 4.708-0.88 6.518-2.458 0.789 0.302 1.626 0.458 2.482 0.458 3.859 0 7-3.141 7-7s-3.141-7-7-7zM25 22c-1.070 0-2.057-0.344-2.871-0.917-1.467 1.768-3.652 2.917-6.129 2.917s-4.662-1.148-6.129-2.917c-0.813 0.573-1.801 0.917-2.871 0.917-2.762 0-5-2.238-5-5s2.238-5 5-5c0.676 0 1.316 0.138 1.902 0.38 1.327-2.588 3.991-4.38 7.098-4.38s5.771 1.792 7.096 4.38c0.587-0.242 1.229-0.38 1.904-0.38 2.762 0 5 2.238 5 5s-2.238 5-5 5z"/>
    </svg>`;
  }
  if (code === '04d' || code === '04n') {
    return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#f5f5f5" viewBox="0 6.57 32 25.43">
    <title>cloudy</title>
    <path d="M32 15c0-3.073-2.5-5.572-5.573-5.572-0.15 0-0.298 0.007-0.447 0.018-1.445-1.803-3.624-2.874-5.98-2.874-2.355 0-4.535 1.070-5.98 2.874-0.148-0.012-0.298-0.018-0.449-0.018-3.070-0-5.57 2.499-5.57 5.572 0 0.322 0.043 0.631 0.094 0.94-0.034 0.044-0.074 0.085-0.107 0.13-0.327-0.047-0.655-0.070-0.987-0.070-3.859 0-7 3.141-7 7s3.141 7 7 7c0.856 0 1.693-0.156 2.482-0.458 1.81 1.578 4.112 2.458 6.518 2.458 2.409 0 4.708-0.88 6.518-2.458 0.789 0.302 1.626 0.458 2.482 0.458 3.859 0 7-3.141 7-7 0-1.605-0.565-3.068-1.479-4.25 0.911-0.994 1.479-2.302 1.479-3.75zM25 28c-1.070 0-2.057-0.344-2.871-0.917-1.467 1.768-3.652 2.917-6.129 2.917s-4.662-1.148-6.129-2.917c-0.813 0.573-1.801 0.917-2.871 0.917-2.762 0-5-2.238-5-5s2.238-5 5-5c0.676 0 1.316 0.137 1.902 0.379 0.035-0.066 0.078-0.125 0.113-0.189 0.352-0.642 0.785-1.23 1.292-1.753 1.443-1.495 3.448-2.438 5.693-2.438 3.107 0 5.771 1.792 7.096 4.379 0.353-0.145 0.729-0.238 1.117-0.301l0.787-0.078c0.771 0 1.492 0.19 2.145 0.5 0.707 0.338 1.314 0.836 1.79 1.449 0.656 0.845 1.065 1.897 1.065 3.051 0 2.762-2.238 5-5 5zM29.098 17.352c-1.155-0.841-2.563-1.352-4.098-1.352-0.332 0-0.66 0.023-0.987 0.070-1.867-2.544-4.814-4.070-8.013-4.070-2.133 0-4.145 0.69-5.809 1.896 0.467-1.428 1.796-2.467 3.379-2.467 0.484 0 0.941 0.098 1.359 0.271 0.949-1.848 2.852-3.126 5.070-3.126s4.122 1.279 5.068 3.126c0.421-0.173 0.88-0.271 1.359-0.271 1.974 0 3.573 1.599 3.573 3.572 0 0.905-0.348 1.721-0.902 2.351z"/>
    </svg>`;
  }
  if (code === '09d' || code === '09n' || code === '10d' || code === '10n') {
    return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#f5f5f5" viewBox="0 0 32 32">
    <title>rainy</title>
    <path d="M25 4c-0.332 0-0.66 0.023-0.987 0.070-1.867-2.544-4.814-4.070-8.013-4.070s-6.145 1.526-8.013 4.070c-0.327-0.047-0.655-0.070-0.987-0.070-3.859 0-7 3.141-7 7s3.141 7 7 7c0.856 0 1.693-0.156 2.482-0.458 1.81 1.578 4.112 2.458 6.518 2.458 2.409 0 4.708-0.88 6.518-2.458 0.789 0.302 1.626 0.458 2.482 0.458 3.859 0 7-3.141 7-7s-3.141-7-7-7zM25 16c-1.070 0-2.057-0.344-2.871-0.917-1.467 1.768-3.652 2.917-6.129 2.917s-4.662-1.148-6.129-2.917c-0.813 0.573-1.801 0.917-2.871 0.917-2.762 0-5-2.238-5-5s2.238-5 5-5c0.676 0 1.316 0.138 1.902 0.38 1.327-2.588 3.991-4.38 7.098-4.38s5.771 1.792 7.096 4.38c0.587-0.242 1.229-0.38 1.904-0.38 2.762 0 5 2.238 5 5s-2.238 5-5 5zM14.063 30c0 1.105 0.895 2 2 2s2-0.895 2-2-2-4-2-4-2 2.895-2 4zM22 28c0 1.105 0.895 2 2 2s2-0.895 2-2-2-4-2-4-2 2.895-2 4zM6 24c0 1.105 0.894 2 2 2s2-0.895 2-2-2-4-2-4-2 2.895-2 4z"/>
    </svg>`;
  }
  if (code === '11d' || code === '11n') {
    return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#f5f5f5" viewBox="0 0 32 32">
    <title>lightning</title>
    <path d="M12 24l2 2-2 6 6-6-2-2 2-4-6 4zM32 8.427c0-3.072-2.5-5.57-5.573-5.57-0.15 0-0.298 0.005-0.447 0.017-1.445-1.802-3.624-2.874-5.98-2.874-2.355 0-4.535 1.072-5.98 2.874-0.148-0.012-0.298-0.017-0.449-0.017-3.070 0-5.57 2.499-5.57 5.57 0 0.322 0.043 0.633 0.094 0.94-0.034 0.044-0.074 0.085-0.107 0.13-0.327-0.047-0.655-0.070-0.987-0.070-3.859 0-7 3.141-7 7s3.141 7 7 7c0.856 0 1.693-0.156 2.482-0.458 0.069 0.060 0.151 0.102 0.221 0.16l1.77-1.18c-0.59-0.418-1.141-0.883-1.602-1.438-0.813 0.572-1.801 0.915-2.871 0.915-2.762 0-5-2.237-5-5 0-2.76 2.238-5 5-5 0.676 0 1.316 0.138 1.902 0.38 0.035-0.068 0.078-0.125 0.113-0.19 0.352-0.642 0.785-1.229 1.292-1.753 1.443-1.493 3.448-2.438 5.693-2.438 3.107 0 5.771 1.792 7.096 4.38 0.353-0.146 0.729-0.24 1.117-0.302l0.787-0.078c0.771 0 1.492 0.19 2.145 0.5 0.707 0.339 1.314 0.836 1.79 1.45 0.656 0.845 1.065 1.896 1.065 3.050 0 2.763-2.238 5-5 5-1.070 0-2.057-0.344-2.871-0.915-0.875 1.055-2.027 1.848-3.322 2.348l-0.374 0.746 1.141 1.141c1.066-0.415 2.064-1.012 2.944-1.777 0.789 0.302 1.626 0.458 2.482 0.458 3.859 0 7-3.141 7-7 0-1.604-0.565-3.068-1.479-4.25 0.911-0.992 1.479-2.301 1.479-3.75zM29.098 10.779c-1.155-0.84-2.563-1.352-4.098-1.352-0.332 0-0.66 0.023-0.987 0.070-1.867-2.543-4.814-4.070-8.013-4.070-2.133 0-4.145 0.691-5.809 1.897 0.467-1.428 1.796-2.467 3.379-2.467 0.484 0 0.941 0.098 1.359 0.271 0.949-1.849 2.852-3.128 5.070-3.128s4.122 1.279 5.068 3.128c0.421-0.173 0.88-0.271 1.359-0.271 1.974 0 3.573 1.599 3.573 3.57 0 0.906-0.348 1.723-0.902 2.352z"/>
    </svg>`;
  }
  if (code === '13d' || code === '13n') {
    return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#f5f5f5" viewBox="0.5 1 47.01 47.01">
    <title>snow</title>
    <path d="M14.5 24.502c0 1 0.16 1.97 0.44 2.871l-4.080 2.35-7.26-1.94c-1.31-0.35-2.66 0.43-3.020 1.729-0.35 1.311 0.43 2.65 1.75 3l5.87 1.57-1.58 5.84c-0.35 1.301 0.43 2.65 1.74 3 1.32 0.35 2.67-0.43 3.020-1.738l1.94-7.221 4.27-2.451c1.11 1.010 2.46 1.771 3.95 2.172v5.5l-5.32 4.488c-0.96 0.99-0.96 2.59 0 3.59 0.96 0.99 2.52 0.99 3.48 0l4.3-4.439 4.3 4.439c0.96 0.99 2.52 0.99 3.479 0 0.961-1 0.961-2.6 0-3.59l-5.319-4.488v-5.5c1.49-0.4 2.84-1.162 3.95-2.172l4.27 2.451 1.94 7.221c0.35 1.309 1.699 2.088 3.020 1.738 1.311-0.35 2.091-1.699 1.74-3l-1.58-5.84 5.87-1.57c1.32-0.35 2.1-1.689 1.75-3-0.359-1.299-1.71-2.078-3.020-1.729l-7.261 1.939-4.079-2.35c0.279-0.9 0.439-1.871 0.439-2.871s-0.16-1.97-0.439-2.88l4.079-2.34 7.261 1.94c1.31 0.35 2.66-0.431 3.020-1.73 0.35-1.31-0.43-2.65-1.75-3l-5.87-1.57 1.58-5.84c0.351-1.3-0.43-2.649-1.74-3-1.32-0.35-2.67 0.43-3.020 1.74l-1.94 7.22-4.27 2.45c-1.11-1.010-2.46-1.77-3.95-2.17v-4.5l5.319-5.49c0.961-0.99 0.961-2.59 0-3.59-0.96-0.99-2.52-0.99-3.479 0l-4.3 4.442-4.3-4.44c-0.96-0.99-2.52-0.99-3.48 0-0.96 1-0.96 2.6 0 3.59l5.32 5.49v4.5c-1.49 0.4-2.84 1.16-3.95 2.17l-4.27-2.45-1.94-7.22c-0.35-1.311-1.7-2.090-3.020-1.74-1.31 0.351-2.090 1.7-1.74 3l1.58 5.84-5.87 1.57c-1.32 0.35-2.1 1.69-1.75 3 0.36 1.3 1.71 2.080 3.020 1.73l7.26-1.94 4.080 2.34c-0.28 0.91-0.44 1.879-0.44 2.879zM24 29.002c-2.49 0-4.5-2.010-4.5-4.5s2.010-4.5 4.5-4.5 4.5 2.010 4.5 4.5c0 2.49-2.010 4.5-4.5 4.5z"/>
    </svg>`;
  }
  if (code === '50d' || code === '50n') {
    return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#f5f5f5" viewBox="1.94 5.94 30 18">
    <title>mist</title>
    <path d="M30.938 13.938h-5.102c-0.504-4.487-4.277-8-8.898-8-3.113 0-5.859 1.591-7.477 4h-6.523c-0.552 0-1 0.448-1 1s0.448 1 1 1h5.552c-0.226 0.638-0.374 1.306-0.45 2h-3.102c-0.552 0-1 0.448-1 1s0.448 1 1 1h3.102c0.077 0.693 0.224 1.363 0.45 2h-5.37c-0.654 0-1.182 0.448-1.182 1s0.529 1 1.182 1h6.341c1.617 2.41 4.363 4 7.477 4s5.859-1.59 7.477-4h2.341c0.654 0 1.182-0.448 1.182-1s-0.529-1-1.182-1h-1.37c0.227-0.637 0.372-1.307 0.451-2h5.102c0.552 0 1-0.448 1-1s-0.448-1-1-1zM10.639 11.938h6.298c0.552 0 1-0.448 1-1s-0.448-1-1-1h-4.884c1.263-1.233 2.983-2 4.884-2 3.518 0 6.409 2.617 6.898 6h-13.797c0.102-0.707 0.302-1.378 0.6-2zM16.938 21.938c-1.901 0-3.621-0.768-4.884-2h9.767c-1.262 1.232-2.982 2-4.883 2zM23.234 17.938h-12.595c-0.298-0.622-0.499-1.293-0.6-2h13.797c-0.102 0.707-0.302 1.378-0.602 2z"/>
    </svg>`;
  }

  return '';
}



/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fromUnixTime)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);



/**
 * @name fromUnixTime
 * @category Timestamp Helpers
 * @summary Create a date from a Unix timestamp.
 *
 * @description
 * Create a date from a Unix timestamp.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Number} unixTime - the given Unix timestamp
 * @returns {Date} the date
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Create the date 29 February 2012 11:45:05:
 * var result = fromUnixTime(1330515905)
 * //=> Wed Feb 29 2012 11:45:05
 */

function fromUnixTime(dirtyUnixTime) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var unixTime = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyUnixTime);
  return (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(unixTime * 1000);
}

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ requiredArgs)
/* harmony export */ });
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toInteger)
/* harmony export */ });
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */

function toDate(argument) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _apiFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _domFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



// text input to search city
const searchBox = document.querySelector('.search-box-input');
// search icon next to search box
const searchIcon = document.querySelector('.search');
// label/link that converts to imperial units
const displayF = document.querySelector('.weather-info__units-f');
// label/link that converts to metric units
const displayC = document.querySelector('.weather-info__units-c');
// default units to metric
let units = 'metric';
// button that displays the 7 day forecast
const dailyBtn = document.querySelector('.daily-btn');
// button that displays the 24hr hourly forecast
const hourlyBtn = document.querySelector('.hourly-btn');
// button that shifts to the previous hourly forecasts
const changeHoursLeft = document.querySelector('.change-hours__left');
// button that shifts to the next hourly forecasts
const changeHoursRight = document.querySelector('.change-hours__right');
// navigation labels that show you what "page" of hourly forecasts you are viewing, as only
// 8 are displayed at any one time
const dots = document.querySelectorAll('.dot');
// display the first "page" of hourly forecasts by default
let hoursPage = 1;

// flags to keep track of last searched city, to re-use this info when changing units
let unitReload = false;
let lastCity = 'cairo';

// hide data labels until the data has loaded

document.querySelector('body').style.visibility = 'hidden';

// Procedural workflow function
async function getWeatherData(unit, initialLoad = false) {
  // try to get weather data for the city name that was input into search box
  try {
    let cityName;
    // default weather location on initial load
    if (initialLoad) {
      cityName = 'cairo';
    } else {
      // if not initial load, get relevent weather data
      cityName = _apiFunctions__WEBPACK_IMPORTED_MODULE_0__.getDataFromInput();
    }

    // if no name entered, exit function
    if (!cityName) {
      return;
    }

    // when changing display between metric and imperial units, the data must refresh with a new api call
    // that uses those new units. when the units are changed, unitReload is set to true and then the
    // getWeatherData function is fired. if unitReload is true, then we want to search for the same city
    // as the previous one.
    if (unitReload) {
      cityName = lastCity;
    }

    // keep track of the last searched city, so when refreshing the data with changed units
    // the same current city will be searched for.
    lastCity = cityName;
    // remove error msg if previous search failed
    document.querySelector('.error-msg').style.visibility = 'hidden';
    // get coordinates of searched city
    const requestCoordsUrl = _apiFunctions__WEBPACK_IMPORTED_MODULE_0__.buildRequestCoordsUrl(cityName);
    const coords = await _apiFunctions__WEBPACK_IMPORTED_MODULE_0__.getCoords(requestCoordsUrl);

    // get weather data of supplied coordinates
    const requestForecastUrl = _apiFunctions__WEBPACK_IMPORTED_MODULE_0__.buildRequestForecastUrl(coords, unit);
    const weatherData = await _apiFunctions__WEBPACK_IMPORTED_MODULE_0__.getForecast(requestForecastUrl);

    // copy some data over from the coordinates data over to the new data
    weatherData.name = coords.name;
    weatherData.country = coords.country;

    // extract relevent data from the returned api object and display it
    // to the dom. the unit paramater specifies whether or not to display
    // temperature in C or F.
    _domFunctions__WEBPACK_IMPORTED_MODULE_1__.renderWeatherData(weatherData, unit);
    // reset unit reload
    unitReload = false;

    // on initial load, body is set to invisble. when the data is ready to be displayed,
    // set the body to visible.
    document.querySelector('body').style.visibility = 'visible';
  } catch (err) {
    // display input search error to user if the searched location does not return
    // any weather data
    console.log(err);
    document.querySelector('.error-msg').style.visibility = 'visible';
  }
  document.querySelector('.search-box-input').value = '';
}

// intial load
getWeatherData(units, true);

searchIcon.addEventListener('click', () => {
  getWeatherData(units);
});

searchBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    getWeatherData(units);
  }
});

dailyBtn.addEventListener('click', () => {
  if (!dailyBtn.classList.contains('forecast-selected')) {
    _domFunctions__WEBPACK_IMPORTED_MODULE_1__.displayDailyForecast();
  }
});

hourlyBtn.addEventListener('click', () => {
  if (!hourlyBtn.classList.contains('forecast-selected')) {
    _domFunctions__WEBPACK_IMPORTED_MODULE_1__.displayHourlyForecast();
  }
});

// if not on the fist page, go to previous page
changeHoursLeft.addEventListener('click', () => {
  if (hoursPage > 1) {
    hoursPage--;
    _domFunctions__WEBPACK_IMPORTED_MODULE_1__.changeHoursPage(hoursPage);
  }
});

// if not on the last page, go to next page
changeHoursRight.addEventListener('click', () => {
  if (hoursPage < 3) {
    hoursPage++;
    _domFunctions__WEBPACK_IMPORTED_MODULE_1__.changeHoursPage(hoursPage);
  }
});

// navigation dots for changing hours page
dots.forEach((dot) => {
  dot.addEventListener('click', (e) => {
    hoursPage = parseInt(e.target.dataset.dot, 10);
    _domFunctions__WEBPACK_IMPORTED_MODULE_1__.changeHoursPage(hoursPage);
  });
});

// toggle degrees c / degrees f
displayC.addEventListener('click', async () => {
  units = 'metric';
  unitReload = true;
  await getWeatherData(units, true);

  displayC.style.display = 'none';
  displayF.style.display = 'block';
});

displayF.addEventListener('click', async () => {
  units = 'imperial';
  unitReload = true;
  await getWeatherData(units, true);

  displayF.style.display = 'none';
  displayC.style.display = 'block';
});

})();

/******/ })()
;
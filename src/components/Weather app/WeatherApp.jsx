import React, { useState } from 'react';
import '../Weather app/WeatherApp.css';

import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import clear_icon from '../Assets/clear.png';
import search_icon from '../Assets/search.png';
import cloud_icon from '../Assets/cloud.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState({
        humidity: '64%',
        windSpeed: '18 km/h',
        temperature: '24',
        location: 'London'
    });

    const [wicon, setWicon] = useState(cloud_icon);

    let api_key = 'c875efdd25ba492aabf15fb7eea41ad0';

    const search = async () => {
        const element = document.getElementsByClassName('cityInput');
        if (element[0].value === '') {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();

        setWeatherData({
            humidity: data.main.humidity + '%',
            windSpeed: Math.floor(data.wind.speed) + ' km/h',
            temperature: Math.floor(data.main.temp),
            location: data.name
        });


        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            setWicon(clear_icon);
        }
        else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setWicon(cloud_icon);
        }
        else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
            setWicon(drizzle_icon);
        }
        else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
            setWicon(rain_icon);
        }
        else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWicon(rain_icon);
        }
        else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setWicon(snow_icon);
        }
        else {
            setWicon(clear_icon);
        }

    };

    return (
        <div className="container">
            <div className="main">
                <div className="top-bar">
                    <input type="text" className="cityInput" placeholder='Search' />
                    <div className="search-icon" onClick={search}>
                        <img src={search_icon} alt="search" />
                    </div>
                </div>
                <div className="weather-location">{weatherData.location}</div>
                <div className="weather-image">
                    <img src={wicon} alt="weather" />
                </div>
                <div className="weather-temp">{weatherData.temperature}°c</div>


                <div className="data-container">
                    <div className="element">
                        <img src={humidity_icon} alt="humidity" />
                        <div className="data">
                            <div className="humidity-percent">{weatherData.humidity}</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className="element">
                        <img src={wind_icon} alt="wind" />
                        <div className="data">
                            <div className="wind-rate">{weatherData.windSpeed}</div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;

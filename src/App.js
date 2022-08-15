import { useDispatch, useSelector } from 'react-redux';
import { fetchCities, getCities, getGeoStatus } from './features/geocodingSlice';
import {
  getChosenCity,
  getCurrentStatus,
  getCurrentWeather,
  getForecast,
  getForecastStatus,
} from './features/weatherSlice';
import Selector from './components/Selector/Selector';
import Input from './components/Input/Input';
import './App.css';
import { useState } from 'react';

function App() {
  const dispatch = useDispatch();

  const geoAPI = useSelector(getCities);
  const chosenCity = useSelector(getChosenCity);
  const currentWeather = useSelector(getCurrentWeather);
  const forecastWeather = useSelector(getForecast);

  const getStatus = useSelector(getGeoStatus);
  const currentWeatherStatus = useSelector(getCurrentStatus);
  const forecastStatus = useSelector(getForecastStatus);

  const [cityInput, setCityInput] = useState('');

  return (
    <div>
      <h1>Weather App</h1>
      <div className="Wrapper">
        <div>
          <Input
            placeholder="City name"
            setCityInput={setCityInput}
            func={() => dispatch(fetchCities(cityInput))}
          />
          {getStatus === 'succeeded' && <Selector cityData={geoAPI} />}
        </div>
        {forecastStatus === 'succeeded' && currentWeatherStatus === 'succeeded' && (
          <div className="WeatherWrapper">
            <h1>{chosenCity.name}</h1>
            <h2>Current temperature: {currentWeather.main.temp} °C</h2>
            <div>
              <h2>Temperature forecast</h2>
              <div className="ForecastWrapper">
                <div>
                  <h3>Temperature: {forecastWeather.list[1].main.temp} °C</h3>
                  <h3>Weather: {forecastWeather.list[1].weather[0].main}</h3>
                  <h3>Date: {forecastWeather.list[1].dt_txt}</h3>
                </div>
                <div>
                  <h3>Temperature: {forecastWeather.list[2].main.temp} °C</h3>
                  <h3>Weather: {forecastWeather.list[2].weather[0].main}</h3>
                  <h3>Date: {forecastWeather.list[2].dt_txt}</h3>
                </div>
                <div>
                  <h3>Temperature: {forecastWeather.list[3].main.temp} °C</h3>
                  <h3>Weather: {forecastWeather.list[3].weather[0].main}</h3>
                  <h3>Date: {forecastWeather.list[3].dt_txt}</h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import { useDispatch, useSelector } from 'react-redux';
import { fetchCities, getCities, getGeoStatus } from './features/geocodingSlice';
import {
  getChosenCity,
  getCurrentStatus,
  getCurrentWeather,
  getForecast,
  getForecastStatus,
  getIndex,
} from './features/weatherSlice';
import Selector from './components/Selector/Selector';
import Input from './components/Input/Input';
import './App.css';
import { useState } from 'react';
import Slider from './components/Slider/Slider';

function App() {
  const dispatch = useDispatch();

  const geoAPI = useSelector(getCities);
  const chosenCity = useSelector(getChosenCity);
  const currentWeather = useSelector(getCurrentWeather);
  const forecasts = useSelector(getForecast);
  const getI = useSelector(getIndex);

  const getStatus = useSelector(getGeoStatus);
  const currentWeatherStatus = useSelector(getCurrentStatus);
  const forecastStatus = useSelector(getForecastStatus);

  const [cityInput, setCityInput] = useState('');

  return (
    <div>
      <h1>Weather App</h1>
      <div className="Wrapper">
        <div style={{ margin: '5px' }}>
          <Input
            placeholder="City name"
            setCityInput={setCityInput}
            func={() => dispatch(fetchCities(cityInput))}
          />
          {getStatus === 'succeeded' && <Selector cityData={geoAPI} />}
        </div>
        {forecastStatus === 'succeeded' &&
          currentWeatherStatus === 'succeeded' &&
          (getI === -1 ? (
            <div className="WeatherWrapper">
              <h1>{chosenCity.name}</h1>
              <h2>Current temperature: {currentWeather.main.temp} °C</h2>
              <div>
                <h2>Temperature forecast</h2>
                <Slider />
              </div>
            </div>
          ) : (
            <div className="WeatherWrapper">
              <h1>{chosenCity.name}</h1>
              <h2>Current temperature: {forecasts.list[getI].main.temp} °C</h2>
              <div>
                <h2>Temperature forecast</h2>
                <Slider />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;

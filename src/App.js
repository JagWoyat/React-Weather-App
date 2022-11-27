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
import WeatherIcon from './components/Slider/WeatherIcon';

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
    <>
      <div className="PrimaryHeader">
        <div className="AppWrapper">
          <h1 className="Header">Weather App</h1>
        </div>
      </div>
      <div className="AppWrapper">
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
            (getI === -1 || !getI ? (
              <div className="WeatherWrapper">
                <h1>{chosenCity.name}</h1>
                <div>
                  <WeatherIcon weather={forecasts.list[getI]} selected />
                </div>
                <div>
                  <h2>Temperature forecast</h2>
                  <Slider />
                </div>
              </div>
            ) : (
              <div className="WeatherWrapper">
                <h1>{chosenCity.name}</h1>
                {/* <h2>
                Temperature on {forecasts.list[getI].dt_txt.slice(0, 10) + ' '}
                {forecasts.list[getI].dt_txt.slice(11, 19) + ' '}: {forecasts.list[getI].main.temp}{' '}
                °C
              </h2> */}
                <div>
                  <WeatherIcon weather={forecasts.list[getI]} selected />
                </div>
                <div>
                  <h2>Temperature forecast</h2>
                  <Slider />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;

import { useSelector } from 'react-redux';
import { getForecast } from '../../features/weatherSlice';
import './Slider.css';
import WeatherIcon from './WeatherIcon';
import React from 'react';

export default function Slider() {
  const forecasts = useSelector(getForecast);

  return (
    <div>
      <ul className="Slider">
        {React.Children.toArray(
          forecasts.list.map((forecast) => (
            <li>
              <WeatherIcon weather={forecast} key={forecast.id} />
            </li>
          )),
        )}
      </ul>
    </div>
  );
}

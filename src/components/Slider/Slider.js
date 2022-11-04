import { useDispatch, useSelector } from 'react-redux';
import { changeIndex, getForecast } from '../../features/weatherSlice';
import './Slider.css';
import WeatherIcon from './WeatherIcon';
import React, { useState } from 'react';
import arrow from '../../svg/arrow.svg';

export default function Slider() {
  const forecasts = useSelector(getForecast);
  const dispatch = useDispatch();
  const [getX, setX] = useState(0);
  const [index, setIndex] = useState(0);

  const translateV = 250;

  return (
    <div className="SliderWrapper">
      <button
        className="Butt"
        onClick={() => {
          setX(getX + translateV);
        }}
        style={{ backgroundImage: `url(${arrow})` }}
        alt={'Arrow button'}
      />
      <ul
        className="Slider"
        style={{ transform: `translateX(${getX}px)`, transition: 'transform 0.3s ease-in-out' }}
      >
        {React.Children.toArray(
          forecasts.list.map((forecast, id) => (
            <li
              onClick={() => {
                setIndex(id + 1);
                dispatch(changeIndex(index));
              }}
            >
              <WeatherIcon weather={forecast} key={id} />
            </li>
          )),
        )}
      </ul>
      <button
        className="Butt"
        onClick={() => {
          setX(getX - translateV);
        }}
        style={{ backgroundImage: `url(${arrow})` }}
        alt={'Arrow button'}
      />
    </div>
  );
}

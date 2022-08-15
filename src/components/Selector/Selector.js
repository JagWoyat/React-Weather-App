import { useDispatch } from 'react-redux';
import { addCity, fetchCurrentWeather, fetchForecastWeather } from '../../features/weatherSlice';
import Button from '../Button/Button';
import './Selector.css';

function Option({ id, name, country, state, lat, lon }) {
  const dispatch = useDispatch();

  return (
    <div className="OptionWrapper">
      <h4>City name: {name}</h4>
      <h5>Country: {country}</h5>
      <h5>State: {state}</h5>
      <div className="Button">
        <Button
          onClick={() => {
            dispatch(
              addCity({
                id,
                name,
                country,
                state,
                lat,
                lon,
              }),
            );
            dispatch(
              fetchCurrentWeather({
                lat,
                lon,
              }),
            );
            dispatch(
              fetchForecastWeather({
                lat,
                lon,
              }),
            );
          }}
        >
          Select
        </Button>
      </div>
    </div>
  );
}

export default function Selector({ cityData }) {
  return (
    <div>
      {cityData.map((data) => (
        <Option
          id={data.id}
          name={data.name}
          country={data.country}
          state={data.state}
          lat={data.lat}
          lon={data.lon}
          key={data.id}
        />
      ))}
    </div>
  );
}

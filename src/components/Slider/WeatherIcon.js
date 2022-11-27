import './WeatherIcon.css';

export default function WeatherIcon({ weather, selected }) {
  return (
    <>
      {selected === true ? (
        <div className="SelectedWrapper">
          <div>{weather.main.temp + '°C'}</div>
          <img
            className="SelectedIcon"
            src={require('../../svg/' + weather.weather[0].icon + '.svg')}
            alt={weather.weather[0].main}
          />
          <div>
            {weather.dt_txt.slice(0, 10) + ' '}
            {weather.dt_txt.slice(11, 19) + ' '}
          </div>
        </div>
      ) : (
        <div className="IconWrapper">
          <div className="Background">
            <div>{weather.main.temp + '°C'}</div>
            <img
              className="ArrowIcon"
              src={require('../../svg/' + weather.weather[0].icon + '.svg')}
              alt={weather.weather[0].main}
            />
            <div>
              {weather.dt_txt.slice(0, 10) + ' '}
              {weather.dt_txt.slice(11, 19) + ' '}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

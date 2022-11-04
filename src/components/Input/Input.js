import './Input.css';
import Icon from '../Icon/Icon';
import glass from './magnifying-glass.svg';

export default function Input({ placeholder, setCityInput, func }) {
  return (
    <div className="InputWrapper">
      <input
        className="input"
        placeholder={placeholder}
        onChange={(event) => setCityInput(event.target.value)}
        onKeyPress={(event) => {
          if (event.code === 'Enter') {
            func();
          }
        }}
      />
      <Icon icon={glass} onClick={func} />
    </div>
  );
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import geocodingSlice from './features/geocodingSlice';
import weatherSlice from './features/weatherSlice';

const store = configureStore({
  reducer: {
    city: geocodingSlice,
    weather: weatherSlice,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

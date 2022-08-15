import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  forecast: [],
  current: [],
  city: [],
  status: {
    current: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    forecast: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  error: null,
};

export const fetchCurrentWeather = createAsyncThunk('/city/weather', async (location) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=69a56e48c6736c1d1e0289481de1b392&units=metric`,
  );
  return response.data;
});

export const fetchForecastWeather = createAsyncThunk('/city/forecast', async (location) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=69a56e48c6736c1d1e0289481de1b392&units=metric`,
  );
  return response.data;
});

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addCity: (state, action) => {
      state.city = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentWeather.pending, (state, action) => {
        state.status.current = 'loading';
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.status.current = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.status.current = 'succeeded';
        state.current = action.payload;
      })
      .addCase(fetchForecastWeather.pending, (state, action) => {
        state.status.forecast = 'loading';
      })
      .addCase(fetchForecastWeather.rejected, (state, action) => {
        state.status.forecast = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchForecastWeather.fulfilled, (state, action) => {
        state.status.forecast = 'succeeded';
        state.forecast = action.payload;
      });
  },
});

export default weatherSlice.reducer;

export const getChosenCity = (state) => state.weather.city;
export const getCurrentWeather = (state) => state.weather.current;
export const getForecast = (state) => state.weather.forecast;
export const getCurrentStatus = (state) => state.weather.status.current;
export const getForecastStatus = (state) => state.weather.status.forecast;
export const getWeatherError = (state) => state.weather.error;

export const { addCity } = weatherSlice.actions;

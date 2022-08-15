import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  cities: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchCities = createAsyncThunk('/city/cities', async (city) => {
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=69a56e48c6736c1d1e0289481de1b392`,
  );
  return response.data;
});

export const geocodingSlice = createSlice({
  name: 'city',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCities.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        let payload = action.payload;
        for (let i = 0; i < payload.length; i++) {
          payload[i].id = i;
        }
        state.cities = payload;
      });
  },
});

export default geocodingSlice.reducer;

export const getCities = (state) => state.city.cities;
export const getGeoStatus = (state) => state.city.status;
//export const getTodosError = (state) => state.todo.error;

import { configureStore } from '@reduxjs/toolkit';
import animeReducer from './redux/HomePage.Slice';

const store = configureStore({
  reducer: {
    anime: animeReducer,
  },
});

export default store;

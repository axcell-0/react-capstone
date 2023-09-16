import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://kitsu.io/api/edge';

const initialState = {
  animeList: [],
  anime: {},
  loading: true,
  loadingAnime: true,
  error: null,
};

export const fetchAnimeListByCategory = createAsyncThunk('anime/fetchAnimeListByCategory', async (category) => {
  try {
    const response = await axios.get(`${baseUrl}/anime?filter[categories]=${category}&page[limit]=15`);
    const animeList = response.data.data.map((anime) => ({
      id: anime.id,
      ...anime.attributes,
    }));
    return animeList;
  } catch (error) {
    throw new Error('Failed to fetch anime.');
  }
});

export const fetchAnimeDetailsById = createAsyncThunk('anime/fetchAnimeDetailsById', async (animeId) => {
  try {
    const response = await axios.get(`${baseUrl}/anime/${animeId}`);
    const animeData = {
      id: response.data.data.id,
      ...response.data.data.attributes,
    };
    return animeData;
  } catch (error) {
    throw new Error('Failed to fetch anime by ID.');
  }
});

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeListByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeListByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.animeList = action.payload;
      })
      .addCase(fetchAnimeListByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAnimeDetailsById.pending, (state) => {
        state.loadingAnime = true;
        state.error = null;
      })
      .addCase(fetchAnimeDetailsById.fulfilled, (state, action) => {
        state.loadingAnime = false;
        state.anime = action.payload;
      })
      .addCase(fetchAnimeDetailsById.rejected, (state, action) => {
        state.loadingAnime = false;
        state.error = action.error.message;
      });
  },
});

export const { setError } = animeSlice.actions;

export default animeSlice.reducer;

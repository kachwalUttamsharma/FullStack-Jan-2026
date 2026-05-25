import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTrendingMovies = createAsyncThunk(
  "movies/fetchTrendingThunk",
  async (pageNo, thunkApi) => {
    try {
      const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=0fa9d94b072b5c497f3a9720acb86bc2&language=en-US&page=${pageNo}`;
      return axios.get(url).then((response) => {
        const movieData = response?.data?.results?.slice(0, 5);
        return movieData;
      });
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    loading: false,
    error: false,
  },
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchTrendingMovies.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default movieSlice.reducer;

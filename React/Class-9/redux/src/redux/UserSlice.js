import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (val, thunkAPI) => {
    try {
      const resp = await fetch(
        `https://jsonplaceholder.typicode.com/users/${val}`,
      );
      const user = await resp.json();
      return user;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  },
);

const UserSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: null,
    error: false,
    loading: true,
    val: "",
  },
  reducers: {
    // startLoading: (state) => {
    //   state.loading = true;
    //   state.error = false;
    // },
    // stopLoading: (state) => {
    //   state.loading = false;
    // },
    // userErrors: (state) => {
    //   state.error = true;
    //   state.loading = false;
    // },
    // userData: (state, data) => {
    //   state.loading = false;
    //   state.user = data.payload;
    // },
    setVal: (state, data) => {
      state.val = data.payload;
      state.error = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

// export const { userData, userErrors, setVal, stopLoading, startLoading } =
//   UserSlice.actions;
export const { setVal } = UserSlice.actions;
export default UserSlice.reducer;

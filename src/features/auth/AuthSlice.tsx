import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { requestGetUserInfo } from './api/user.api';

const initialState: any = {
  isLoading: true,
  userInfo: null
};

// export const getUserInfoAction = createAsyncThunk('auth/info', async (payload, thunkApi) => {
//   const res = await requestGetUserInfo();
//   console.log('res: ', res);
//   return res.data;
// });

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //     increment: (state) => {
    //       // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //       // doesn't actually mutate the state because it uses the Immer library,
    //       // which detects changes to a "draft state" and produces a brand new
    //       // immutable state based off those changes
    //       state.userInfor += 1;
    //     },
    //     decrement: (state) => {
    //       state.userInfor -= 1;
    //     },
    //     incrementByAmount: (state, action: PayloadAction<number>) => {
    //       state.userInfor += action.payload;
    //     }
  },
  extraReducers: (builder) => {
    // builder.addCase(getUserInfoAction.pending, (state, action) => {
    //   state.isLoading = true;
    //   return state;
    // });
    // builder.addCase(getUserInfoAction.fulfilled, (state, action) => {
    //   state.userInfo = action.payload;
    //   state.isLoading = false;
    //   return state;
    // });
    // builder.addCase(getUserInfoAction.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.userInfo = null;
    //   return state;
    // });
  }
});

export default authSlice.reducer;

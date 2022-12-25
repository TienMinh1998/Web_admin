import { createSlice } from '@reduxjs/toolkit';
import { ProfileType } from '../types';

type ProfileReducerState = {
  profile: ProfileType | null;
};

const initialState: ProfileReducerState = {
  profile: null
};

const slice = createSlice({
  name: 'auth/profile',
  initialState,
  reducers: {
    loadProfile: (state, action) => {
      return;
    },
    updateProfile: (state, action) => {
      return;
    },
    clearProfile: (state, action) => {
      return;
    }
  }
});
const { actions, reducer } = slice;
export const { loadProfile, updateProfile, clearProfile } = actions;
export { reducer as ProfileReducer };

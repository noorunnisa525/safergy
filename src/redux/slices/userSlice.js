import { createSlice } from '@reduxjs/toolkit';

const userSlicer = createSlice({
  name: 'user',
  initialState: {
    token: null,
    onboard: true,
    user: null,
    showwelcome: true,
    phoneNumber: null,
  },

  reducers: {
    setOnboard: (state, action) => {
      state.onboard = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPhone: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setUserAllergies: (state, action) => {
      let temp = state.user;
      // temp.allergies = action.payload.allergies;
      temp.user = action.payload;
      state.user = temp.user;
    },
    hidewelcome: state => {
      state.showwelcome = false;
    },
    showwelcome: state => {
      state.showwelcome = true;
    },
    logout: state => {
      state.token = null;
      state.user = null;
    },
  },
});

export const {
  setOnboard,
  setToken,
  setUser,
  setUserAllergies,
  hidewelcome,
  showwelcome,
  logout,
  setPhone,
} = userSlicer.actions;

export default userSlicer.reducer;

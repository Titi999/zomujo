import { createSlice } from '@reduxjs/toolkit';

interface HospitalState {
  isLoading: boolean;
}

export const initialState: HospitalState = {
  isLoading: false,
};

export const hospitalSlice = createSlice({
  name: 'hospital',
  initialState,
  reducers: {},
});

export default hospitalSlice.reducer;

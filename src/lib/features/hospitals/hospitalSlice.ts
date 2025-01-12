import { createSlice } from '@reduxjs/toolkit';
import { getHospitals } from '@/lib/features/hospitals/hospitalThunk';

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
  extraReducers: (builder) => {
    builder
      .addCase(getHospitals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHospitals.fulfilled || getHospitals.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default hospitalSlice.reducer;

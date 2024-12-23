import { createSlice } from '@reduxjs/toolkit';
import { doctorOnboarding, login } from '@/lib/features/auth/authThunk';
import { IDoctorIdentification, IPersonalDetails } from '@/types/auth.interface';

interface AuthenticationState {
  errorMessage: string;
  isLoading: boolean;
  currentStep: number;
  doctorPersonalDetails: IPersonalDetails | undefined;
  doctorIdentification: IDoctorIdentification | undefined;
}

const initialState: AuthenticationState = {
  errorMessage: '',
  isLoading: false,
  currentStep: 1,
  doctorPersonalDetails: undefined,
  doctorIdentification: undefined,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    },
    updatePersonalDetails: (state, { payload }) => {
      state.doctorPersonalDetails = payload;
      state.currentStep = 2;
    },
    updateDoctorIdentification: (state, { payload }) => {
      state.doctorIdentification = payload;
      state.currentStep = 3;
    },
    updateCurrentStep: (state, { payload }) => {
      state.currentStep = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled || login.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(doctorOnboarding.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(doctorOnboarding.fulfilled || login.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  setErrorMessage,
  updatePersonalDetails,
  updateDoctorIdentification,
  updateCurrentStep,
} = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import {
  doctorOnboarding,
  forgotPassword,
  login,
  requestOrganization,
  resetPassword,
  signUp,
} from '@/lib/features/auth/authThunk';
import { IDoctorIdentification, IPersonalDetails, IUser } from '@/types/auth.interface';

export interface AuthenticationState {
  errorMessage: string;
  isLoading: boolean;
  currentStep: number;
  doctorPersonalDetails: IPersonalDetails | undefined;
  doctorIdentification: IDoctorIdentification | undefined;
  user: IUser | undefined;
  extra: unknown;
  successMessage: string;
}

const initialState: AuthenticationState = {
  errorMessage: '',
  isLoading: false,
  currentStep: 1,
  doctorPersonalDetails: undefined,
  doctorIdentification: undefined,
  user: undefined,
  extra: undefined,
  successMessage: '',
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
    setUserInfo: (state, { payload }) => {
      state.user = payload.user;
      state.extra = payload.extra;
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
      .addCase(doctorOnboarding.fulfilled || doctorOnboarding.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled || signUp.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(requestOrganization.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestOrganization.fulfilled || requestOrganization.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled || forgotPassword.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled || resetPassword.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  setErrorMessage,
  updatePersonalDetails,
  updateDoctorIdentification,
  updateCurrentStep,
  setUserInfo,
} = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import {
  doctorOnboarding,
  forgotPassword,
  login,
  requestOrganization,
  resetPassword,
  signUp,
  verifyEmail,
} from '@/lib/features/auth/authThunk';
import { IDoctorIdentification, IPersonalDetails, IUser } from '@/types/auth.interface';
import { IDoctor } from '@/types/doctor.interface';

interface AuthenticationState {
  errorMessage: string;
  isLoading: boolean;
  currentStep: number;
  doctorPersonalDetails: IPersonalDetails | undefined;
  doctorIdentification: IDoctorIdentification | undefined;
  user: IUser | undefined;
  extra: IDoctor | undefined; // TODO: we will create union when other roles are ready
}

const initialState: AuthenticationState = {
  errorMessage: '',
  isLoading: false,
  currentStep: 1,
  doctorPersonalDetails: undefined,
  doctorIdentification: undefined,
  user: undefined,
  extra: undefined,
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
    updateExtra: (state, { payload }) => {
      state.extra = payload;
    },
    updateStatus: (state, { payload }) => {
      state.user!.status = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.errorMessage = '';
        state.isLoading = true;
      })
      .addCase(login.fulfilled || login.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(doctorOnboarding.pending, (state) => {
        state.errorMessage = '';
        state.isLoading = true;
      })
      .addCase(doctorOnboarding.fulfilled || doctorOnboarding.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(signUp.pending, (state) => {
        state.errorMessage = '';
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled || signUp.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(requestOrganization.pending, (state) => {
        state.errorMessage = '';
        state.isLoading = true;
      })
      .addCase(requestOrganization.fulfilled || requestOrganization.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.errorMessage = '';
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled || forgotPassword.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(resetPassword.pending, (state) => {
        state.errorMessage = '';
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled || resetPassword.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.errorMessage = '';
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled || resetPassword.rejected, (state) => {
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
  updateExtra,
  updateStatus,
} = authSlice.actions;
export default authSlice.reducer;

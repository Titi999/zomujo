import { createSlice } from '@reduxjs/toolkit';
import { login } from '@/lib/features/auth/authThunk';

interface AuthenticationState {
  errorMessage: string;
  isLoading: boolean;
  currentStep: number;
}

const initialState: AuthenticationState = {
  errorMessage: '',
  isLoading: false,
  currentStep: 1,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
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
  },
});

export const { setErrorMessage, updateCurrentStep } = authSlice.actions;
export default authSlice.reducer;

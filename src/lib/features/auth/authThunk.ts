import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILogin } from '@/app/(auth)/_components/loginForm';
import axios, { axiosErrorHandler } from '@/lib/axios';
import { setErrorMessage } from '@/lib/features/auth/authSlice';

export const login = createAsyncThunk(
  'authentication/login',
  async (loginCredentials: ILogin, { dispatch }) => {
    try {
      const { data } = await axios.post('auth/login', loginCredentials);
      console.log('Data', data); // TODO: Backend needs to adjust before we can handle this
      return true;
    } catch (error) {
      dispatch(setErrorMessage(axiosErrorHandler(error)));
    }
  },
);

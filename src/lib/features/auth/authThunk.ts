import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILogin } from '@/app/(auth)/_components/loginForm';
import axios, { axiosErrorHandler } from '@/lib/axios';
import { setErrorMessage, setUserInfo } from '@/lib/features/auth/authSlice';
import { IDoctorPhotoUpload, IUser } from '@/types/auth.interface';
import { IResponse } from '@/types/shared.interface';

export const login = createAsyncThunk(
  'authentication/login',
  async (loginCredentials: ILogin, { dispatch }) => {
    try {
      const { data } = await axios.post<IResponse<IUser>>('auth/login', loginCredentials);
      dispatch(setUserInfo(data.data));
      return true;
    } catch (error) {
      dispatch(setErrorMessage(axiosErrorHandler(error)));
      return false;
    }
  },
);

export const doctorOnboarding = createAsyncThunk(
  'authentication/doctorOnboarding',
  async (doctorPhotoUpload: IDoctorPhotoUpload, { dispatch, getState }) => {
    const state = getState();
    console.log('Current State:', state); // will add info from other stages
    try {
      const { data } = await axios.post('', doctorPhotoUpload);
      console.log('Data', data); // TODO: Backend needs to adjust before we can handle this
      return true;
    } catch (error) {
      dispatch(setErrorMessage(axiosErrorHandler(error)));
      return false;
    }
  },
);

import axios, { axiosErrorHandler } from '@/lib/axios';
import { IResponse } from '@/types/shared.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllDoctors = createAsyncThunk('doctors/allDoctors', async () => {
  try {
    const { data } = await axios.post<IResponse>(``);
    return data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
});

import axios, { axiosErrorHandler } from '@/lib/axios';
import { IDoctor } from '@/types/doctor.interface';
import { IPagination, IQueryParams, IResponse } from '@/types/shared.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllDoctors = createAsyncThunk(
  'doctors/allDoctors',
  async (queryParams: IQueryParams) => {
    try {
      const orderBy = `${queryParams.orderBy}:${queryParams.orderDirection};`;
      const { data } = await axios.get<IResponse<IPagination<IDoctor>>>(
        `doctors?orderBy=${orderBy}&page=${queryParams.page}&search=${queryParams.search}`,
      );
      return data.data;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  },
);

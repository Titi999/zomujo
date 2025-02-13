import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { axiosErrorHandler } from '@/lib/axios';
import { IPagination, IQueryParams, IResponse } from '@/types/shared.interface';
import { IHospital, INearByQueryParams } from '@/types/hospital.interface';
import { AcceptDeclineStatus } from '@/types/shared.enum';
import { Toast } from '@/hooks/use-toast';

export const getHospitals = createAsyncThunk(
  'hospitals/getHospitals',
  async ({ page, search, status, pageSize }: IQueryParams<AcceptDeclineStatus | ''>) => {
    // Endpoint does not accept empty status
    const query = status ? `&status=${status}` : '';
    try {
      const { data } = await axios.get<IResponse<IPagination<IHospital>>>(
        `common/orgs?page=${page}&search=${search}&pageSize=${pageSize}${query}`,
      );
      return data.data;
    } catch (error) {
      return axiosErrorHandler(error, true) as Toast;
    }
  },
);

export const getNearByHospitals = createAsyncThunk(
  'hospitals/getHospitals',
  async ({ long, lat, radius }: INearByQueryParams) => {
    try {
      const { data } = await axios.get<IResponse<IHospital>>(
        `common/nearby-orgs?lat=${lat}&long=${long}&radius=${radius}`,
      );
      return data.data;
    } catch (error) {
      return axiosErrorHandler(error, true) as Toast;
    }
  },
);

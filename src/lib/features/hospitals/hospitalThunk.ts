import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/lib/axios';
import { IPagination, IResponse } from '@/types/shared.interface';
import { IHospital } from '@/types/hospital.interface';
import { Status } from '@/types/shared.enum';

export const getHospitals = createAsyncThunk(
  'hospitals/getHospitals',
  async (status: Status | undefined) => {
    const query = status ? `?status=${status}` : '';
    try {
      const { data } = await axios.post<IResponse<IPagination<IHospital>>>(
        `common/hospitals?${query}`,
      );
      return data.data;
    } catch {
      return false;
    }
  },
);

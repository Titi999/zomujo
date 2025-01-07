import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/lib/axios';
import { IPagination, IResponse } from '@/types/shared.interface';
import { IHospital } from '@/types/hospital.interface';
import { Status } from '@/types/shared.enum';

export const getHospitals = createAsyncThunk(
  'hospitals/getHospitals',
  async (status: Status | undefined) => {
    // Endpoint does not accept empty status
    const query = status ? `?status=${status}` : '';
    try {
      const { data } = await axios.get<IResponse<IPagination<IHospital>>>(
        `common/hospitals${query}`,
      );
      return data.data;
    } catch {
      return false;
    }
  },
);

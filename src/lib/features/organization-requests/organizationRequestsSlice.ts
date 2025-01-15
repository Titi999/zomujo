import { createSlice } from '@reduxjs/toolkit';
import { getOrganizationRequests } from '@/lib/features/organization-requests/organizationRequestsThunk';

interface OrganizationRequestsState {
  isLoading: boolean;
}

export const initialState: OrganizationRequestsState = {
  isLoading: false,
};

export const organizationRequestsSlice = createSlice({
  name: 'organizationRequests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrganizationRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrganizationRequests.fulfilled || getOrganizationRequests.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default organizationRequestsSlice.reducer;

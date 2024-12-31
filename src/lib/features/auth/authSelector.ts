import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

const selectAuthentication = (state: RootState) => state.authentication;

export const selectUserRole = createSelector(
  selectAuthentication,
  ({ user }) => user?.role || null,
);

export const selectErrorMessage = createSelector(
  selectAuthentication,
  ({ errorMessage }) => errorMessage || '',
);

export const selectIsLoading = createSelector(selectAuthentication, ({ isLoading }) => isLoading);

export const selectUserName = createSelector(
  selectAuthentication,
  ({ user }) => `${user?.firstName} ${user?.lastName}`,
);

export const selectUser = createSelector(selectAuthentication, ({ user }) => user);

export const selectThunkState = createSelector(
  selectIsLoading,
  selectErrorMessage,
  (isLoading, errorMessage) => ({ isLoading, errorMessage }),
);

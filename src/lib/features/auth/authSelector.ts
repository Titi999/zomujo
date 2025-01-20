import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import { Role } from '@/types/shared.enum';

const selectAuthentication = (state: RootState) => state.authentication;

export const selectUserRole = createSelector(selectAuthentication, ({ user }) => user?.role);

export const selectIsAdmin = createSelector(
  selectUserRole,
  (role) => role === Role.Admin || role === Role.SuperAdmin,
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

export const selectUserFirstName = createSelector(
  selectAuthentication,
  ({ user }) => user?.firstName,
);

export const selectUser = createSelector(selectAuthentication, ({ user }) => user);

export const selectThunkState = createSelector(
  selectIsLoading,
  selectErrorMessage,
  (isLoading, errorMessage) => ({ isLoading, errorMessage }),
);

export const selectExtra = createSelector(selectAuthentication, ({ extra }) => extra);
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/lib/features/auth/authSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      authentication: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['authentication/updateDoctorIdentification'],
          ignoredPaths: [
            'authentication.doctorIdentification.front',
            'authentication.doctorIdentification.back',
          ],
        },
      }),
  });

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

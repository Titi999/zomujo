'use client';

import { selectUser } from '@/lib/features/auth/authSelector';
import { setErrorMessage } from '@/lib/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { JSX, FC, useEffect } from 'react';

function authenticationProvider(Component: FC) {
  return function AuthenticationProvider(props: JSX.IntrinsicAttributes): JSX.Element {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const router = useRouter();
    useEffect(() => {
      dispatch(setErrorMessage(''));

      if (user) {
        router.push('/dashboard');
      }
    }, [user]);
    return <Component {...props} />;
  };
}

export { authenticationProvider };

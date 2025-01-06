'use client';

import { selectUser } from '@/lib/features/auth/authSelector';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { JSX, useEffect, FC } from 'react';
import { Role } from '@/types/shared.enum';

function dashboardProvider(Component: FC) {
  return function DashboardProvider(props: JSX.IntrinsicAttributes) {
    const user = useAppSelector(selectUser);
    const router = useRouter();
    useEffect(() => {
      if (!user) {
        router.push('/login');
      }
      if (user?.role === Role.Doctor && !user?.extra) {
        router.push('/onboarding');
      }
    }, [user]);
    return <Component {...props} />;
  };
}

export { dashboardProvider };

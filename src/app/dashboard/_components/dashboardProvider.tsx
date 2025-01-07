'use client';

import { selectExtra, selectUser } from '@/lib/features/auth/authSelector';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { JSX, useEffect, FC } from 'react';
import { Role } from '@/types/shared.enum';

function dashboardProvider(Component: FC) {
  return function DashboardProvider(props: JSX.IntrinsicAttributes) {
    const user = useAppSelector(selectUser);
    const extra = useAppSelector(selectExtra);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/login');
      }
      if (user?.role === Role.Doctor && !extra) {
        router.push('/onboarding');
      }
    }, [user, extra]);
    return <Component {...props} />;
  };
}

export { dashboardProvider };

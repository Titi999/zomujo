'use client';

import { selectExtra, selectUser } from '@/lib/features/auth/authSelector';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { Role } from '@/types/shared.enum';

export function DashboardProvider({ children }: { children: ReactNode }) {
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

  return <>{children}</>;
}

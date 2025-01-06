'use client';

import { dashboardProvider } from '@/app/dashboard/_components/dashboardProvider';
import { useAppSelector } from '@/lib/hooks';
import { selectUserRole } from '@/lib/features/auth/authSelector';
import { Role } from '@/types/shared.enum';
import PatientHome from '@/app/dashboard/_components/patientHome/home';
import { JSX } from 'react';
import DoctorHome from '@/app/dashboard/_components/doctorHome/home';

const Dashboard = () => {
  const role = useAppSelector(selectUserRole);

  const home: Record<Role, JSX.Element> = {
    [Role.Doctor]: <DoctorHome />,
    [Role.Patient]: <PatientHome />,
    [Role.Admin]: <div>Admin</div>,
    [Role.SuperAdmin]: <div>Super Admin</div>,
  };

  return <>{home[role!]}</>;
};

export default dashboardProvider(Dashboard);

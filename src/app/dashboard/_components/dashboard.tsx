'use client';

import { useAppSelector } from '@/lib/hooks';
import { selectUserRole } from '@/lib/features/auth/authSelector';
import { Role } from '@/types/shared.enum';
import PatientHome from '@/app/dashboard/_components/patientHome/home';
import { JSX } from 'react';
import DoctorHome from '@/app/dashboard/_components/doctorHome/home';
import AdminHome from '@/app/dashboard/_components/adminHome/home';

const Dashboard = (): JSX.Element => {
  const role = useAppSelector(selectUserRole);

  const home: Record<Role, JSX.Element> = {
    [Role.Doctor]: <DoctorHome />,
    [Role.Patient]: <PatientHome />,
    [Role.Admin]: <AdminHome />,
    [Role.SuperAdmin]: <AdminHome />,
  };

  return <>{home[role!]}</>;
};

export default Dashboard;

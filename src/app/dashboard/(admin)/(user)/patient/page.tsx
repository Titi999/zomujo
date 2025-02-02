import React, { JSX } from 'react';
import PatientStats from '@/app/dashboard/(admin)/(user)/_components/patientStats';
import PatientPanel from '@/app/dashboard/(admin)/(user)/_components/patientPanel';

const Patient = (): JSX.Element => (
  <>
    <PatientStats />
    <PatientPanel />
  </>
);

export default Patient;

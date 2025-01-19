import React, { JSX } from 'react';
import DoctorPanel from '../_components/doctorPanel';
import DoctorStats from '../_components/doctorStats';

const Doctor = (): JSX.Element => (
  <>
    <DoctorStats />
    <DoctorPanel />
  </>
);

export default Doctor;

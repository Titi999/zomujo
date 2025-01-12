import React from 'react';
import DoctorPanel from '../_components/doctorPanel';
import DoctorStats from '../_components/doctorStats';

const Doctor = () => (
  <div className="mx-6">
    <DoctorStats />
    <section>
      <DoctorPanel />
    </section>
  </div>
);

export default Doctor;

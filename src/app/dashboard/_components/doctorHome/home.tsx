import React from 'react';
import AppointmentPanel from '../appointment/appointmentPanel';
import AppointmentRequestPanel from '../appointment/appointmentRequestPanel';
import ManagedClientsPanel from '../appointment/managedClientsPanel';

const DoctorHomepage = () => (
  <div className="mx-6">
    <div> Doctors name and the navbar so lets check this and see how it works </div>
    <div className="flex w-full flex-row gap-4">
      <AppointmentPanel />
      <AppointmentRequestPanel />
    </div>
    <ManagedClientsPanel />
  </div>
);

export default DoctorHomepage;

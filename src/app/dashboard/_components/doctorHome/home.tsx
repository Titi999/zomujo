import React from 'react';
import AppointmentPanel from '../appointment/appointmentPanel';
import AppointmentRequestPanel from '../appointment/appointmentRequestPanel';
import ManagedClientsPanel from '../appointment/managedClientsPanel';
import { AvatarGreetings } from '../avatarGreetings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DoctorHome = () => (
  <div className="mx-4 sm:mx-0">
    <AvatarGreetings />
    <div className="flex w-full items-center justify-center md:hidden">
      <Tabs defaultValue="appointment" className="w-full text-center text-sm md:hidden">
        <TabsList>
          <TabsTrigger value="appointment">Appointment</TabsTrigger>
          <TabsTrigger value="upcomingAppointments">Appointment Request</TabsTrigger>
        </TabsList>
        <TabsContent className="mt-6" value="appointment">
          <AppointmentPanel />
        </TabsContent>
        <TabsContent className="mt-6" value="upcomingAppointments">
          <AppointmentRequestPanel />
        </TabsContent>
      </Tabs>
    </div>
    <div className="hidden w-full flex-row gap-4 md:flex">
      <AppointmentPanel />
      <AppointmentRequestPanel />
    </div>
    <ManagedClientsPanel />
  </div>
);

export default DoctorHome;

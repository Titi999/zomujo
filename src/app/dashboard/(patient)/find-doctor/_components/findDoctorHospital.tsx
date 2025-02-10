'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { JSX, useState } from 'react';
import Doctors from './doctors';

enum DoctorHospital {
  Doctors = 'doctors',
  Hospital = 'hospital',
}
const FindDoctorHospital = (): JSX.Element => {
  const [selectDoctorHospital, setSelectedDoctorHospital] = useState<DoctorHospital>(
    DoctorHospital.Doctors,
  );

  return (
    <div>
      <section>
        <p className="text-[32px] font-bold">
          {selectDoctorHospital === DoctorHospital.Doctors ? 'Find Doctors' : 'Find Hospitals'}
        </p>
      </section>

      <section className="mt-4">
        <Tabs defaultValue="doctor" className="">
          <TabsList>
            <TabsTrigger
              value="doctor"
              className="rounded-2xl"
              onClick={() => setSelectedDoctorHospital(DoctorHospital.Doctors)}
            >
              Doctors
            </TabsTrigger>
            <TabsTrigger
              value="wallet"
              className="rounded-2xl"
              onClick={() => setSelectedDoctorHospital(DoctorHospital.Hospital)}
            >
              Hospital
            </TabsTrigger>
          </TabsList>

          <TabsContent className="mt-2" value="doctor">
            <Doctors />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default FindDoctorHospital;

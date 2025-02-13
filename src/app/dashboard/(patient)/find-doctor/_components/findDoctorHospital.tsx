'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { JSX, useEffect, useState } from 'react';
import Doctors from './doctors';
import Hospitals from '@/app/dashboard/(patient)/find-doctor/_components/hospitals';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

enum DoctorHospital {
  Doctors = 'doctors',
  Hospital = 'hospital',
}
const FindDoctorHospital = (): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParam = useSearchParams();
  const [selectDoctorHospital, setSelectedDoctorHospital] = useState<DoctorHospital>();

  useEffect(() => {
    setSelectedDoctorHospital(
      searchParam.get('tab') === DoctorHospital.Hospital
        ? DoctorHospital.Hospital
        : DoctorHospital.Doctors,
    );
  }, []);

  const handleTabChange = (tab: DoctorHospital): void => {
    setSelectedDoctorHospital(tab);
    const updatedSearchParams = new URLSearchParams(searchParam.toString());
    updatedSearchParams.set('tab', tab);
    router.push(`${pathname}?${updatedSearchParams.toString()}`);
  };

  return (
    <div>
      <section>
        <p className="text-[32px] font-bold">
          {selectDoctorHospital === DoctorHospital.Doctors ? 'Find Doctors' : 'Find Hospitals'}
        </p>
      </section>

      <section className="mt-4">
        <Tabs value={selectDoctorHospital}>
          <TabsList>
            <TabsTrigger
              value={DoctorHospital.Doctors}
              className="rounded-2xl"
              onClick={() => handleTabChange(DoctorHospital.Doctors)}
            >
              Doctors
            </TabsTrigger>
            <TabsTrigger
              value={DoctorHospital.Hospital}
              className="rounded-2xl"
              onClick={() => handleTabChange(DoctorHospital.Hospital)}
            >
              Hospital
            </TabsTrigger>
          </TabsList>

          <TabsContent
            hidden={selectDoctorHospital !== DoctorHospital.Doctors}
            forceMount={true}
            className="mt-2"
            value={DoctorHospital.Doctors}
          >
            <Doctors />
          </TabsContent>
          <TabsContent
            hidden={selectDoctorHospital !== DoctorHospital.Hospital}
            forceMount={true}
            className="mt-2"
            value={DoctorHospital.Hospital}
          >
            <Hospitals />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default FindDoctorHospital;

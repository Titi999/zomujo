import { StatsCard, StatsCardProps } from '@/app/dashboard/_components/statsCard';
import { Button } from '@/components/ui/button';
import { FileUp } from 'lucide-react';
import React from 'react';
import DoctorPanel from '../_components/doctorPanel';

const Doctor = () => {
  const mockStatsData: StatsCardProps[] = [
    { title: 'Total Doctors', value: '560', percentage: '4.4', trend: 'up' },
    { title: 'Active doctors', value: '60', percentage: '2', trend: 'down' },
    { title: 'Pending Doctors', value: '500', percentage: '4.4', trend: 'up' },
  ];
  return (
    <div className="mx-6">
      <section className="flex items-center justify-between">
        <p className="text-[20px] font-bold sm:text-[32px]"> Registered Doctor</p>
        <Button
          child={
            <>
              <FileUp /> <p>Export</p>
            </>
          }
          variant={'ghost'}
          className="border bg-white"
        />
      </section>
      <div className="mt-8 flex flex-wrap justify-evenly gap-6">
        {mockStatsData.map((data, index) => (
          <StatsCard key={index} {...data} />
        ))}
      </div>
      <section>
        <DoctorPanel />
      </section>
    </div>
  );
};

export default Doctor;

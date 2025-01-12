'use client';
import { StatsCard, StatsCardProps } from '@/app/dashboard/_components/statsCard';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { countAllDoctors } from '@/lib/features/doctors/doctorsThunk';
import { useAppDispatch } from '@/lib/hooks';
import { showErrorToast } from '@/lib/utils';
import { BaseCountResponse } from '@/types/shared.interface';
import { FileUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export interface IDoctorCountResponse extends BaseCountResponse{
  pending: number;
  active: number;
  activeInc: number;
  pendingInc: number;
}
const DoctorStats = () => {
  const dispatch = useAppDispatch();
  const [StatsData, setStatsData] = useState<StatsCardProps[]>([]);

  useEffect(() => {
    const fetchDoctorCount = async () => {
        const { payload } = await dispatch(countAllDoctors());
        if (showErrorToast(payload)) {
                toast(payload)
        return    
        }

      if (payload) {
        const { all, active, activeInc, allInc, pending, pendingInc } =
          payload as IDoctorCountResponse;

        setStatsData([
          {
            title: 'Total Doctors',
            value: all,
            percentage: allInc,
            trend: allInc >= 0 ? 'up' : 'down',
          },
          {
            title: 'Active Doctors',
            value: active,
            percentage: activeInc,
            trend: activeInc >= 0 ? 'up' : 'down',
          },
          {
            title: 'Pending Doctors',
            value: pending,
            percentage: pendingInc,
            trend: pendingInc >= 0 ? 'up' : 'down',
          },
        ]);
      }
    };
    void fetchDoctorCount();
  }, []);

  return (
    <div>
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
        {StatsData.map((data, index) => (
          <StatsCard key={index} {...data} />
        ))}
      </div>
    </div>
  );
};

export default DoctorStats;

'use client';
import { StatsCards } from '@/app/dashboard/_components/statsCards';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { countAllDoctors } from '@/lib/features/doctors/doctorsThunk';
import { useAppDispatch } from '@/lib/hooks';
import { showErrorToast } from '@/lib/utils';
import { IDoctorCountResponse, IStatsCard } from '@/types/stats.interface';
import { FileUp } from 'lucide-react';
import React, { JSX, useEffect, useState } from 'react';

const DoctorStats = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [statsData, setStatsData] = useState<IStatsCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDoctorCount = async (): Promise<void> => {
      const { payload } = await dispatch(countAllDoctors());
      if (showErrorToast(payload)) {
        setIsLoading(false);
        toast(payload);
        return;
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
      setIsLoading(false);
    };
    setIsLoading(true);
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
        <StatsCards statsData={statsData} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default DoctorStats;

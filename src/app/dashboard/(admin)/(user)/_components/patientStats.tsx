'use client';
import { StatsCards } from '@/app/dashboard/_components/statsCards';
import { toast } from '@/hooks/use-toast';
import { useAppDispatch } from '@/lib/hooks';
import { showErrorToast } from '@/lib/utils';
import { IPatientCountResponse, IStatsCard } from '@/types/stats.interface';
import React, { JSX, useEffect, useState } from 'react';
import { patientsStats } from '@/lib/features/patients/patientsThunk';

const PatientStats = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [statsData, setStatsData] = useState<IStatsCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPatientCount = async (): Promise<void> => {
      const { payload } = await dispatch(patientsStats());
      if (payload && showErrorToast(payload)) {
        setIsLoading(false);
        toast(payload);
        return;
      }

      if (payload) {
        const { all, active, activeInc, allInc, deactivatedInc, deactivated } =
          payload as IPatientCountResponse;

        setStatsData([
          {
            title: 'Total Patients',
            value: all,
            percentage: allInc,
            trend: allInc >= 0 ? 'up' : 'down',
          },
          {
            title: 'Active Patients',
            value: active,
            percentage: activeInc,
            trend: activeInc >= 0 ? 'up' : 'down',
          },
          {
            title: 'Deactivated Patients',
            value: deactivated,
            percentage: deactivatedInc,
            trend: deactivatedInc >= 0 ? 'up' : 'down',
          },
        ]);
      }
      setIsLoading(false);
    };
    setIsLoading(true);
    void fetchPatientCount();
  }, []);

  return (
    <div>
      <section className="flex items-center justify-between">
        <p className="text-[20px] font-bold sm:text-[32px]">Patients</p>
      </section>
      <div className="mt-8 flex flex-wrap justify-evenly gap-6">
        <StatsCards statsData={statsData} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default PatientStats;

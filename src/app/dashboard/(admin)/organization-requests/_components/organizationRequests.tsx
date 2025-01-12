'use client';
import { StatsCard, StatsCardProps } from '@/app/dashboard/_components/statsCard';
import { ColumnDef } from '@tanstack/react-table';
import { IHospital } from '@/types/hospital.interface';
import { TableData } from '@/components/ui/table';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getHospitals } from '@/lib/features/hospitals/hospitalThunk';
import { Ellipsis, Signature, Ban } from 'lucide-react';
import { Status } from '@/types/shared.enum';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IAction, IPagination } from '@/types/shared.interface';

const mockStatsData: StatsCardProps[] = [
  { title: 'Total requests', value: '560', percentage: '4.4', trend: 'up' },
  { title: 'Approved requests', value: '60', percentage: '2', trend: 'down' },
  { title: 'Rejected requests', value: '500', percentage: '3.1', trend: 'up' },
];

const OrganizationRequests = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(({ hospital }) => hospital.isLoading);
  const [hospitals, setHospitals] = useState<IHospital[]>([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      const { payload } = (await dispatch(getHospitals(Status.Pending))) as IAction<
        IPagination<IHospital> | false
      >;
      if (payload) {
        setHospitals(payload.rows);
      }
    };
    void fetchHospitals();
  }, []);

  return (
    <div className="pb-[80px]">
      <div className="flex flex-col">
        <span className="text-[32px] font-bold">Organization Requests</span>
      </div>
      <div className="mb-12 mt-10 flex flex-wrap justify-evenly gap-6">
        {mockStatsData.map((data, index) => (
          <StatsCard key={index} {...data} />
        ))}
      </div>
      <TableData isLoading={isLoading} columns={columns} data={hospitals} />
    </div>
  );
};

export default OrganizationRequests;

const columns: ColumnDef<IHospital>[] = [
  {
    accessorKey: 'name',
    header: 'Hospital Name',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      switch (row.getValue('status')) {
        case Status.Verified:
          return <Badge variant="default">Approved</Badge>;
        case Status.Unverified:
          return <Badge variant="destructive">Declined</Badge>;
        default:
          return <Badge variant="brown">Pending</Badge>;
      }
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    id: 'actions',
    header: 'Action',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="cursor-pointer text-sm text-gray-600" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem className="cursor-pointer">
            <Signature />
            <span>Approve</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Ban />
            <span>Decline</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

'use client';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenuContent,
  OptionsMenu,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { TableData } from '@/components/ui/table';
import { IDoctor } from '@/types/doctor.interface';
import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowDownAZ,
  CalendarX,
  ChevronsUpDown,
  Ellipsis,
  ListFilter,
  ShieldCheck,
  Signature,
} from 'lucide-react';
import React, { useState } from 'react';

export interface DoctorTableProps {
  id: string;
  name: string;
  status: 'Booked' | 'Available' | 'Deleted';
  consult: string;
  contact: string;
}


export interface IDoctorTableResponse{
  rows:IDoctor[]
}

const DoctorPanel = () => {
  const data: DoctorTableProps[] = [
    {
      id: '1112003',
      name: 'Killer bobo',
      status: 'Available',
      consult: 'July 23, 2023',
      contact: '0208889990',
    },
    {
      id: '1112003',
      name: 'Addo Deezy bobo',
      status: 'Available',
      consult: 'July 23, 2023',
      contact: '0208889990',
    },
    {
      id: '1112003',
      name: 'Baweezy',
      status: 'Booked',
      consult: 'July 23, 2023',
      contact: '0208889990',
    },
    {
      id: '1112003',
      name: 'Mahama',
      status: 'Deleted',
      consult: 'July 23, 2023',
      contact: '0208889990',
    },
  ];

  const [sort, setSort] = useState<string>();
  //Todo: To be replaced with the right options
  const options = [
    {
      value: 'asc',
      label: 'Ascending',
    },
    {
      value: 'desc',
      label: 'Descending',
    },
  ];

  const [filter, setFilter] = useState<string>();
  return (
    <div className="mt-4 rounded-lg bg-white">
      <div className="p-6">
        <div className="mb-4 flex flex-wrap justify-between">
          <div className="mb-2 flex gap-2">
            <Input error="" placeholder="Search Patient" className="max-w-[333px] sm:w-[333px]" />
            <OptionsMenu
              options={options}
              Icon={ListFilter}
              menuTrigger="Filter"
              selected={filter}
              setSelected={setFilter}
              className="border-transparent"
            />
          </div>
          <OptionsMenu
            options={options}
            Icon={ArrowDownAZ}
            menuTrigger="Sort By"
            selected={sort}
            setSelected={setSort}
            className="hidden h-10 bg-gray-50 sm:flex"
          />
        </div>
        <TableData columns={columns} data={data} />
      </div>
    </div>
  );
};

export default DoctorPanel;

const columns: ColumnDef<DoctorTableProps>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status: string = row.getValue('status');
      const variant = (status: string) => {
        switch (status) {
          case 'Available':
            return 'default';
          case 'Booked':
            return 'brown';
          default:
            return 'destructive';
        }
      };
      return (
        <div>
          <Badge variant={variant(status)}>{status}</Badge>
        </div>
      );
    },
  },

  {
    accessorKey: 'consult',
    header: ({ column }) => (
      <div
        className="flex cursor-pointer whitespace-nowrap"
        onClick={() => {
          //Todo: Api integration for sorting
          console.log(column);
        }}
      >
        Recent Consult <ChevronsUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
  },
  {
    accessorKey: 'contact',
    header: 'Contact',
  },
  {
    id: 'actions',
    header: 'Action',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex w-11 cursor-pointer items-center justify-center text-center text-sm text-black">
            <Ellipsis />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <ShieldCheck /> Activate 
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Signature /> Approve
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">
            <CalendarX /> Deactivate
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

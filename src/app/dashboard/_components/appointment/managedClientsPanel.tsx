'use client';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { OptionsMenu } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { TableData } from '@/components/ui/table';
import { Gender } from '@/types/shared.enum';
import { ManagedClientProps } from '@/types/table.types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowDownAZ, ChevronsUpDown, Eye, ListFilter } from 'lucide-react';
import React, { useState } from 'react';

const ManagedClientsPanel = () => {
  const data: ManagedClientProps[] = [
    {
      id: '728ed52f',
      patient: 'Akiti Nebu',
      gender: Gender.Male,
      clinic: '37 Military Hospital',
      consult: 'Jun 23, 2024',
    },
    {
      id: '728ed52f',
      patient: 'Opo lapo',
      gender: Gender.Female,
      clinic: '37 Military Hospital',
      consult: 'Jun 23, 2023',
    },
    {
      id: '728ed52f',
      patient: 'Ataa',
      gender: Gender.Male,
      clinic: 'UGMC',
      consult: 'Jun 25, 2025',
    },
    {
      id: '728ed52f',
      patient: 'Ataa',
      gender: Gender.Male,
      clinic: 'UGMC',
      consult: 'Jun 25, 2025',
    },
    {
      id: '728ed52f',
      patient: 'Ataa',
      gender: Gender.Male,
      clinic: 'UGMC',
      consult: 'Jun 25, 2025',
    },
  ];

  const [sort, setSort] = useState<string>();
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
  const filterOptions = [
    {
      value: 'asc',
      label: 'Ascending',
    },
    {
      value: 'desc',
      label: 'Descending',
    },
  ];
  return (
    <div className="mt-4 rounded-lg bg-white">
      <div className="p-6">
        <p className="py-6 text-xl font-bold">Managed clients</p>
        <div className="mb-6 flex justify-between">
          <div className="flex gap-2">
            <Input error="" placeholder="Search Patient" className="w-[333px]" />
            <OptionsMenu
              options={filterOptions}
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
            className="bg-gray-50"
          />
        </div>
        <TableData columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ManagedClientsPanel;

const columns: ColumnDef<ManagedClientProps>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="-mr-10"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'patient',
    header: ({ column }) => (
      <div
        className="flex cursor-pointer"
        onClick={() => {
          //Todo: Api integration for sorting
          console.log(column);
        }}
      >
        Patient Name <ChevronsUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ row }) => (
      <div>
        <Badge variant={row.getValue('gender') == 'male' ? 'brown' : 'blue'}>
          {row.getValue('gender')}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'clinic',
    header: 'Clinic/Unit',
  },
  {
    accessorKey: 'consult',
    header: ({ column }) => (
      <div
        className="flex cursor-pointer"
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
    id: 'actions',
    header: 'Action',
    cell: () => (
      <div className="flex gap-2 text-sm text-black">
        <Eye /> View
      </div>
    ),
  },
];

'use client';
import { AvatarComp } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/dialog';
import {
  DropdownMenuContent,
  OptionsMenu,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { PaginationData, TableData } from '@/components/ui/table';
import { getAllDoctors } from '@/lib/features/doctors/doctorsThunk';
import { useAppDispatch } from '@/lib/hooks';
import { IDoctor } from '@/types/doctor.interface';
import { Gender } from '@/types/shared.enum';
import { IPagination, IQueryParams } from '@/types/shared.interface';
import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowDownAZ,
  Binoculars,
  CalendarX,
  Ellipsis,
  ListFilter,
  Search,
  SendHorizontal,
  ShieldCheck,
  Signature,
} from 'lucide-react';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import DoctorDetails from './doctorDetails';

export interface DoctorTableProps {
  MCDRegistration: string;
  name: string;
  status: string;
  gender: Gender;
  contact: string;
  profilePicture: string;
}

const DoctorPanel = () => {
  const columns: ColumnDef<IDoctor>[] = [
    {
      accessorKey: 'MDCRegistration',
      header: 'MDC Registration',
    },
    {
      accessorKey: 'profilePicture',
    },
    {
      accessorKey: 'lastName',
    },
    {
      accessorKey: 'firstName',
      header: 'Name',
      cell: ({ row }) => {
        const image = String(row.getValue('profilePicture'));
        const name = `${row.getValue('firstName')} ${row.getValue('lastName')}`;
        return (
          <div className="flex items-center justify-start gap-2">
            <AvatarComp imageSrc={image} name={name} className="h-7 w-7" /> {name}
          </div>
        );
      },
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
      accessorKey: 'contact',
      header: 'Contact',
    },

    {
      accessorKey: 'gender',
      header: 'Gender',
      cell: ({ row }) => {
        const gender: string = row.getValue('gender');
        const variant = (gender: string) => {
          switch (gender) {
            case Gender.Male:
              return 'brown';
            case Gender.Female:
              return 'blue';
            default:
              return 'destructive';
          }
        };
        return (
          <div>
            <Badge variant={variant(gender)}>{gender}</Badge>
          </div>
        );
      },
    },

    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex w-11 cursor-pointer items-center justify-center text-center text-sm text-black">
              <Ellipsis />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleView(row.getValue('MDCRegistration'))}>
              <Binoculars /> View
            </DropdownMenuItem>
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
      enableHiding: false,
    },
  ];

  const sortOptions = [
    {
      value: 'asc',
      label: 'Ascending',
    },
    {
      value: 'desc',
      label: 'Descending',
    },
  ];

  const filterOptions = [
    {
      value: 'MDCRegistration',
      label: 'MDCRegistration',
    },
    {
      value: 'firstName',
      label: 'Name',
    },
    {
      value: 'consult',
      label: 'Recent Consult',
    },
  ];

  const dispatch = useAppDispatch();
  const [queryParameters, setQueryParameters] = useState<IQueryParams>({
    page: 1,
    orderDirection: 'desc',
    orderBy: 'firstName',
    search: '',
  });

  const [tableData, setTableData] = useState<IDoctor[] | []>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setQueryParameters((prev) => ({
        ...prev,
        page: 1,
        search: '',
      }));
    }
    setSearchTerm(event.target.value);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQueryParameters((prev) => ({
      ...prev,
      page: 1,
      search: searchTerm,
    }));
  };

  const [paginationData, setPaginationData] = useState<PaginationData | undefined>(undefined);
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor| undefined>();
  const [openModal, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(getAllDoctors(queryParameters));

      if ('payload' in result && typeof result.payload !== 'string') {
        const payload = result.payload as IPagination<IDoctor>;
        const tableData = payload.rows.map((doctorDetails) =>  ({
            ...doctorDetails,
            status: 'Available',
          })
        );
        setTableData(tableData);
        const { nextPage, page, pageSize, prevPage, total, totalPages } = payload;
        setPaginationData({ nextPage, page, pageSize, prevPage, total, totalPages });
      }
    };

    void fetchData();
  }, [queryParameters]);

  const handleView = (MCDRegistration: string) => {
    const doctor = tableData.find((doctor) => doctor.MDCRegistration === MCDRegistration);
    setModalOpen(true);
    if (doctor) {
      setSelectedDoctor(doctor);
    }
  };

  return (
    <>
      <div className="mt-4 rounded-lg bg-white">
        <div className="p-6">
          <div className="mb-4 flex flex-wrap justify-between">
            <div className="mb-2 flex gap-2">
              <form className="flex" onSubmit={handleSubmit}>
                <Input
                  error=""
                  placeholder="Search Patient"
                  className="max-w-[333px] sm:w-[333px]"
                  type="search"
                  leftIcon={<Search className="text-gray-500" size={20} />}
                  onChange={handleSearch}
                />
                {searchTerm && <Button child={<SendHorizontal />} className="ml-2" />}
              </form>
              <OptionsMenu
                options={filterOptions}
                Icon={ListFilter}
                menuTrigger="Filter"
                selected={queryParameters.orderBy}
                setSelected={(value: string) =>
                  setQueryParameters((prev) => ({
                    ...prev,
                    page: 1,
                    orderBy: value,
                  }))
                }
                className="h-10 bg-gray-50 sm:flex"
              />
            </div>
            <OptionsMenu
              options={sortOptions}
              Icon={ArrowDownAZ}
              menuTrigger="Sort By"
              selected={queryParameters.orderDirection}
              setSelected={(value: string) =>
                setQueryParameters((prev) => ({
                  ...prev,
                  page: 1,
                  orderDirection: value,
                }))
              }
              className="hidden h-10 bg-gray-50 sm:flex"
            />
          </div>
          <TableData
            columns={columns}
            data={tableData}
            columnVisibility={{ profilePicture: false, lastName: false }}
            page={queryParameters.page}
            userPaginationChange={(paginationState) =>
              setQueryParameters((prev) => ({
                ...prev,
                page: paginationState.pageIndex + 1,
              }))
            }
            paginationData={paginationData}
          />
        </div>
      </div>

      <Modal
        open={openModal}
        content={<DoctorDetails {...selectedDoctor!} />}
        className="max-h-[90vh] max-w-[80vw] overflow-y-scroll"
        setState={setModalOpen}
        showClose={true}
      />
    </>
  );
};

export default DoctorPanel;

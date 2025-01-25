'use client';
import { AvatarComp } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Confirmation, ConfirmationProps, Modal } from '@/components/ui/dialog';
import {
  DropdownMenuContent,
  OptionsMenu,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { PaginationData, TableData } from '@/components/ui/table';
import {
  approveDoctorRequest,
  declineDoctor,
  getAllDoctors,
} from '@/lib/features/doctors/doctorsThunk';
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
  MessageSquareX,
  Search,
  SendHorizontal,
  ShieldCheck,
  Signature,
} from 'lucide-react';
import React, { FormEvent, JSX, useEffect, useState } from 'react';
import DoctorDetails from '../../../_components/doctorDetails';
import { toast } from '@/hooks/use-toast';
import { showErrorToast } from '@/lib/utils';
import { useSearch } from '@/hooks/useSearch';

const DoctorPanel = (): JSX.Element => {
  const [paginationData, setPaginationData] = useState<PaginationData | undefined>(undefined);
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | undefined>();
  const [openModal, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isConfirmationLoading, setIsConfirmationLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [tableData, setTableData] = useState<IDoctor[]>([]);
  const [queryParameters, setQueryParameters] = useState<IQueryParams>({
    page: 1,
    orderDirection: 'desc',
    orderBy: 'createdAt',
    search: '',
  });
  const [confirmation, setConfirmation] = useState<ConfirmationProps>({
    acceptCommand: () => {},
    rejectCommand: () => {},
    description: '',
    open: false,
  });
  const { searchTerm, handleSearch } = useSearch(handleSubmit);
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
      value: 'createdAt',
      label: 'Recent',
    },
  ];
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
      accessorKey: 'id',
    },
    {
      accessorKey: 'firstName',
      header: 'Name',
      cell: ({ row }): JSX.Element => {
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
      cell: ({ row }): JSX.Element => {
        const status: string = row.getValue('status');
        const variant = (status: string): 'default' | 'brown' | 'destructive' => {
          switch (status) {
            case 'Approved':
              return 'default';
            case 'Declined':
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
      cell: ({ row }): JSX.Element => {
        const gender: string = row.getValue('gender');
        const genderProperties = (
          gender: string,
        ): { title: string; variant: 'brown' | 'blue' | 'destructive' } => {
          switch (gender) {
            case Gender.Male:
              return { title: 'Male', variant: 'brown' };
            case Gender.Female:
              return { title: 'Female', variant: 'blue' };
            default:
              return { title: 'Other', variant: 'destructive' };
          }
        };

        const { title, variant } = genderProperties(gender);
        return (
          <div>
            <Badge variant={variant}>{title}</Badge>
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
            <DropdownMenuItem
              onClick={() =>
                setConfirmation((prev) => ({
                  ...prev,
                  open: true,
                  acceptCommand: () => handleDropdownAction('activate', String(row.getValue('id'))),
                  acceptTitle: 'Activate',
                  declineTitle: 'Cancel',
                  rejectCommand: () =>
                    setConfirmation((prev) => ({
                      ...prev,
                      open: false,
                    })),
                  description: `Are you sure you want to activate ${row.getValue('firstName')}'s account?`,
                }))
              }
            >
              <ShieldCheck /> Activate
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                setConfirmation((prev) => ({
                  ...prev,
                  open: true,
                  acceptCommand: () => handleDropdownAction('approve', String(row.getValue('id'))),
                  acceptTitle: 'Approve',
                  declineTitle: 'Cancel',
                  rejectCommand: () =>
                    setConfirmation((prev) => ({
                      ...prev,
                      open: false,
                    })),
                  description: `Are you sure you want to approve ${row.getValue('firstName')}'s account?`,
                }))
              }
            >
              <Signature /> Approve
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                setConfirmation((prev) => ({
                  ...prev,
                  open: true,
                  acceptCommand: () => handleDropdownAction('decline', String(row.getValue('id'))),
                  acceptTitle: 'Decline',
                  declineTitle: 'Cancel',
                  rejectCommand: () =>
                    setConfirmation((prev) => ({
                      ...prev,
                      open: false,
                    })),
                  description: `Are you sure you want to decline ${row.getValue('firstName')}'s request?`,
                }))
              }
            >
              <MessageSquareX /> Decline
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() =>
                setConfirmation((prev) => ({
                  ...prev,
                  open: true,
                  acceptCommand: () =>
                    handleDropdownAction('deactivate', String(row.getValue('id'))),
                  acceptTitle: 'Deactivate',
                  declineTitle: 'Cancel',
                  rejectCommand: () =>
                    setConfirmation((prev) => ({
                      ...prev,
                      open: false,
                    })),
                  description: `Are you sure you want to deactivate ${row.getValue('firstName')}'s account?`,
                }))
              }
            >
              <CalendarX /> Deactivate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableHiding: false,
    },
  ];

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      const { payload } = await dispatch(getAllDoctors(queryParameters));
      if (payload && showErrorToast(payload)) {
        toast(payload);
        setLoading(false);
        return;
      }

      const { rows, ...pagination } = payload as IPagination<IDoctor>;
      // Todo: Status of the doctors are all approved; should be changed to their respective statuses once it is available from the backend
      const tableData = rows.map((doctorDetails) => ({
        ...doctorDetails,
        status: 'Approved',
      }));

      setTableData(tableData);
      setPaginationData(pagination);
      setLoading(false);
    };

    void fetchData();
  }, [queryParameters]);

  function handleView(MCDRegistration: string): void {
    const doctor = tableData.find((doctor) => doctor.MDCRegistration === MCDRegistration);
    if (doctor) {
      setSelectedDoctor(doctor);
      setModalOpen(true);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>, search?: string): void {
    event.preventDefault();
    setQueryParameters((prev) => ({
      ...prev,
      page: 1,
      search: search ?? searchTerm,
    }));
  }

  async function handleDropdownAction(
    action: 'activate' | 'approve' | 'deactivate' | 'decline',
    id: string,
  ): Promise<void> {
    setIsConfirmationLoading(true);
    switch (action) {
      case 'approve':
        {
          const { payload } = await dispatch(approveDoctorRequest(id));
          if (payload) {
            toast(payload);
          }
        }
        break;
      case 'decline':
        {
          const { payload } = await dispatch(declineDoctor(id));
          if (payload) {
            toast(payload);
          }
        }
        break;
    }

    setIsConfirmationLoading(false);
  }

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
            columnVisibility={{ profilePicture: false, lastName: false, id: false }}
            page={queryParameters.page}
            userPaginationChange={({ pageIndex }) =>
              setQueryParameters((prev) => ({
                ...prev,
                page: pageIndex + 1,
              }))
            }
            paginationData={paginationData}
            isLoading={isLoading}
          />
        </div>
      </div>

      <Modal
        open={openModal}
        content={<DoctorDetails {...selectedDoctor!} />}
        className="max-h-screen max-w-screen overflow-y-scroll md:max-h-[90vh] md:max-w-[80vw]"
        setState={setModalOpen}
        showClose={true}
      />

      <Confirmation
        {...confirmation}
        showClose={true}
        setState={() =>
          setConfirmation((prev) => ({
            ...prev,
            open: false,
          }))
        }
        isLoading={isConfirmationLoading}
      />
    </>
  );
};

export default DoctorPanel;

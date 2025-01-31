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
  ISelected,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { PaginationData, TableData } from '@/components/ui/table';
import {
  approveDoctorRequest,
  declineDoctor,
  getAllDoctors,
  inviteDoctors,
} from '@/lib/features/doctors/doctorsThunk';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { IDoctor, IInviteDoctor } from '@/types/doctor.interface';
import { AcceptDeclineStatus, Gender } from '@/types/shared.enum';
import { IPagination, IQueryParams } from '@/types/shared.interface';
import { ColumnDef } from '@tanstack/react-table';
import {
  Binoculars,
  CalendarX,
  Ellipsis,
  FileDown,
  FileUp,
  ListFilter,
  MessageSquareX,
  Search,
  SendHorizontal,
  ShieldCheck,
  Signature,
  SquareArrowOutUpRight,
  UserRoundPlus,
} from 'lucide-react';
import React, { FormEvent, JSX, useEffect, useState } from 'react';
import DoctorDetails from '../../../_components/doctorDetails';
import { Toast, toast } from '@/hooks/use-toast';
import { downloadFileWithUrl, showErrorToast } from '@/lib/utils';
import { useSearch } from '@/hooks/useSearch';
import { useDropdownAction } from '@/hooks/useDropdownAction';
import { activateUser, deactivateUser } from '@/lib/features/auth/authThunk';
import { selectIsOrganizationAdmin, selectOrganizationId } from '@/lib/features/auth/authSelector';
import InviteDoctor from '@/app/dashboard/_components/inviteDoctor';
import InvitationPreview from '@/app/dashboard/(admin)/(user)/_components/invitationPreview';
import { useCSVReader } from '@/hooks/useCSVReader';

const statusFilterOptions: ISelected[] = [
  {
    value: '',
    label: 'All',
  },
  {
    value: AcceptDeclineStatus.Accepted,
    label: 'Approved',
  },
  {
    value: AcceptDeclineStatus.Pending,
    label: 'Pending',
  },
  {
    value: AcceptDeclineStatus.Declined,
    label: 'Rejected',
  },
];

const DoctorPanel = (): JSX.Element => {
  const [paginationData, setPaginationData] = useState<PaginationData | undefined>(undefined);
  const [openInvitationsPreview, setOpenInvitationsPreview] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | undefined>();
  const [openModal, setModalOpen] = useState(false);
  const [openInviteModal, setInviteModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isInviting, setIsInviting] = useState(false);
  const dispatch = useAppDispatch();
  const [tableData, setTableData] = useState<IDoctor[]>([]);
  const [queryParameters, setQueryParameters] = useState<IQueryParams<AcceptDeclineStatus | ''>>({
    page: 1,
    orderDirection: 'desc',
    orderBy: 'createdAt',
    status: '',
    search: '',
  });
  const [confirmation, setConfirmation] = useState<ConfirmationProps>({
    acceptCommand: () => {},
    rejectCommand: () => {},
    description: '',
    open: false,
  });
  const { searchTerm, handleSearch } = useSearch(handleSubmit);
  const IsOrganizationAdmin = useAppSelector(selectIsOrganizationAdmin);
  const orgId = useAppSelector(selectOrganizationId);

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

      setTableData(rows);
      setPaginationData(pagination);
      setLoading(false);
    };
    void fetchData();
  }, [queryParameters]);

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
        switch (row.getValue('status')) {
          case AcceptDeclineStatus.Accepted:
            return <Badge variant="default">Approved</Badge>;
          case AcceptDeclineStatus.Declined:
            return <Badge variant="destructive">Declined</Badge>;
          case AcceptDeclineStatus.Deactivated:
            return <Badge variant="destructive">Deactivated</Badge>;
          default:
            return <Badge variant="brown">Pending</Badge>;
        }
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
      cell: ({ row }): JSX.Element => {
        const isPending = row.getValue('status') === AcceptDeclineStatus.Pending;
        const isApproved = row.getValue('status') === AcceptDeclineStatus.Accepted;
        const isDeactivated = row.getValue('status') === AcceptDeclineStatus.Deactivated;
        return (
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
              {isDeactivated && (
                <DropdownMenuItem
                  onClick={() =>
                    setConfirmation((prev) => ({
                      ...prev,
                      open: true,
                      acceptCommand: () =>
                        handleDropdownAction(activateUser, String(row.getValue('id'))),
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
              )}
              {isPending && (
                <>
                  <DropdownMenuItem
                    onClick={() =>
                      setConfirmation((prev) => ({
                        ...prev,
                        open: true,
                        acceptCommand: () =>
                          handleDropdownAction(approveDoctorRequest, String(row.getValue('id'))),
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
                        acceptCommand: () =>
                          handleDropdownAction(declineDoctor, String(row.getValue('id'))),
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
                </>
              )}
              {isApproved && (
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() =>
                    setConfirmation((prev) => ({
                      ...prev,
                      open: true,
                      acceptCommand: () =>
                        handleDropdownAction(deactivateUser, String(row.getValue('id'))),
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
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableHiding: false,
    },
  ];

  const processInviteDoctorRow = (row: string[]): IInviteDoctor | null => {
    if (row.some((value) => !value)) {
      return null;
    }
    return {
      firstName: row[0],
      lastName: row[1],
      email: row[2],
    };
  };

  const { readCSV, result, setResult } = useCSVReader<IInviteDoctor>(processInviteDoctorRow);

  useEffect(() => {
    if (!result.length) {
      setOpenInvitationsPreview(false);
    } else {
      if (!openInvitationsPreview) {
        setOpenInvitationsPreview(true);
      }
    }
  }, [result]);

  const onSubmit = async (inviteDoctorData: IInviteDoctor[]): Promise<void> => {
    setIsInviting(true);
    const { payload } = await dispatch(inviteDoctors({ orgId, users: inviteDoctorData }));
    setIsInviting(false);
    if (payload && !showErrorToast(payload)) {
      setInviteModalOpen(false);
      setOpenInvitationsPreview(false);
    }
    setQueryParameters((prev) => ({
      ...prev,
      page: 1,
    }));
    toast(payload as Toast);
  };

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

  const { handleDropdownAction, isConfirmationLoading } = useDropdownAction({
    setConfirmation,
    setQueryParameters,
  });

  //       const duplicateEmail = data.some(({ email }) => email === row[2]);

  const removeInvitation = (removeEmail: string): void => {
    const newInvitations = result.filter(({ email }) => email !== removeEmail);
    setResult(newInvitations);
  };

  return (
    <>
      <Modal
        className="max-w-xl"
        setState={setInviteModalOpen}
        open={openInviteModal}
        content={
          <InviteDoctor
            submit={(inviteDoctor) => onSubmit([inviteDoctor])}
            isLoading={isInviting}
          />
        }
        showClose={!isInviting}
      />
      <Modal
        className="max-w-xl"
        setState={setOpenInvitationsPreview}
        open={openInvitationsPreview}
        showClose={!isInviting}
        content={
          <InvitationPreview
            invitations={result}
            removeInvitation={removeInvitation}
            cancel={() => setOpenInvitationsPreview(false)}
            submit={() => onSubmit(result)}
            isLoading={isInviting}
          />
        }
      />
      <div className="mt-4 rounded-lg bg-white">
        <div className="p-6">
          <div className="mb-4 flex flex-wrap justify-between">
            <div className="mb-2 flex gap-2">
              <form className="flex" onSubmit={handleSubmit}>
                <Input
                  error=""
                  placeholder="Search Doctor"
                  className="max-w-[333px] sm:w-[333px]"
                  type="search"
                  leftIcon={<Search className="text-gray-500" size={20} />}
                  onChange={handleSearch}
                />
                {searchTerm && <Button child={<SendHorizontal />} className="ml-2" />}
              </form>
              <OptionsMenu
                options={statusFilterOptions}
                Icon={ListFilter}
                menuTrigger="Filter"
                selected={queryParameters.status}
                setSelected={(value: string) =>
                  setQueryParameters((prev) => ({
                    ...prev,
                    page: 1,
                    status: value as AcceptDeclineStatus,
                  }))
                }
                className="h-10 cursor-pointer bg-gray-50 sm:flex"
              />
            </div>
            {IsOrganizationAdmin && (
              <div className="space-x-4">
                <Button
                  onClick={() => setInviteModalOpen(true)}
                  child={
                    <>
                      <UserRoundPlus /> Invite Doctor
                    </>
                  }
                  className="h-10"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      child={
                        <>
                          <input
                            type="file"
                            id="fileUploadInput"
                            className="hidden"
                            accept=".csv"
                            onChange={(event) => readCSV(event)}
                          />
                          <SquareArrowOutUpRight /> Bulk Invite
                        </>
                      }
                      className="h-10"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <label className="flex w-full gap-x-2" htmlFor="fileUploadInput">
                        <FileUp /> Upload
                      </label>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        downloadFileWithUrl('/csv/doctor-invitation.csv', 'doctor-invitation.csv')
                      }
                    >
                      <FileDown /> Download Template
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
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
        className="max-w-screen max-h-screen overflow-y-scroll md:max-h-[90vh] md:max-w-[80vw]"
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

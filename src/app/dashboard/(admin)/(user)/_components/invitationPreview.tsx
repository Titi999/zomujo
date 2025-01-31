import { IInviteDoctor } from '@/types/doctor.interface';
import React, { JSX } from 'react';
import { TableData } from '@/components/ui/table';
import { ColumnDef } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type InvitationPreviewProps = {
  invitations: IInviteDoctor[];
  removeInvitation: (email: string) => void;
  cancel: () => void;
  submit: () => void;
  isLoading?: boolean;
};

const InvitationPreview = ({
  invitations,
  removeInvitation,
  cancel,
  submit,
  isLoading,
}: InvitationPreviewProps): JSX.Element => {
  const columns: ColumnDef<IInviteDoctor>[] = [
    {
      header: 'First Name',
      accessorKey: 'firstName',
    },
    {
      header: 'Last Name',
      accessorKey: 'lastName',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }): JSX.Element => {
        const email = row.original.email;
        return (
          <Trash2 className="cursor-pointer" color="red" onClick={() => removeInvitation(email)} />
        );
      },
    },
  ];

  return (
    <>
      <div>
        <h1 className="mb-4 text-lg font-bold">Invitation Preview</h1>
        <TableData columns={columns} data={invitations} manualPagination={false} />
      </div>
      <div>
        <Button
          onClick={() => submit()}
          disabled={!invitations.length || isLoading}
          isLoading={isLoading}
          child="Submit"
          className="ml-2"
        />
        <Button
          disabled={isLoading}
          onClick={() => cancel()}
          child="Cancel"
          variant="destructive"
          className="ml-2"
        />
      </div>
    </>
  );
};

export default InvitationPreview;

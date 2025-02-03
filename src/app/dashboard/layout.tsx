'use client';
import { SidebarProvider } from '@/components/ui/sidebar';
import { JSX, ReactNode } from 'react';
import { PhoneNavbar, SidebarLayout } from './_components/sidebar/sidebarLayout';
import AdminToolbar from '@/app/dashboard/_components/adminToolbar';
import { useAppSelector } from '@/lib/hooks';
import { selectIsAdmin, selectMustUpdatePassword } from '@/lib/features/auth/authSelector';
import { DashboardProvider } from '@/app/dashboard/_components/dashboardProvider';
import { Modal } from '@/components/ui/dialog';
import UpdatePassword from '@/app/dashboard/_components/updatePassword';

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  const isAdmin = useAppSelector(selectIsAdmin);
  const mustUpdatePassword = useAppSelector(selectMustUpdatePassword);

  return (
    <>
      <Modal className="max-w-xl" open={mustUpdatePassword} content={<UpdatePassword />} />
      <DashboardProvider>
        <SidebarProvider>
          <SidebarLayout />
          <PhoneNavbar />
          <main className="w-full bg-grayscale-100 px-1 me:border 2xl:px-6">
            {isAdmin && <AdminToolbar />}
            {children}
          </main>
        </SidebarProvider>
      </DashboardProvider>
    </>
  );
}

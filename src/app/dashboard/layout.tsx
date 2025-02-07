'use client';
import { SidebarProvider } from '@/components/ui/sidebar';
import { JSX, ReactNode } from 'react';
import { PhoneNavbar, SidebarLayout } from './_components/sidebar/sidebarLayout';
import Toolbar from '@/app/dashboard/_components/toolbar';
import { useAppSelector } from '@/lib/hooks';
import { selectMustUpdatePassword } from '@/lib/features/auth/authSelector';
import { DashboardProvider } from '@/app/dashboard/_components/dashboardProvider';
import { Modal } from '@/components/ui/dialog';
import UpdatePassword from '@/app/dashboard/_components/updatePassword';
import useWebSocket from '@/hooks/useWebSocket';

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  useWebSocket();
  const mustUpdatePassword = useAppSelector(selectMustUpdatePassword);

  return (
    <>
      <Modal className="max-w-xl" open={mustUpdatePassword} content={<UpdatePassword />} />
      <DashboardProvider>
        <SidebarProvider>
          <SidebarLayout />
          <PhoneNavbar />
          <main className="w-full bg-grayscale-100 px-1 me:border 2xl:px-6">
            <Toolbar />
            {children}
          </main>
        </SidebarProvider>
      </DashboardProvider>
    </>
  );
}

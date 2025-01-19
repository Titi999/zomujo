'use client';
import { SidebarProvider } from '@/components/ui/sidebar';
import { JSX, ReactNode } from 'react';
import { PhoneNavbar, SidebarLayout } from './_components/sidebar/Sidebar';
import AdminToolbar from '@/app/dashboard/_components/adminToolbar';
import { useAppSelector } from '@/lib/hooks';
import { selectIsAdmin } from '@/lib/features/auth/authSelector';
import { DashboardProvider } from '@/app/dashboard/_components/dashboardProvider';

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  const isAdmin = useAppSelector(selectIsAdmin);
  return (
    <DashboardProvider>
      <SidebarProvider>
        <SidebarLayout />
        <PhoneNavbar />
        <main className="w-full bg-grayscale-100 px-6 me:border">
          {isAdmin && <AdminToolbar />}
          {children}
        </main>
      </SidebarProvider>
    </DashboardProvider>
  );
}

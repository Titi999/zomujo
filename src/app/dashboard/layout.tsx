import {  SidebarProvider } from '@/components/ui/sidebar';
import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { SidebarLayout } from './_components/sidebar/Sidebar';

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <SidebarLayout />
      <main className="my-3.5 ml-4 mr-4 w-full rounded-lg bg-[#F0F2F5] border">
        {children}
      </main>
    </SidebarProvider>
  );
}

import { SidebarProvider } from '@/components/ui/sidebar';
import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { PhoneNavbar, SidebarLayout } from './_components/sidebar/Sidebar';

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
      <PhoneNavbar />
      <main className="w-full bg-[#F0F2F5] me:my-3.5 me:ml-4 me:mr-4 me:rounded-lg me:border">
        {children}
      </main>
    </SidebarProvider>
  );
}

import React, { ReactNode } from 'react';
import { SidebarLayout } from '../_components/sidebar/Sidebar';
import { SidebarType } from '@/types/shared.enum';
import { Bell } from 'lucide-react';

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>): React.JSX.Element {
  return (
    <div className="relative -ml-6 -mr-6 flex h-full flex-col">
      <div className="flex h-[97px] items-center justify-between bg-white px-6">
        <h2 className="text-[32px] font-bold">Settings</h2>
        <Bell />
      </div>
      <div className="relative flex h-[calc(100vh-99px)] overflow-hidden">
        <SidebarLayout
          type={SidebarType.Settings}
          sidebarClassName="absolute left-0"
          sidebarContentClassName="bg-gray-100  border-r"
          sidebarTabClassName="data-[active=true]/menu-action:before:opacity-0"
        />
        <div className="w-full overflow-y-scroll bg-gray-50 px-8 pt-8">{children}</div>
      </div>
    </div>
  );
}

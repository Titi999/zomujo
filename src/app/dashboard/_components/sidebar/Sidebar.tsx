'use client';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ADMIN_SIDE_BAR } from '@/constants/constants';
import { CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ChevronDown, EllipsisVertical, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileCompletionCard from '../profileCompletionCard/ProfileCompletionCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Logo } from '@/assets/images';

export const SidebarLayout = () => {
  const pathName = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="pb-[50px] pt-3.5">
        <SidebarTrigger child={<Image src={Logo} alt="Zyptyk-logo" />} className="h-10 w-10" />
      </SidebarHeader>
      <SidebarContent>
        {ADMIN_SIDE_BAR.sidebarGroup.map((category) => (
          <SidebarGroup key={category.groupTitle}>
            <SidebarGroupLabel>{category.groupTitle}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {category.menu.map((tab) =>
                  tab.subMenu ? (
                    <Collapsible className="group/collapsible" key={tab.title}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            {tab.icon && <tab.icon />} {tab.title}
                            <ChevronDown className="ml-auto mr-1" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {tab.subMenu.map((subMenu) => (
                              <SidebarMenuButton key={subMenu.title} title={subMenu.title}>
                                <Link href={tab.url}> {subMenu.title}</Link>
                              </SidebarMenuButton>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={tab.title}>
                      <SidebarMenuButton asChild isActive={pathName === tab.url} title={tab.title}>
                        <Link href={tab.url}>
                          {tab.icon && <tab.icon />} {tab.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ),
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <ProfileCompletionCard />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <User />
              <div className="flex flex-col">
                <span>User name</span>
                <span className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-badge">
                  Role
                </span>
              </div>
              <EllipsisVertical className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
            <DropdownMenuItem>
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

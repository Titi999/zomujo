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
import { ADMIN_SIDE_BAR, PATIENT_SIDE_BAR } from '@/constants/constants';
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
import { cn } from '@/lib/utils';

export const SidebarLayout = () => {
  const pathName = usePathname();

  return (
    <Sidebar className="hidden me:block">
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

export const PhoneNavbar = () => {
  const pathName = usePathname();
  const flattenedMenu = PATIENT_SIDE_BAR.sidebarGroup.flatMap((group) => group.menu);
  const style =
    'h-full p-2 hover:bg-transparent data-[active=true]:bg-transparent relative before:absolute before:left-1/2 before:top-0 before:-translate-x-1/2 before:transform rounded-lg before:h-[3px] before:w-[30px] before:rounded before:bg-primary before:opacity-0 data-[active=true]/menu-action:before:opacity-100';

  return (
    <div className="absolute bottom-0 flex h-[69px] w-full items-center justify-evenly gap-6 overflow-x-scroll bg-white pl-2 me:hidden">
      {flattenedMenu.map((tabs) => (
        <div key={tabs.title} title={tabs.title}>
          <SidebarMenuButton isActive={pathName === tabs.url} title={tabs.title} className={style}>
            <Link href={tabs.url} className="flex flex-col items-center justify-center">
              {tabs.icon && <tabs.icon size={24} />}
              <div>
                <span
                  className={cn(
                    'w-5 truncate text-xs font-bold',
                    pathName === tabs.url && 'text-primary',
                  )}
                >
                  {tabs.phoneTitle ?? tabs.title}
                </span>
              </div>
            </Link>
          </SidebarMenuButton>
        </div>
      ))}
      <SidebarMenuButton title="your profile" className={cn(style, 'min-w-11 max-w-11')}>
        <Link href="#" className="flex flex-col items-center justify-center">
          <User size={24} />
          <div>
            <span
              className={cn(
                'w-5 truncate text-xs font-bold',
                pathName === 'profile' && 'text-primary',
              )}
            >
              You
            </span>
          </div>
        </Link>
      </SidebarMenuButton>
    </div>
  );
};

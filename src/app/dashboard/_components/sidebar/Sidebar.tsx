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
import { ADMIN_SIDE_BAR, DOCTOR_SIDE_BAR, PATIENT_SIDE_BAR } from '@/constants/constants';
import { CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ChevronDown, EllipsisVertical } from 'lucide-react';
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
import { Avatar } from '@/components/ui/avatar';
import { useAppSelector } from '@/lib/hooks';
import { selectUserName, selectUserRole } from '@/lib/features/auth/authSelector';
import { Role } from '@/types/shared.enum';

export const SidebarLayout = () => {
  const userName = useAppSelector(selectUserName);
  const role = useAppSelector(selectUserRole);
  const pathName = usePathname();

  return (
    <Sidebar className="hidden me:block">
      <SidebarHeader className="pb-[50px] pt-3.5">
        <SidebarTrigger child={<Image src={Logo} alt="Zyptyk-logo" />} className="h-10 w-10" />
      </SidebarHeader>
      <SidebarContent>
        {getSidebarByRole(role).sidebarGroup.map((category) => (
          <SidebarGroup key={category.groupTitle}>
            <SidebarGroupLabel>{category.groupTitle}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {category.menu.map(({ title, url, Icon, subMenu }) =>
                  subMenu ? (
                    <Collapsible className="group/collapsible" key={title}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            {Icon && <Icon />} {title}
                            <ChevronDown className="ml-auto mr-1" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {subMenu.map((subMenu) => (
                              <SidebarMenuButton key={subMenu.title} title={subMenu.title}>
                                <Link href={url}> {subMenu.title}</Link>
                              </SidebarMenuButton>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={title}>
                      <SidebarMenuButton asChild isActive={pathName === url} title={title}>
                        <Link href={url}>
                          {Icon && <Icon />} {title}
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
              <Avatar />
              <div className="flex flex-col text-xs font-medium">
                <span>{userName}</span>
                <span className="rounded-lg py-1.5 text-badge">{role}</span>
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
  const role = useAppSelector(selectUserRole);
  const pathName = usePathname();
  const flattenedMenu = getSidebarByRole(role).sidebarGroup.flatMap((group) => group.menu);
  const style =
    'h-full p-2 hover:bg-transparent data-[active=true]:bg-transparent relative before:absolute before:left-1/2 before:top-0 before:-translate-x-1/2 before:transform rounded-lg before:h-[3px] before:w-[30px] before:rounded before:bg-primary before:opacity-0 data-[active=true]/menu-action:before:opacity-100';

  return (
    <div className="absolute bottom-0 flex h-[69px] w-full items-center justify-evenly gap-6 overflow-x-scroll bg-white pl-2 me:hidden">
      {flattenedMenu.map(({ title, Icon, phoneTitle, url }) => (
        <div key={title} title={title}>
          <SidebarMenuButton isActive={pathName === url} title={title} className={style}>
            <Link href={url} className="flex flex-col items-center justify-center">
              {Icon && <Icon size={24} />}
              <div>
                <span
                  className={cn(
                    'w-5 truncate text-xs font-bold',
                    pathName === url && 'text-primary',
                  )}
                >
                  {phoneTitle ?? title}
                </span>
              </div>
            </Link>
          </SidebarMenuButton>
        </div>
      ))}
      <SidebarMenuButton title="your profile" className={cn(style, 'min-w-16 max-w-16')}>
        <Link href="#" className="flex flex-col items-center justify-center">
          <Avatar className="h-6" />
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

const getSidebarByRole = (role?: Role) => {
  switch (role) {
    case Role.Admin:
      return ADMIN_SIDE_BAR;
    case Role.Doctor:
      return DOCTOR_SIDE_BAR;
    default:
      return PATIENT_SIDE_BAR;
  }
};

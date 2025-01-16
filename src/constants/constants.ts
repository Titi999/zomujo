import { ISidebar } from '@/types/sidebar.interface';
import {
  Archive,
  Banknote,
  CalendarDays,
  ChartNoAxesCombined,
  CircleHelp,
  Compass,
  Cross,
  Heart,
  Home,
  MessageCircleMore,
  Settings,
  User,
  UserSearch,
} from 'lucide-react';

export const MODE = {
  ON_TOUCH: 'onTouched',
} as const;

export const PATIENT_SIDE_BAR: ISidebar = {
  sidebarGroup: [
    {
      groupTitle: 'MAIN',
      menu: [
        {
          title: 'Home',
          url: '/dashboard',
          icon: Home,
        },
        {
          title: 'Find Doctors',
          url: '#',
          icon: Compass,
        },
        {
          title: 'Appointments',
          url: '#',
          icon: CalendarDays,
        },
        {
          title: 'Records',
          url: '#',
          icon: Archive,
        },
        {
          title: 'Favorite Doctors',
          url: '#',
          icon: Heart,
        },
        {
          title: 'Message',
          url: '#',
          icon: MessageCircleMore,
        },
      ],
    },

    {
      groupTitle: 'HELP & SETTINGS',
      menu: [
        {
          title: 'Help & Support',
          url: '#',
          icon: CircleHelp,
        },
        {
          title: 'Settings',
          url: '#',
          icon: Settings,
        },
      ],
    },
  ],
} as const;

export const DOCTOR_SIDE_BAR: ISidebar = {
  sidebarGroup: [
    {
      groupTitle: 'MENU',
      menu: [
        {
          title: 'Home',
          url: '/dashboard',
          icon: Home,
        },
        {
          title: 'Appointments',
          url: '#',
          icon: CalendarDays,
        },
        {
          title: 'Patients',
          url: '#',
          icon: User,
        },
        {
          title: 'Message',
          url: '#',
          icon: MessageCircleMore,
        },
      ],
    },

    {
      groupTitle: 'HELP & SETTINGS',
      menu: [
        {
          title: 'Help & Support',
          url: '#',
          icon: CircleHelp,
        },
        {
          title: 'Settings',
          url: '#',
          icon: Settings,
        },
      ],
    },
  ],
} as const;

export const ADMIN_SIDE_BAR: ISidebar = {
  sidebarGroup: [
    {
      groupTitle: 'MAIN',
      menu: [
        {
          title: 'Overview',
          url: '/dashboard',
          icon: Home,
        },
        {
          title: 'Analytics',
          url: '#',
          icon: ChartNoAxesCombined,
        },
        {
          title: 'Appointments',
          url: '#',
          icon: CalendarDays,
        },
        {
          title: 'User',
          url: '#',
          icon: User,
          subMenu: [
            {
              title: 'Patient',
              url: '#',
            },
            {
              title: 'Doctor',
              url: '#',
            },
          ],
        },
        {
          title: 'Transactions',
          url: '#',
          icon: Banknote,
        },
        {
          title: 'Manage S,M,I',
          url: '#',
          icon: Cross,
        },
        {
          title: 'Customer Support',
          url: '#',
          icon: UserSearch,
        },
      ],
    },

    {
      groupTitle: 'OTHER',
      menu: [
        {
          title: 'Settings',
          url: '#',
          icon: Settings,
        },
      ],
    },
  ],
} as const;

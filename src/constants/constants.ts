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
          Icon: Home,
        },
        {
          title: 'Find Doctors',
          url: '#',
          Icon: Compass,
          phoneTitle: 'Doctors',
        },
        {
          title: 'Appointments',
          url: '#',
          Icon: CalendarDays,
        },
        {
          title: 'Records',
          url: '#',
          Icon: Archive,
        },
        {
          title: 'Favorite Doctors',
          url: '#',
          Icon: Heart,
          phoneTitle: 'Favorite',
        },
        {
          title: 'Message',
          url: '#',
          Icon: MessageCircleMore,
        },
      ],
    },

    {
      groupTitle: 'HELP & SETTINGS',
      menu: [
        {
          title: 'Help & Support',
          url: '#',
          Icon: CircleHelp,
          phoneTitle: 'Help',
        },
        {
          title: 'Settings',
          url: '#',
          Icon: Settings,
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
          Icon: Home,
        },
        {
          title: 'Appointments',
          url: '#',
          Icon: CalendarDays,
        },
        {
          title: 'Patients',
          url: '#',
          Icon: User,
        },
        {
          title: 'Message',
          url: '#',
          Icon: MessageCircleMore,
        },
      ],
    },

    {
      groupTitle: 'HELP & SETTINGS',
      menu: [
        {
          title: 'Help & Support',
          url: '#',
          Icon: CircleHelp,
          phoneTitle: 'Help',
        },
        {
          title: 'Settings',
          url: '#',
          Icon: Settings,
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
          Icon: Home,
        },
        {
          title: 'Analytics',
          url: '#',
          Icon: ChartNoAxesCombined,
        },
        {
          title: 'Appointments',
          url: '#',
          Icon: CalendarDays,
        },
        {
          title: 'User',
          url: '#',
          Icon: User,
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
          Icon: Banknote,
        },
        {
          title: 'Manage S,M,I',
          url: '#',
          Icon: Cross,
        },
        {
          title: 'Customer Support',
          url: '#',
          Icon: UserSearch,
          phoneTitle: 'Support',
        },
      ],
    },

    {
      groupTitle: 'OTHER',
      menu: [
        {
          title: 'Settings',
          url: '#',
          Icon: Settings,
        },
      ],
    },
  ],
} as const;

export const DAYS_IN_WEEK = 7;
export const MINUTES_IN_HOUR = 60;
export const MILLISECONDS_IN_SECOND = 1000;
export const SECONDS_IN_MINUTE = 60;
export const PIXELS_PER_HOUR = 60;
export const TWELVE_HOUR_SYSTEM = 12;

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export interface ISidebar {
  sidebarGroup: ISidebarGroup[];
}

interface ISidebarGroup {
  groupTitle: string;
  menu: ISidebarMenu[];
}

interface ISidebarMenu {
  title: string;
  url: string;
  Icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  subMenu?: ISidebarMenu[];
  phoneTitle?: string;
}

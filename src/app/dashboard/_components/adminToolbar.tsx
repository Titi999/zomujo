import { Input } from '@/components/ui/input';
import { Search, Bell, Megaphone, Settings, SquareCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JSX } from 'react';

const AdminToolbar = (): JSX.Element => (
  <div className="flex justify-between gap-y-4 py-5 max-md:flex-wrap">
    <div className="w-full">
      <Input leftIcon={<Search color="#8C96A5" />} className="rounded-xl" placeholder="Search" />
    </div>
    <div className="flex gap-x-3">
      <div className="rounded-full border border-gray-200 bg-white p-2">
        <Bell className="text-grayscale-500" />
      </div>
      <div className="rounded-full border border-gray-200 bg-white p-2">
        <Megaphone className="text-grayscale-500" />
      </div>
      <div>
        <Button
          className="border-success-300 hover:bg-success-300! border bg-white text-black hover:text-white"
          child={
            <div className="flex items-center gap-x-1">
              <Settings />
              <span>System Operation</span>
              <SquareCheck radius={12} fill="#16A34A" className="text-white" />
            </div>
          }
        />
      </div>
    </div>
  </div>
);
export default AdminToolbar;

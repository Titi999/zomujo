import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { JSX } from 'react';

const NotificationPreference = (): JSX.Element => (
  <div>
    <div>
      <h2 className="text-2xl font-bold">Notification</h2>
      <p className="text-gray-500">
        Stay in the loop! Receive updates, and important news directly to your inbox.
      </p>
      <hr className="my-7 gap-4" />
    </div>
    <div className="flex gap-[89px]">
      <div className="max-w-[258px]">
        <p className="font-medium">Email Notification</p>
        <p className="text-sm text-gray-500">
          Manage your preferences anytime to tailor your email experience.
        </p>
      </div>
      <div className="max-w-[321px]">
        <div className="flex justify-start gap-2">
          <Switch label="On" name="on" labelClassName="text-base font-medium" checked={true} />
        </div>

        <div className="mt-8 flex flex-col justify-start gap-[42px]">
          <Checkbox
            name="confirm"
            labelClassName="text-gray-500 font-normal"
            checked={true}
            labelName="Stay informed about your appointments hassle-free"
            title="Appointments"
            titleLabelClassName="font-medium -mt-1"
            containerClassName="items-start"
          />
          <Checkbox
            name="confirm"
            labelClassName="text-gray-500 font-normal"
            checked={true}
            labelName="Receive updates, communicate with ease, and stay informed"
            title="Messages"
            titleLabelClassName="font-medium -mt-1"
            containerClassName="items-start"
          />
          <Checkbox
            name="confirm"
            labelClassName="text-gray-500 font-normal"
            checked={true}
            labelName="Receive notifications whenever your doctors send record requests"
            title="File record requests"
            titleLabelClassName="font-medium -mt-1"
            containerClassName="items-start"
          />
        </div>
      </div>
    </div>
    <hr className="my-7 gap-4" />
  </div>
);

export default NotificationPreference;

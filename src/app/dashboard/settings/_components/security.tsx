import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { JSX } from 'react';

const SecurityInfo = (): JSX.Element => (
  <div>
    <div>
      <h2 className="text-2xl font-bold">Security</h2>
      <p className="text-gray-500"> Change your profile</p>
      <hr className="my-7 gap-4" />
    </div>
    <div className="flex w-full max-w-[635px] flex-col gap-8">
      <Input
        labelName="Current Password"
        className="bg-transparent"
        wrapperClassName="max-w-none"
        placeholder="*****************"
        enablePasswordToggle={true}
      />
      <Input
        labelName="New Password"
        className="bg-transparent"
        wrapperClassName="max-w-none"
        placeholder="*****************"
        enablePasswordToggle={true}
      />

      <Input
        labelName="Confirm Password"
        className="bg-transparent"
        wrapperClassName="max-w-none"
        placeholder="*****************"
        enablePasswordToggle={true}
      />
      <Button child="Save Changes" className="ml-auto mt-12 flex" />
    </div>
    <hr className="my-8" />

    <div className="flex max-w-[635px] items-center justify-between">
      <div>
        <h2 className="font-bold">Delete account</h2>
        <p className="max-w-[297px] text-xs text-gray-500">
          We&rsquo;ll delete your account and data permanently. Thanks for being part of Zomujo!
          You&rsquo;re always welcome back if you change your mind.
        </p>
      </div>
      <div className="flex gap-2">
        <Button child={'Delete account'} variant={'destructive'} />
        <Button child={'Learn more'} variant={'outline'} />
      </div>
    </div>
  </div>
);

export default SecurityInfo;

import { Button } from '@/components/ui/button';
import React, { JSX } from 'react';

const Wallet = (): JSX.Element => (
  <div>
    <div className="w-full rounded-xl border p-6 sm:h-[200px] sm:w-[453px]">
      <p className="mb-2 text-sm font-medium text-gray-400">AVAILABLE</p>
      <p className="text-[20px] font-bold sm:text-[38px]"> GHS 0.00</p>
      <hr className="my-4" />
      <Button child="Withdraw" className="w-full" disabled={true} />
    </div>
    {/* //Todo: Bring the table here */}
  </div>
);

export default Wallet;

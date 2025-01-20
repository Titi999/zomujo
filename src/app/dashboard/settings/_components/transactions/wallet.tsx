import { Button } from '@/components/ui/button';
import React, { JSX } from 'react';

const Wallet = (): JSX.Element => (
  <div>
    <div className="h-[200px] w-[453px] rounded-xl border p-6">
      <p className="mb-2 text-sm font-medium text-gray-400">AVAILABLE</p>
      <p className="text-[38px] font-bold"> $2,000,789.00</p>
      <hr className="my-4" />
      <Button child="Withdraw" className="w-full" />
    </div>
    {/* //Todo: Bring the table here */}
  </div>
);

export default Wallet;

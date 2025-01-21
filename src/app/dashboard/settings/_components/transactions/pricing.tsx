'use client';
import { Slider } from '@/components/ui/slider';
import React, { JSX, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Pricing = (): JSX.Element => {
  const MIN_AMOUNT = 20;
  const MAX_AMOUNT = 300;

  const MIN_SESSION = 30;
  const MAX_SESSION = 120;

  const [amount, setCurrentAmount] = useState(MIN_AMOUNT);
  const [lengthOfSession, setCurrentSessionLength] = useState(MIN_SESSION);

  function sliderPosition(value: number, type: 'amount' | 'sessionLength'): number {
    if (type === 'amount') {
      const multiplier = 1.3;
      const offset = -20;
      return value * multiplier + offset;
    }
    const multiplier = value < 60 ? 1.3 : value < 80 ? 2.4 : 3;
    const offset = value < 50 ? -30 : 0;
    return value * multiplier + offset;
  }
  return (
    <div className="flex w-full flex-col items-end gap-24 sm:ml-6 sm:w-[454px]">
      <div className="relative flex w-full flex-1 flex-col gap-4">
        <p className="text-sm">Select amount</p>
        <Slider
          value={[amount]}
          onValueChange={(value) => setCurrentAmount(value[0])}
          min={MIN_AMOUNT}
          max={MAX_AMOUNT}
          step={5}
        />
        <motion.div
          style={{
            x: `${sliderPosition(window.innerWidth < 430 ? 20 : amount, 'amount')}px`,
          }}
          className="absolute top-[calc(100%+8px)] flex h-8 w-16 items-center justify-center rounded-full bg-primary"
        >
          <p className="text-sm text-white">₵{amount}</p>
        </motion.div>
      </div>
      <div className="relative flex w-full flex-1 flex-col gap-4">
        <p className="text-sm">Length of session</p>
        <Slider
          value={[lengthOfSession]}
          onValueChange={(value) => setCurrentSessionLength(value[0])}
          min={MIN_SESSION}
          max={MAX_SESSION}
          step={5}
        />
        <motion.div
          style={{
            x: `${sliderPosition(window.innerWidth < 430 ? 20 : lengthOfSession, 'sessionLength')}px`,
          }}
          className="absolute top-[calc(100%+8px)] flex h-8 items-center justify-center rounded-full bg-primary px-2.5"
        >
          <p className="text-sm text-white">{lengthOfSession} mins</p>
        </motion.div>
      </div>
      <Button child="Save Changes" />
    </div>
  );
};

export default Pricing;

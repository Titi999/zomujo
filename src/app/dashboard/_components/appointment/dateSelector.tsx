import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { JSX } from 'react';
import moment from 'moment';

interface DateSelectorProps {
  date: Date;
  onIncrement: () => void;
  onDecrement: () => void;
  className?: string;
}
const DateSelector = ({ date, onDecrement, onIncrement }: DateSelectorProps): JSX.Element => (
  <div className="flex flex-row items-center gap-3">
    <button
      onClick={onDecrement}
      className="flex h-8 w-8 items-center justify-center rounded border border-gray-200"
    >
      <ChevronLeft className="h-5 w-5 text-gray-500" />
    </button>
    <p className="text-sm">{moment(date).format('Do MMM, YYYY')}</p>
    <button
      onClick={onIncrement}
      className="flex h-8 w-8 items-center justify-center rounded border border-gray-200"
    >
      <ChevronRight className="h-5 w-5 text-gray-500" />
    </button>
  </div>
);

export default DateSelector;

import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { toast } from '@/hooks/use-toast';
import { ToastStatus } from '@/types/shared.enum';

export const useCSVReader = <T extends object>(
  processRow: (row: string[]) => T | null,
): {
  readCSV: (event: React.ChangeEvent<HTMLInputElement>) => void;
  result: T[];
  setResult: Dispatch<SetStateAction<T[]>>;
} => {
  const [result, setResult] = useState<T[]>([]);

  const readCSV = (event: ChangeEvent<HTMLInputElement>): void => {
    const target = event.target;
    const file = target.files?.[0];
    if (!file) {
      toast({
        title: ToastStatus.Error,
        description: 'No file selected',
        variant: 'destructive',
      });
      return;
    }
    if (!file.name.endsWith('.csv')) {
      toast({
        title: ToastStatus.Error,
        description: 'Please upload a csv file.',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();

    reader.onload = (progressEvent): void => {
      const text = progressEvent.target?.result;
      const rows = String(text)
        .split('\n')
        .map((row) => row.split(','));
      const data: T[] = [];
      rows.forEach((row, index) => {
        if (index === 0) {
          return;
        }
        const processedRow = processRow(row);
        if (processedRow) {
          data.push(processedRow);
        } else {
          toast({
            title: ToastStatus.Error,
            description: `Invalid value at column ${index + 1}. Skipping...`,
            variant: 'default',
          });
        }
      });
      setResult(data);
    };
    reader.readAsText(file);
    target.value = '';
  };

  return { readCSV, result, setResult };
};

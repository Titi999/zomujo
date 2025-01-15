import { useState, ChangeEvent, FormEvent } from 'react';

export function useSearch(
  handleSubmit?: (event: FormEvent<HTMLFormElement>, search?: string) => void,
): { searchTerm: string; handleSearch: (event: ChangeEvent<HTMLInputElement>) => void } {
  const [searchTerm, setSearchTerm] = useState<string>('');

  function handleSearch(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    setSearchTerm(value);
    if (value === '' && handleSubmit) {
      setSearchTerm('');
      setTimeout(() => {
        handleSubmit(event as unknown as FormEvent<HTMLFormElement>, '');
      }, 1000);
    }
  }

  return { searchTerm, handleSearch };
}

'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from './ui/input';
import useDebounce from '@/hooks/use-debounce';
import { useRouter } from 'next/navigation';

export default function SearchInput() {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const debouncedValue = useDebounce(searchValue);
  const router = useRouter();

  useEffect(() => {
    router.push('?name=' + debouncedValue);
  }, [debouncedValue]);

  return (
    <Input
      placeholder='Search...'
      value={searchValue}
      onChange={handleChange}
    />
  );
}

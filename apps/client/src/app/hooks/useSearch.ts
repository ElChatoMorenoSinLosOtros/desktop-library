import { ChangeEvent, useCallback, useState } from 'react';

interface Props {
  filterData: (value: string, filter: string) => void;
}

export function useSearch({ filterData }: Props) {
  const [filter, setFilter] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleSelectChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      if (filter === event.target.value) return;
      setFilter(event.target.value);
      filterData(inputValue, event.target.value);
    },
    [filter, inputValue]
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (inputValue === event.target.value) return;
      setInputValue(event.target.value);
      filterData(event.target.value, filter);
    },
    [filter, inputValue]
  );

  return {
    handleSelectChange,
    handleInputChange,
    filter,
    inputValue,
    setFilter,
    setInputValue
  };
}

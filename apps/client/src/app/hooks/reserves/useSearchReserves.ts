import { useSearch } from '../useSearch';

interface Props {
  reserves: Reserve[];
  setReserves: React.Dispatch<React.SetStateAction<Reserve[]>>;
}

export function useSearchReserves({ reserves, setReserves }: Props) {
  const filterData = (value: string, filter: string) => {
    if (filter === '' || value === '') {
      setReserves(reserves);
      return;
    }
    const newPersons = reserves.filter(reserve => {
      if (filter === 'Client ID') {
        return reserve.clientId === Number(value);
      }
      if (filter === 'Material ID') {
        return reserve.materialId === Number(value);
      }
      return reserve;
    });
    setReserves(newPersons);
  };

  const {
    handleInputChange,
    handleSelectChange,
    inputValue,
    filter,
    setInputValue,
    setFilter
  } = useSearch({
    filterData
  });

  return {
    handleInputChange,
    handleSelectChange,
    inputValue,
    filter,
    setInputValue,
    setFilter
  };
}

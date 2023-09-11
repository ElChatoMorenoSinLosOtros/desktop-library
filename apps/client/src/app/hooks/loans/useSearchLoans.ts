import { useSearch } from '../useSearch';

interface Props {
  loans: Loan[];
  setLoans: React.Dispatch<React.SetStateAction<Loan[]>>;
}

export function useSearchLoans({ loans, setLoans }: Props) {
  const filterData = (value: string, filter: string) => {
    if (filter === '' || value === '') {
      setLoans(loans);
      return;
    }
    const newPersons = loans.filter(loan => {
      if (filter === 'Due Date') {
        return String(loan.returnDate).includes(value);
      }
      return loan;
    });
    setLoans(newPersons);
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

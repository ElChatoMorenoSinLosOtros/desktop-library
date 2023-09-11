import { useSearch } from '../useSearch';

interface Props {
  persons: User[];
  setPersons: React.Dispatch<React.SetStateAction<User[]>>;
}

export function useSearchPersons({ persons, setPersons }: Props) {
  const filterData = (value: string, filter: string) => {
    if (filter === '' || value === '') {
      setPersons(persons);
      return;
    }
    const newPersons = persons.filter(person => {
      if (filter === 'ID') {
        return person.clientId === Number(value);
      }
      if (filter === 'Name') {
        return person.name.toLowerCase().includes(value.toLowerCase());
      }
      if (filter === 'Last Name') {
        return person.lastName.toLowerCase().includes(value.toLowerCase());
      }
      if (filter === 'Email') {
        return person.email.toLowerCase().includes(value.toLowerCase());
      }
      if (filter === 'Type') {
        return person.typeUser.toLowerCase().includes(value.toLowerCase());
      }
      return person;
    });
    setPersons(newPersons);
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

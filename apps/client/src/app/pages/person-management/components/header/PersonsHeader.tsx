import GlobalBlueButton from '@common-components/GlobalBlueButton';
import GlobalSearchInput from '@common-components/GlobalSearchInput';
import GlobalSelectFilter from '@common-components/GlobalSelectFilter';
import { useSearchPersons } from '@hooks/persons/useSearchPersons';
import { useNavigate } from 'react-router-dom';

interface Props {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  initState: User[];
}

function PersonsHeader({ setUsers, initState }: Props) {
  const navigate = useNavigate();

  const { handleInputChange, handleSelectChange, inputValue, setInputValue } =
    useSearchPersons({
      persons: initState,
      setPersons: setUsers
    });

  return (
    <div className='px-6 py-2 grid place-items-center grid-cols-6'>
      <div className='font-russo text-3xl text-[#0D1B2A]/75 text-start w-full'>
        List Person
      </div>
      <GlobalBlueButton
        onClick={() => {
          navigate('/person-management/add');
        }}
      >
        Add Person
      </GlobalBlueButton>
      <GlobalBlueButton onClick={() => setInputValue('')}>
        See All
      </GlobalBlueButton>
      <GlobalSelectFilter
        handleSelectChange={handleSelectChange}
        defaultValue='Filter'
        options={['ID', 'Name', 'Last Name', 'Type', 'Email']}
      />
      <GlobalSearchInput
        inputValue={inputValue}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default PersonsHeader;

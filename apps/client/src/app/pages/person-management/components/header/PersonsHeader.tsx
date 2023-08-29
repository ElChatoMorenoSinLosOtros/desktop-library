import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BluePersonButton from './components/blue-button/BluePersonButton';
import SearchInput from './components/search-input/SearchInput';
import SelectFilterPerson from '../select/SelectFilterPerson';

function PersonsHeader() {
  const [selected, setSelected] = useState('');
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (selected === event.target.value) return;
    setSelected(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (inputValue === event.target.value) return;
    setInputValue(event.target.value);
  };

  return (
    <div className='px-6 py-2 grid place-items-center grid-cols-6 gap-4'>
      <div className='font-russo text-3xl text-[#0D1B2A]/75 text-start w-full'>
        List Person
      </div>
      <BluePersonButton
        onClick={() => {
          navigate('/person-management/add');
        }}
      >
        Add Person
      </BluePersonButton>
      <BluePersonButton onClick={() => setInputValue('')}>
        See All
      </BluePersonButton>
      <SelectFilterPerson handleSelectChange={handleSelectChange} />
      <SearchInput
        inputValue={inputValue}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default PersonsHeader;

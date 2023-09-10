import GlobalBlueButton from '@common-components/GlobalBlueButton.tsx';
import GlobalSearchInput from '@common-components/GlobalSearchInput.tsx';
import GlobalSelectFilter from '@common-components/GlobalSelectFilter.tsx';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ReservesHeader() {
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
    <div className='px-6 py-2 grid place-items-center grid-cols-6'>
      <div className='font-russo text-3xl text-[#0D1B2A]/75 text-start w-full'>
        List Reserves
      </div>
      <GlobalBlueButton
        onClick={() => {
          navigate('/reservations-management/add');
        }}
      >
        Add Reserve
      </GlobalBlueButton>
      <GlobalBlueButton onClick={() => setInputValue('')}>
        See All
      </GlobalBlueButton>
      <GlobalSelectFilter
        handleSelectChange={handleSelectChange}
        defaultValue='Filter'
        options={['ID', 'Material Type', 'Loan Date', 'Reserved By', 'Status']}
      />
      <GlobalSearchInput
        inputValue={inputValue}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default ReservesHeader;

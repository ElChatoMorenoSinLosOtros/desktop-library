import GlobalBlueButton from '@common-components/GlobalBlueButton';
import GlobalSearchInput from '@common-components/GlobalSearchInput';
import GlobalSelectFilter from '@common-components/GlobalSelectFilter';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminHeader() {
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
        Admin List
      </div>
      <GlobalBlueButton
        onClick={() => {
          navigate('/admin/add');
        }}
      >
        Add Admin
      </GlobalBlueButton>
      <GlobalBlueButton onClick={() => setInputValue('')}>
        See All
      </GlobalBlueButton>
      <GlobalSelectFilter
        handleSelectChange={handleSelectChange}
        defaultValue='Filter'
        options={['ID', 'email', 'name', 'role', 'actions']}
      />
      <GlobalSearchInput
        inputValue={inputValue}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default AdminHeader;

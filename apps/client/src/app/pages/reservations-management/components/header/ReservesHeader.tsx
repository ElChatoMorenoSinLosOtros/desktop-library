import GlobalBlueButton from '@common-components/GlobalBlueButton.tsx';
import GlobalSearchInput from '@common-components/GlobalSearchInput.tsx';
import GlobalSelectFilter from '@common-components/GlobalSelectFilter.tsx';
import { useSearchReserves } from '@hooks/reserves/useSearchReserves';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  reserves: Reserve[];
  setReserves: React.Dispatch<React.SetStateAction<Reserve[]>>;
}

function ReservesHeader({ reserves, setReserves }: Props) {
  const navigate = useNavigate();
  const { setInputValue, handleInputChange, handleSelectChange, inputValue } =
    useSearchReserves({
      reserves,
      setReserves
    });

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
      <GlobalBlueButton
        onClick={() => {
          setInputValue('');
          setReserves(reserves);
        }}
      >
        See All
      </GlobalBlueButton>
      <GlobalSelectFilter
        handleSelectChange={handleSelectChange}
        defaultValue='Filter'
        options={['Material ID', 'Client ID']}
      />
      <GlobalSearchInput
        inputValue={inputValue}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default ReservesHeader;

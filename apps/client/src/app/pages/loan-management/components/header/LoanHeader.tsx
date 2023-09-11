import GlobalBlueButton from '@common-components/GlobalBlueButton';
import GlobalSearchInput from '@common-components/GlobalSearchInput';
import GlobalSelectFilter from '@common-components/GlobalSelectFilter';
import { useSearchLoans } from '@hooks/loans/useSearchLoans';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  loans: Loan[];
  setLoans: React.Dispatch<React.SetStateAction<Loan[]>>;
}

function LoanHeader({ loans, setLoans }: Props) {
  const navigate = useNavigate();
  const { setInputValue, handleInputChange, handleSelectChange, inputValue } =
    useSearchLoans({
      loans,
      setLoans
    });

  return (
    <div className='px-6 py-2 grid place-items-center grid-cols-6'>
      <div className='font-russo text-3xl text-[#0D1B2A]/75 text-start w-full'>
        List Loans
      </div>
      <GlobalBlueButton
        onClick={() => {
          navigate('/loan-management/add');
        }}
      >
        Add Loan
      </GlobalBlueButton>
      <GlobalBlueButton
        onClick={() => {
          setInputValue('');
          setLoans(loans);
        }}
      >
        See All
      </GlobalBlueButton>
      <GlobalSelectFilter
        handleSelectChange={handleSelectChange}
        defaultValue='Filter'
        options={['Due Date']}
      />
      <GlobalSearchInput
        inputValue={inputValue}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default LoanHeader;

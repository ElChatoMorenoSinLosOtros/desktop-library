import LibraryAPIService from '@api/LibraryAPI';
import Button from '@common-components/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UpdateReturnLoan({
  isReturned,
  loanId,
  className
}: {
  isReturned: boolean;
  loanId: number;
  className: string;
}) {
  const { createReturn } = LibraryAPIService();
  const [isAlreadyReturned, setIsAlreadyReturned] = useState(isReturned);
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        createReturn({ data: { loanId } })
          .then()
          .catch((error: Error) => {
            throw new Error(error.message);
          })
          .finally(() => {
            setIsAlreadyReturned(true);
            navigate('/loan-management');
          });
      }}
      disabled={isAlreadyReturned}
      className={`bg-[#0d1b2a] text-white font-roboto-mono font-bold text-xl ${className} py-2 px-8 rounded-xl`}
    >
      Return
    </Button>
  );
}

export default UpdateReturnLoan;

import LibraryAPIService from '@api/LibraryAPI';
import GlobalText from '@common-components/GlobalText';
import { useEffect, useState } from 'react';

function ShowReturnDate({ loanId }: { loanId: number }) {
  const { getReturnByLoanId } = LibraryAPIService();
  const [devolution, setDevolution] = useState<Return>({} as Return);

  useEffect(() => {
    getReturnByLoanId({ loanId: Number(loanId) })
      .then(resp => setDevolution(resp))
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  });
  return (
    <GlobalText
      title='Return Date'
      text={String(
        devolution
          ? devolution.returnDate?.toString().substring(0, 10)
          : 'Not Returned'
      )}
    />
  );
}

export default ShowReturnDate;

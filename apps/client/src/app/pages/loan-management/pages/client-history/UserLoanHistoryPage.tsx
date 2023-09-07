import LibraryAPIService from '@api/LibraryAPI.ts';
import GlobalList from '@common-components/GlobalList.tsx';
import Line from '@common-components/Line.tsx';
import LoanFields from '@pages/loan-management/components/fields/LoanFields';
import LoanList from '@pages/loan-management/components/list/LoanList';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserLoanHistory() {
  const { getLoans } = LibraryAPIService();
  const { id } = useParams<InfoPersonPageParams>();
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    getLoans()
      .then(res => {
        const userLoans = res.filter(loan => String(loan.clientId) === id);
        setLoans(userLoans);
      })
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }, []);

  return (
    <GlobalList title='User Loans History'>
      <Line />
      <LoanFields />
      <Line />
      <LoanList loans={loans} />
    </GlobalList>
  );
}

export default UserLoanHistory;

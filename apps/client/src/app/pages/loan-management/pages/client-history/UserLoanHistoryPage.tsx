import LibraryAPIService from '@api/LibraryAPI.ts';
import GlobalList from '@common-components/GlobalList.tsx';
import Line from '@common-components/Line.tsx';
import LoanFields from '@pages/loan-management/components/fields/LoanFields';
import LoanList from '@pages/loan-management/components/list/LoanList';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserLoanHistory() {
  const { getClientLoans } = LibraryAPIService();
  const { id } = useParams<InfoPersonPageParams>();
  const [loans, setLoans] = useState<Loan[]>([] as Loan[]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const response = await getClientLoans({ id: Number(id) });
      setLoans(response);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <GlobalList title='User Loans History'>
      <LoanFields />
      <Line />
      <LoanList loans={loans} isLoading={isLoading} />
    </GlobalList>
  );
}

export default UserLoanHistory;

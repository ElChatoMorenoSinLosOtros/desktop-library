import LibraryAPIService from '@api/LibraryAPI.ts';
import GlobalList from '@common-components/GlobalList.tsx';
import Line from '@common-components/Line.tsx';
import LoanFields from '@pages/loan-management/components/fields/LoanFields';
import LoanHeader from '@pages/loan-management/components/header/LoanHeader';
import LoanList from '@pages/loan-management/components/list/LoanList';
import { useEffect, useState } from 'react';

function LoanManagementPage() {
  const { getLoans } = LibraryAPIService();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initState, setInitState] = useState<Loan[]>([] as Loan[]);

  useEffect(() => {
    async function fetchData() {
      const response = await getLoans();
      setLoans(response);
      setInitState(response);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <GlobalList title='Loans Management'>
      {!isLoading && (
        <>
          <LoanHeader setLoans={setLoans} loans={initState} />
          <Line />
          <LoanFields />
          <Line />
          <LoanList loans={loans} />
        </>
      )}
    </GlobalList>
  );
}

export default LoanManagementPage;

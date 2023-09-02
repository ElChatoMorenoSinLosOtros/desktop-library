import LibraryAPIService from '@api/LibraryAPI.ts';
import { useEffect, useState } from 'react';
import GlobalList from '@common-components/GlobalList.tsx';
import Line from '@common-components/Line.tsx';
import LoanHeader from '@pages/loan-management/components/header/LoanHeader';
import LoanFields from '@pages/loan-management/components/fields/LoanFields';
import LoanList from '@pages/loan-management/components/list/LoanList';

function LoanManagementPage() {
  const { getLoans } = LibraryAPIService();
  const [loans, setLoans] = useState<Material[]>([]);

  useEffect(() => {
    getLoans()
      .then(res => setLoans(res))
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }, []);

  return (
    <GlobalList title='Loans Management'>
      <LoanHeader />
      <Line />
      <LoanFields />
      <Line />
      <LoanList loans={loans} />
    </GlobalList>
  );
}

export default LoanManagementPage;

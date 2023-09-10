import LibraryAPIService from '@api/LibraryAPI.ts';
import GlobalList from '@common-components/GlobalList.tsx';
import Line from '@common-components/Line.tsx';
import { useEffect, useState } from 'react';
import FinesFields from './components/fields/FinesFields';
import FinesHeader from './components/header/FinesHeader';
import FinesList from './components/list/FinesLists';

function FinesManagementPage() {
  const { getFines } = LibraryAPIService();
  const [fines, setFines] = useState<Fine[]>([] as Fine[]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const response = await getFines();
      setFines(response);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <GlobalList title='Fines Management'>
      <FinesHeader />
      <Line />
      <FinesFields />
      <Line />
      <FinesList fines={fines} isLoading={isLoading} />
    </GlobalList>
  );
}

export default FinesManagementPage;

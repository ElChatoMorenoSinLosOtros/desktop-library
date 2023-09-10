import LibraryAPIService from '@api/LibraryAPI.ts';
import GlobalList from '@common-components/GlobalList.tsx';
import Line from '@common-components/Line.tsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FinesFields from '../components/fields/FinesFields';
import FinesList from '../components/list/FinesLists';

function FinesClientHistoryPage() {
  const { getClientFines } = LibraryAPIService();
  const { id } = useParams<InfoPersonPageParams>();
  const [fines, setFines] = useState<Fine[]>([] as Fine[]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const response = await getClientFines({ id: Number(id) });
      setFines(response);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <GlobalList title='User Fines History'>
      <FinesFields />
      <Line />
      <FinesList fines={fines} isLoading={isLoading} />
    </GlobalList>
  );
}

export default FinesClientHistoryPage;

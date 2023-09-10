import LibraryAPIService from '@api/LibraryAPI.ts';
import GlobalList from '@common-components/GlobalList.tsx';
import Line from '@common-components/Line.tsx';
import ReservesFields from '@pages/reservations-management/components/fields/ReservesFields';
import ReservesHeader from '@pages/reservations-management/components/header/ReservesHeader';
import ReserveList from '@pages/reservations-management/components/list/ReserveList';
import { useEffect, useState } from 'react';

function ReservationsManagementPage() {
  const { getReserves } = LibraryAPIService();
  const [reserves, setReserves] = useState<Reserve[]>([] as Reserve[]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const response = await getReserves();
      setReserves(response);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <GlobalList title='Reserves Management'>
      <ReservesHeader />
      <Line />
      <ReservesFields />
      <Line />
      <ReserveList reserves={reserves} isLoading={isLoading} />
    </GlobalList>
  );
}

export default ReservationsManagementPage;

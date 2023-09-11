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
  const [initState, setInitState] = useState<Reserve[]>([] as Reserve[]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const response = await getReserves();
      setReserves(response);
      setInitState(response);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <GlobalList title='Reserves Management'>
      {!isLoading && (
        <>
          <ReservesHeader setReserves={setReserves} reserves={initState} />
          <Line />
          <ReservesFields />
          <Line />
          <ReserveList reserves={reserves} />
        </>
      )}
    </GlobalList>
  );
}

export default ReservationsManagementPage;

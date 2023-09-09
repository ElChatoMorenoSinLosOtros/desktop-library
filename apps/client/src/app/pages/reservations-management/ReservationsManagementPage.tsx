import LibraryAPIService from '@api/LibraryAPI.ts';
import GlobalList from '@common-components/GlobalList.tsx';
import Line from '@common-components/Line.tsx';
import ReservesFields from '@pages/reservations-management/components/fields/ReservesFields';
import ReservesHeader from '@pages/reservations-management/components/header/ReservesHeader';
import ReserveList from '@pages/reservations-management/components/list/ReserveList';
import { useEffect, useState } from 'react';

function ReservationsManagementPage() {
  const { getReserves } = LibraryAPIService();
  const [reserves, setReserves] = useState<Reserve[]>([]);

  useEffect(() => {
    getReserves()
      .then(res => setReserves(res))
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }, []);

  return (
    <GlobalList title='Reserves Management'>
      <ReservesHeader />
      <Line />
      <ReservesFields />
      <Line />
      <ReserveList reserves={reserves} />
    </GlobalList>
  );
}

export default ReservationsManagementPage;

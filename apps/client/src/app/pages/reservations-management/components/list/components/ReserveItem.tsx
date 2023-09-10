import LibraryAPIService from '@api/LibraryAPI.ts';
import DeleteButton from '@common-components/DeleteButton.tsx';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReservesActionButton from './components/ReserveActionButton';

function ReserveItem({ reserve }: { reserve: Reserve }) {
  const navigate = useNavigate();
  const { removeReserveById, getMaterialById, getUserById } =
    LibraryAPIService();
  const [material, setMaterial] = useState<Material>({} as Material);
  const [client, setClient] = useState<Client>({} as Client);

  useEffect(() => {
    async function fetchData() {
      const materialResponse = await getMaterialById({
        id: reserve.materialId
      });
      setMaterial(materialResponse);
      const clientResponse = await getUserById({
        id: String(reserve.clientId)
      });
      setClient(clientResponse);
    }

    fetchData();
  }, [reserve]);

  return (
    <div className='grid grid-cols-12 w-full px-6 gap-4'>
      <div>{reserve.reserveId}</div>
      <div className='col-span-2'>{material.type_material}</div>
      <div className='col-span-2'>
        {reserve.executeDate.toString().substring(0, 10)}
      </div>
      <div className='col-span-2'>{client.name}</div>
      <div className='col-span-2'>
        {reserve.executed ? 'Executed' : 'Not executed'}
      </div>
      <ReservesActionButton
        onClick={() => {
          navigate(`/reservations-management/info/${reserve.reserveId}`);
        }}
      >
        <InfoIcon />
      </ReservesActionButton>
      <ReservesActionButton
        onClick={() => {
          navigate(`/reservations-management/update/${reserve.reserveId}`);
        }}
      >
        <EditIcon />
      </ReservesActionButton>
      <DeleteButton
        className='text-center text-2xl'
        type='Reserve'
        onClick={() => {
          (async () => {
            await removeReserveById({
              id: reserve.reserveId
            });
          })()
            .catch((error: Error) => {
              throw new Error(error.message);
            })
            .finally(() => navigate('/reservations-management'));
        }}
      />
    </div>
  );
}

export default ReserveItem;

import LibraryAPIService from '@api/LibraryAPI';
import DeleteButton from '@common-components/DeleteButton';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReservesActionButton from './components/ReservesActionButton.tsx';

function ReserveItem({ reserve }: { reserve: Reserve }) {
  const navigate = useNavigate();
  const { removeReserveById, getMaterialById, getUserById } = LibraryAPIService();
  const [material, setMaterial] = useState<Material>({} as Material);
  const [client, setClient] = useState<Client>({} as Client);

  useEffect(() => {
    getMaterialById({ id: reserve.materialId })
      .then(res => setMaterial(res))
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }, [reserve]);

  useEffect(() => {
    getUserById({ id: String(reserve.clientId) })
      .then(res => setClient(res))
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }, [reserve]);

  return (
    <div className='grid grid-cols-10 w-full px-6 gap-4'>
      <div>{reserve.reserveId}</div>
      <div>{material.type_material}</div>
      <div>{reserve.reserveDate.toString().substring(0, 10)}</div>
      <div>{client.name}</div>
      <ReservesActionButton
        onClick={() => {
          navigate(`/loan-management/info/${reserve.reserveId}`);
        }}
      >
        <InfoIcon />
      </ReservesActionButton>
      <ReservesActionButton
        onClick={() => {
          navigate(`/loan-management/update/${reserve.reserveId}`);
        }}
      >
        <EditIcon />
      </ReservesActionButton>
      <DeleteButton
        className='text-center text-2xl'
        type='Loan'
        onClick={() => {
          (async () => {
            await removeReserveById({
              id: reserve.reserveId
            });
          })().catch((error: Error) => {
            throw new Error(error.message);
          });
        }}
      />
    </div>
  );
}

export default ReserveItem;

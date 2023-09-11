import LibraryAPIService from '@api/LibraryAPI';
import Button from '@common-components/Button';
import DeleteButton from '@common-components/DeleteButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FinesItem({ fine }: { fine: Fine }) {
  const navigate = useNavigate();
  const {
    removeFineById,
    getMaterialById,
    getUserById,
    getLoanById,
    updateFineById
  } = LibraryAPIService();
  const [material, setMaterial] = useState<Material>({} as Material);
  const [client, setClient] = useState<Client>({} as Client);
  const [isPaymentDisabled, setIsPaymentDisabled] = useState(fine.paid);

  useEffect(() => {
    async function fetchData() {
      const loanResponse = await getLoanById({ id: Number(fine.loanId) });
      const materialResponse = await getMaterialById({
        id: Number(loanResponse[0].materialId)
      });
      setMaterial(materialResponse);
    }

    fetchData();
  }, [fine]);

  useEffect(() => {
    async function fetchData() {
      const response = await getUserById({ id: String(fine.clientId) });
      setClient(response);
    }

    fetchData();
  }, [fine]);

  return (
    <div className='grid grid-cols-12 w-full px-6 gap-4'>
      <div>{fine.fineId}</div>
      <div className='col-span-2'>{material.type_material}</div>
      <div className='col-span-2'>{material.title}</div>
      <div className='col-span-2'>{client.name}</div>
      <div className='col-span-2'>{Number(fine.debt).toFixed(2)}</div>
      <div
        className='col-span-2 text-white font-roboto-mono font-bold text-lg grid
      place-content-center'
      >
        <Button
          className='bg-[#1B263B] px-8 py-1 rounded-lg'
          onClick={() => {
            if (isPaymentDisabled) return;
            setIsPaymentDisabled(true);
            updateFineById({
              fine: {
                ...fine,
                paid: true
              },
              id: Number(fine.fineId)
            })
              .then()
              .catch((error: Error) => {
                throw new Error(error.message);
              });
          }}
          disabled={isPaymentDisabled}
        >
          Pay
        </Button>
      </div>

      <DeleteButton
        className='text-center text-2xl'
        type='Fine'
        onClick={() => {
          removeFineById({ id: fine.fineId })
            .then()
            .catch((e: Error) => {
              throw new Error(e.message);
            })
            .finally(() => navigate('/fines-management'));
        }}
      />
    </div>
  );
}

export default FinesItem;

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
  const [, setLoan] = useState<Loan>({} as Loan);
  const [isPaymentDisabled, setIsPaymentDisabled] = useState(fine.paid);

  useEffect(() => {
    getLoanById({ id: fine.loanId })
      .then(res => {
        setLoan(res[0]);
        return getMaterialById({ id: res[0]?.materialId });
      })
      .then(res => {
        setMaterial(res);
      })
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }, [fine]);

  useEffect(() => {
    getUserById({ id: String(fine.clientId) })
      .then(res => setClient(res))
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }, [fine]);

  useEffect(() => {
    setIsPaymentDisabled(fine.paid);
  }, [fine]);

  return (
    <div className='grid grid-cols-10 w-full px-6 gap-4'>
      <div>{fine.fineId}</div>
      <div>{material.type_material}</div>
      <div>{material.title}</div>
      <div>{client.name}</div>
      <div>{fine.debt}</div>
      <Button
        className='bg-[#0d1b2a] text-white font-roboto-mono font-bold text-xl py-2 px-8 rounded-xl'
        onClick={() => {
          if (!isPaymentDisabled) {
            setIsPaymentDisabled(true);
            updateFineById({
              fine: {
                fineId: fine.fineId,
                debt: fine.debt,
                createDate: fine.createDate,
                paid: true,
                loanId: fine.loanId,
                clientId: fine.clientId
              },
              id: Number(fine.fineId)
            })
              .then()
              .catch((error: Error) => {
                throw new Error(error.message);
              });
          }
        }}
        disabled={isPaymentDisabled}
      >
        PAY
      </Button>

      <DeleteButton
        className='text-center text-2xl'
        type='Loan'
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

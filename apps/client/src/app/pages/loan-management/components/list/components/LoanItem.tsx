import LibraryAPIService from '@api/LibraryAPI';
import DeleteButton from '@common-components/DeleteButton';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoanActionButton from './components/LoanActionButton';

function LoanItem({ loan }: { loan: Loan }) {
  const navigate = useNavigate();
  const { removeLoanById, getMaterialById, getUserById } = LibraryAPIService();
  const [material, setMaterial] = useState<Material>({} as Material);
  const [client, setClient] = useState<Client>({} as Client);

  useEffect(() => {
    getMaterialById({ id: loan.materialId })
      .then(res => setMaterial(res))
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }, [loan]);

  useEffect(() => {
    getUserById({ id: String(loan.clientId) })
      .then(res => setClient(res))
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }, [loan]);

  return (
    <div className='grid grid-cols-10 w-full px-6 gap-4'>
      <div>{loan.loanId}</div>
      <div>{material.type_material}</div>
      <div>{material.title}</div>
      <div>{client.name}</div>
      <div>{loan.loanDate.toString().substring(0, 10)}</div>
      <div>{loan.returnDate.toString().substring(0, 10)}</div>
      <div>{loan.returned ? 'True' : 'False'}</div>
      <LoanActionButton
        onClick={() => {
          navigate(`/loan-management/info/${loan.loanId}`);
        }}
      >
        <InfoIcon />
      </LoanActionButton>
      <LoanActionButton
        onClick={() => {
          navigate(`/loan-management/update/${loan.loanId}`);
        }}
      >
        <EditIcon />
      </LoanActionButton>
      <DeleteButton
        className='text-center text-2xl'
        type='Loan'
        onClick={() => {
          removeLoanById({ id: loan.loanId })
            .then()
            .catch((e: Error) => {
              throw new Error(e.message);
            })
            .finally(() => navigate('/loan-management'));
        }}
      />
    </div>
  );
}

export default LoanItem;

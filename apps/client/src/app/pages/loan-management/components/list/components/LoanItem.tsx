import LibraryAPIService from '@api/LibraryAPI';
import DeleteButton from '@common-components/DeleteButton';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import LoanActionButton from './components/LoanActionButton';

function LoanItem({ loan }: { loan: Loan }) {
  const navigate = useNavigate();
  const { removeLoanById } = LibraryAPIService();

  return (
    <div className='grid grid-cols-9 w-full px-6 gap-4'>
      <div>{loan.loanId}</div>
      <div>{loan.materialType}</div>
      <div>{loan.title}</div>
      <div>{loan.borrower}</div>
      <div>{loan.dueDate}</div>
      <div>{loan.status ? 'True' : 'False'}</div>
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
          (async () => {
            await removeLoanById({
              id: loan.loanId
            });
          })().catch((error: Error) => {
            throw new Error(error.message);
          });
        }}
      />
    </div>
  );
}

export default LoanItem;

import LibraryAPIService from '@api/LibraryAPI';
import GlobalInfoForm from '@common-components/GlobalInfoForm';
import GlobalText from '@common-components/GlobalText';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowReturnDate from './components/ShowReturnDate';

function InfoLoanPage() {
  const { id } = useParams<InfoLoanPageParams>();
  const { getLoanById, getMaterialById, getUserById } = LibraryAPIService();
  const [loan, setLoan] = useState<Loan>({} as Loan);
  const [material, setMaterial] = useState<Material>({} as Material);
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    getLoanById({ id: Number(id) })
      .then(resp => {
        getMaterialById({ id: Number(resp[0].materialId) })
          .then(materialResponse => setMaterial(materialResponse))
          .catch((error: Error) => {
            throw new Error(error.message);
          });
        getUserById({ id: String(resp[0].clientId) })
          .then(userResponse => setUser(userResponse))
          .catch((error: Error) => {
            throw new Error(error.message);
          });
        setLoan(resp[0]);
      })
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }, []);

  return (
    <GlobalInfoForm title='Loan Info'>
      <div className='flex flex-col gap-7 h-full justify-center w-11/12 p-8 px-24'>
        <GlobalText title='Loan ID:' text={String(loan.loanId)} />
        <GlobalText title='User Name:' text={String(user.name)} />
        <GlobalText title='Material Title:' text={String(material.title)} />
        <GlobalText
          title='Loan Date:'
          text={String(loan.loanDate?.toString().substring(0, 10))}
        />
        <GlobalText
          title='Expirationsss Date:'
          text={String(loan.returnDate?.toString().substring(0, 10))}
        />
        <ShowReturnDate loanId={loan.loanId} />
      </div>
    </GlobalInfoForm>
  );
}

export default InfoLoanPage;

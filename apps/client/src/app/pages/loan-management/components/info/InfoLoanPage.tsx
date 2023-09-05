import LibraryAPIService from '@api/LibraryAPI';
import GlobalInfoForm from '@common-components/GlobalInfoForm';
import GlobalText from '@common-components/GlobalText';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function InfoLoanPage() {
  const { id } = useParams<InfoLoanPageParams>();
  const { getLoanById, getMaterialById, getUserById } = LibraryAPIService();
  const [loan, setLoan] = useState<Loan>({} as Loan);
  const [material, setMaterial] = useState<Material>({} as Material);
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    getLoanById({ id: Number(id) })
      .then(resp => setLoan(resp[0]))
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }, []);

  useEffect(() => {
    getMaterialById({ id: Number(loan.materialId) })
      .then(resp => setMaterial(resp))
      .catch((error: Error) => {
        throw new Error(error.message);
      });
    getUserById({ id: String(loan.clientId) })
      .then(resp => setUser(resp))
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  });
  return (
    <GlobalInfoForm title='Loan Info'>
      <div className='flex flex-col gap-7 h-full justify-center w-11/12 p-14 px-24'>
        <GlobalText title='ID:' text={String(loan.clientId)} />
        <GlobalText title='User' text={String(user.name)} />
        <GlobalText title='Material' text={String(material.title)} />
        <GlobalText title='Loan Date' text={String(loan.loanDate)} />
        <GlobalText title='Return Date' text={String(loan.returnDate)} />
      </div>
    </GlobalInfoForm>
  );
}

export default InfoLoanPage;

import LibraryAPIService from '@api/LibraryAPI';
import GlobalInfoForm from '@common-components/GlobalInfoForm';
import GlobalText from '@common-components/GlobalText';
import HistoryRedirectButton from '@pages/person-management/components/users-list/components/user/components/info/HistoryRedirectButton';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfoPerson from './components/InfoPerson';
import INITIAL_STATE from './states/InfoPersonStates';

function InfoPersonPage() {
  const { id } = useParams<InfoPersonPageParams>();

  const { getUserById, getUserActiveLoansById, getUserTotalReadById } =
    LibraryAPIService();
  const [user, setUser] = useState<User>(INITIAL_STATE);
  const [activeLoans, setActiveLoans] = useState<number>(0);
  const [totalRead, setTotalRead] = useState<number>(0);

  useEffect(() => {
    getUserById({ id: id ?? '-1' })
      .then(resp => setUser(resp))
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }, []);

  useEffect(() => {
    getUserActiveLoansById({ id: user.clientId })
      .then(resp => setActiveLoans(resp))
      .catch((error: Error) => {
        throw new Error(error.message);
      });
    getUserTotalReadById({ id: user.clientId })
      .then(resp => setTotalRead(resp))
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }, [user]);

  return (
    <GlobalInfoForm title='Person Info'>
      <div className='grid grid-cols-5 w-full p-14 px-24'>
        <div className='col-span-4 flex flex-col gap-4 h-full justify-center w-11/12'>
          <GlobalText title='Name:' text={user.name} />
          <GlobalText title='Last Name:' text={user.lastName} />
          <GlobalText title='Email:' text={user.email} />
          <GlobalText title='Type:' text={user.typeUser} />
          <GlobalText title='Phone Number:' text={String(user.phoneNumber)} />
          <GlobalText title='Address:' text={user.address} />
        </div>
        <div className='col-span-1 flex flex-col gap-15 h-full justify-between '>
          <InfoPerson title='Read' number={totalRead} />
          <InfoPerson title='Loans' number={activeLoans} />
          <InfoPerson title='Reservations' number={0} />
          <InfoPerson title='Total Fine' number={0} isDouble />
          <HistoryRedirectButton
            path='/loan-management/loan-history'
            text='Loan History'
            id={String(id)}
          />
          <HistoryRedirectButton
            path='/fines-management/fine-history'
            text='Fines History'
            id={String(id)}
          />
        </div>
      </div>
    </GlobalInfoForm>
  );
}

export default InfoPersonPage;

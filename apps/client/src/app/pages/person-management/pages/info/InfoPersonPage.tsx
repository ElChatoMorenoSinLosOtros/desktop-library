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

  const { getUserById, getClientMoreInfo } = LibraryAPIService();
  const [user, setUser] = useState<User>(INITIAL_STATE);
  const [clientMoreInfo, setClientMoreInfo] = useState<ClientMoreInfo>(
    {} as ClientMoreInfo
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const userResponse = await getUserById({ id: String(id) });
      const moreUserInfoResponse = await getClientMoreInfo({ id: Number(id) });
      setUser(userResponse);
      setClientMoreInfo(moreUserInfoResponse);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div>
      {!isLoading && (
        <GlobalInfoForm title='Person Info'>
          <div className='grid grid-cols-5 w-full p-14 px-24'>
            <div className='col-span-4 flex flex-col gap-4 h-full justify-center w-11/12'>
              <GlobalText title='Name:' text={user.name} />
              <GlobalText title='Last Name:' text={user.lastName} />
              <GlobalText title='Email:' text={user.email} />
              <GlobalText title='Type:' text={user.typeUser} />
              <GlobalText
                title='Phone Number:'
                text={String(user.phoneNumber)}
              />
              <GlobalText title='Address:' text={user.address} />
            </div>
            <div className='col-span-1 flex flex-col gap-15 h-full justify-between '>
              <InfoPerson title='Read' number={clientMoreInfo.totalRead} />
              <InfoPerson
                title='Loans'
                number={clientMoreInfo.totalActiveLoans}
              />
              <InfoPerson
                title='Reservations'
                number={clientMoreInfo.totalReserves}
              />
              <InfoPerson
                title='Total Fine'
                number={clientMoreInfo.totalFine}
                isDouble
              />
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
      )}
    </div>
  );
}

export default InfoPersonPage;

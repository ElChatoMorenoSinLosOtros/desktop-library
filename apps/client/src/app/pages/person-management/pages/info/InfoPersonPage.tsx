import LibraryAPIService from '@api/LibraryAPI';
import GlobalInfoForm from '@common-components/GlobalInfoForm';
import GlobalText from '@common-components/GlobalText';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfoPerson from './components/InfoPerson';
import INITIAL_STATE from './states/InfoPersonStates';

function InfoPersonPage() {
  const { id } = useParams<InfoPersonPageParams>();

  const { getUserById } = LibraryAPIService();
  const [user, setUser] = useState<User>(INITIAL_STATE);

  useEffect(() => {
    getUserById({ id: id ?? '-1' })
      .then(resp => setUser(resp))
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }, []);

  return (
    <GlobalInfoForm title='Person Info'>
      <div className='grid grid-cols-5 w-full p-14 px-24'>
        <div className='col-span-4 flex flex-col gap-7 h-full justify-center w-11/12'>
          <GlobalText title='Name:' text={user.name} />
          <GlobalText title='Last Name:' text={user.lastName} />
          <GlobalText title='Email:' text={user.email} />
          <GlobalText title='Type:' text={user.typeUser} />
          <GlobalText title='Phone Number:' text={String(user.phoneNumber)} />
          <GlobalText title='Address:' text={user.address} />
        </div>
        <div className='col-span- flex flex-col gap-14 h-full justify-between '>
          <InfoPerson title='Read' number={0} />
          <InfoPerson title='Loans' number={0} />
          <InfoPerson title='Reservations' number={0} />
          <InfoPerson title='Total Fine' number={0} isDouble />
        </div>
      </div>
    </GlobalInfoForm>
  );
}

export default InfoPersonPage;

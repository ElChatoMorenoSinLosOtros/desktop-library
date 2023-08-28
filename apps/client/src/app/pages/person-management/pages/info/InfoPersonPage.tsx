import LibraryAPIService from '@api/LibraryAPI';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

  return <div>{JSON.stringify(user)}</div>;
}

export default InfoPersonPage;

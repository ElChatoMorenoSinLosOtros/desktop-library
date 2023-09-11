import LibraryAPIService from '@api/LibraryAPI';
import GlobalList from '@common-components/GlobalList';
import Line from '@common-components/Line';
import { useEffect, useState } from 'react';
import PersonsHeader from './components/header/PersonsHeader';
import UserFields from './components/user-fields/UserFields';
import UsersList from './components/users-list/UsersList';

function PersonManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [initState, setInitState] = useState<User[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { getUsers } = LibraryAPIService();

  useEffect(() => {
    async function fetchUsers() {
      const resp = await getUsers();
      setUsers(resp);
      setInitState(resp);
      setIsLoaded(true);
    }

    fetchUsers();
  }, []);

  return (
    <GlobalList title='Person Management'>
      {isLoaded && (
        <>
          <PersonsHeader setUsers={setUsers} initState={initState} />
          <Line />
          <UserFields />
          <Line />
          <UsersList users={users} />
        </>
      )}
    </GlobalList>
  );
}

export default PersonManagementPage;

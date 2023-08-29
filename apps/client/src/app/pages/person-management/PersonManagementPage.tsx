import LibraryAPIService from '@api/LibraryAPI';
import GlobalList from '@common-components/GlobalList';
import Line from '@common-components/Line';
import { useEffect, useState } from 'react';
import PersonsHeader from './components/header/PersonsHeader';
import UserFields from './components/user-fields/UserFields';
import UsersList from './components/users-list/UsersList';

function PersonManagementPage() {
  const [users, setUsers] = useState<User[]>([]);

  const { getUsers } = LibraryAPIService();

  useEffect(() => {
    getUsers()
      .then(resp => setUsers(resp))
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }, []);

  return (
    <GlobalList title='Person Management'>
      <PersonsHeader />
      <Line />
      <UserFields />
      <Line />
      <UsersList users={users} />
    </GlobalList>
  );
}

export default PersonManagementPage;

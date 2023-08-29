import DeletePersonsButton from './components/delete/DeletePersonsButton';
import InfoUserButton from './components/info/InfoUserButton';
import UpdateUserButton from './components/update/UpdateUserButton';

function UserItemList({ user }: { user: User }) {
  return (
    <div className='grid grid-cols-9 w-full px-6 gap-4'>
      <div>{user.clientId}</div>
      <div>{user.name}</div>
      <div>{user.lastName}</div>
      <div>{user.typeUser}</div>
      <div className='col-span-2 underline'>{user.email}</div>
      <InfoUserButton id={user.clientId} />
      <UpdateUserButton id={user.clientId} />
      <DeletePersonsButton id={user.clientId} />
    </div>
  );
}

export default UserItemList;

import UserItemList from './components/user/UserItemList';

function UsersList({ users }: { users: User[] }) {
  return (
    <div
      className={`max-h-full overflow-auto mt-2 ${
        users.length > 9 ? 'mr-[-17px]' : ''
      }`}
    >
      <div
        className='max-h-full flex flex-col
        font-roboto-mono text-sm font-bold w-full gap-y-10'
      >
        {users.map((user: User) => {
          return <UserItemList key={user.clientId} user={user} />;
        })}
      </div>
    </div>
  );
}

export default UsersList;

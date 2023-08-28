import UserItemList from './components/user/UserItemList';

function UsersList({ users }: { users: User[] }) {
  return (
    <div
      className={`max-h-[550px] overflow-auto mt-4 ${
        users.length > 9 ? 'mr-[-15px]' : ''
      }`}
    >
      <div
        className='max-h-[550px] flex flex-col
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

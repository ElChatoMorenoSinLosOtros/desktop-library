import AdminCard from './components/AdminCard';

function AdminList({ admins }: { admins: SubAdmin[] }) {
  return (
    <div
      className={`h-full overflow-auto mt-2 ${
        admins.length > 9 ? 'mr-[-17px]' : ''
      }`}
    >
      <div
        className='h-full flex flex-col
      font-roboto-mono text-sm font-bold w-full gap-y-10'
      >
        {admins
          // .filter(admin => admin.role !== 'admin')
          .map((admin: SubAdmin) => {
            return <AdminCard key={admin.adminId} admin={admin} />;
          })}
      </div>
    </div>
  );
}

export default AdminList;

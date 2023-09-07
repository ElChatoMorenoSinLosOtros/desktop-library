import DashboardItem from './components/DashboardItem';

function DashboardList({ notifies }: { notifies: Notify[] }) {
  return (
    <div
      className={`h-full overflow-auto mt-2 ${
        notifies.length > 9 ? 'mr-[-17px]' : ''
      }`}
    >
      <div
        className='h-full flex flex-col
      font-roboto-mono text-sm font-bold w-full gap-y-10'
      >
        {notifies.map((notify: Notify) => {
          return <DashboardItem key={notify.notifyId} notify={notify} />;
        })}
      </div>
    </div>
  );
}

export default DashboardList;

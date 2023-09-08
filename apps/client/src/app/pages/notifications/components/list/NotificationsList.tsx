import NotificationsItem from './components/NotificationsItem';

function NotificationsList({ notifies }: { notifies: Notify[] }) {
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
          return <NotificationsItem key={notify.notifyId} notify={notify} />;
        })}
      </div>
    </div>
  );
}

export default NotificationsList;

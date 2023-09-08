import NotificationsItem from './components/NotificationsItem';

function NotificationsList({
  notifies,
  loading
}: {
  notifies: Notify[];
  loading: boolean;
}) {
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
        {!loading &&
          notifies.map((notify: Notify) => {
            return (
              <NotificationsItem key={notify.notificationId} notify={notify} />
            );
          })}
      </div>
    </div>
  );
}

export default NotificationsList;

import LibraryAPIService from '@api/LibraryAPI';
import DeleteButton from '@common-components/DeleteButton';
import { useNavigate } from 'react-router-dom';

function NotificationsItem({ notify }: { notify: Notify }) {
  const { removeNotificationById } = LibraryAPIService();
  const navigate = useNavigate();

  return (
    <div className='grid grid-cols-12 w-full px-6 gap-4'>
      <div>{notify.notificationId}</div>
      <div className='col-span-3'>{notify.notificationName}</div>
      <div className='col-span-2'>{notify.notificationType}</div>
      <div className='col-span-2'>
        {notify.notificationDate.toString().substring(0, 10)}
      </div>
      <div className='col-span-3'>{notify.notificationContent}</div>
      <DeleteButton
        onClick={() => {
          removeNotificationById({ id: notify.notificationId })
            .then()
            .catch((e: Error) => {
              throw new Error(e.message);
            })
            .finally(() => navigate('/notifications'));
        }}
        className='text-center text-2xl grid place-content-center ml-3'
        type='Notification'
      />
    </div>
  );
}

export default NotificationsItem;

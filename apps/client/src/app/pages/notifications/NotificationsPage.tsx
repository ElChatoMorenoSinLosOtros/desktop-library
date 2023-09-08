import LibraryAPIService from '@api/LibraryAPI';
import GlobalList from '@common-components/GlobalList.tsx';
import Line from '@common-components/Line.tsx';
import { useEffect, useState } from 'react';
import NotificationsFields from './components/NotificationsFields';
import NotificationsList from './components/list/NotificationsList';

function NotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [notifies, setNotifies] = useState<Notify[]>([]);
  const { getAllNotifications } = LibraryAPIService();

  useEffect(() => {
    async function fetch() {
      const response = await getAllNotifications();
      setNotifies(response);
      setLoading(false);
    }
    fetch();
  }, []);

  return (
    <GlobalList title='Notifications Management'>
      <NotificationsFields />
      <Line />
      <NotificationsList notifies={notifies} loading={loading} />
    </GlobalList>
  );
}

export default NotificationsPage;

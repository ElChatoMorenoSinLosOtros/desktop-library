import GlobalList from '@common-components/GlobalList.tsx';
import Line from '@common-components/Line.tsx';
import NotificationsFields from './components/NotificationsFields';
import NotificationsHeader from './components/hearder/NotificationsHearder';
import NotificationsList from './components/list/NotificationsList';

function DashboardPage() {
  const notifies: Notify[] = [
    {
      notifyId: 1,
      name: 'Loan 1',
      type: 'Personal Loan',
      date: new Date('2023-09-06'),
      information:
        'The deadline to return he Game of Thrones,  the user ID has not been returned.'
    },
    {
      notifyId: 2,
      name: 'Loan 2',
      type: 'Mortgage',
      date: '2023-09-10',
      information:
        'The deadline to return he Game of Thrones,  the user ID has not been returned.'
    },
    {
      notifyId: 3,
      name: 'Loan 3',
      type: 'Car Loan',
      date: new Date('2023-09-15'),
      information:
        'The deadline to return he Game of Thrones,  the user ID has not been returned.'
    }
  ];

  return (
    <GlobalList title='Dashboard'>
      <NotificationsHeader />
      <Line />
      <NotificationsFields />
      <Line />
      <NotificationsList notifies={notifies} />
    </GlobalList>
  );
}

export default DashboardPage;

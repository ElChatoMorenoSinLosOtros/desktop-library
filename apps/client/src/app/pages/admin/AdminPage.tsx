import LibraryAPIService from '@api/LibraryAPI';
import GlobalList from '@common-components/GlobalList';
import Line from '@common-components/Line';
import { useEffect, useState } from 'react';
import AdminFields from './components/AdminFields';
import AdminHeader from './components/AdminHeader';
import AdminList from './components/AdminList';

function AdminPage() {
  const { getAdmins } = LibraryAPIService();
  const [admins, setAdmins] = useState<SubAdmin[]>([]);
  useEffect(() => {
    async function loadData() {
      const response = await getAdmins();
      setAdmins(response);
    }

    loadData();
  }, []);

  return (
    <GlobalList title='Admin Management'>
      <AdminHeader />
      <Line />
      <AdminFields />
      <Line />
      <AdminList admins={admins} />
    </GlobalList>
  );
}

export default AdminPage;

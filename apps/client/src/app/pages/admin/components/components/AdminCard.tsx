import LibraryAPIService from '@api/LibraryAPI';
import DeleteButton from '@common-components/DeleteButton';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import AdminActionButton from './AdminActionButton';

function AdminCard({ admin }: { admin: SubAdmin }) {
  const navigate = useNavigate();
  const { removeAdminById } = LibraryAPIService();

  return (
    <div className='grid grid-cols-9 w-full px-6 gap-4'>
      <div>{admin.adminId}</div>
      <div className='col-span-2 underline'>{admin.email}</div>
      <div>{admin.name}</div>
      <div>{admin.role}</div>
      <div>{admin.actions.menu.length}</div>
      <AdminActionButton
        onClick={() => {
          navigate(`/admin/info/${admin.adminId}`);
        }}
      >
        <InfoIcon />
      </AdminActionButton>
      <AdminActionButton
        onClick={() => {
          navigate(`/admin/update/${admin.adminId}`);
        }}
      >
        <EditIcon />
      </AdminActionButton>
      <DeleteButton
        className='text-center text-2xl'
        type='Admin'
        onClick={() => {
          removeAdminById({ id: admin.adminId })
            .then()
            .catch((e: Error) => {
              throw new Error(e.message);
            })
            .finally(() => navigate('/admin'));
        }}
      />
    </div>
  );
}

export default AdminCard;

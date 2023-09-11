import LibraryAPIService from '@api/LibraryAPI';
import DeleteButton from '@common-components/DeleteButton';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import MaterialActionButton from './components/MaterialActionButton';

function MaterialItem({ material }: { material: Material }) {
  const navigate = useNavigate();
  const { removeMaterialById } = LibraryAPIService();

  return (
    <div className='grid grid-cols-11 w-full px-6 gap-4'>
      <div>{material.materialId}</div>
      <div className='col-span-2'>{material.title}</div>
      <div className='col-span-2'>{material.category}</div>
      <div>{material.quantity}</div>
      <div>{material.available ? 'True' : 'False'}</div>
      <div>{material.type_material}</div>
      <MaterialActionButton
        onClick={() => {
          navigate(`/material-management/info/${material.materialId}`);
        }}
      >
        <InfoIcon />
      </MaterialActionButton>
      <MaterialActionButton
        onClick={() => {
          navigate(`/material-management/update/${material.materialId}`);
        }}
      >
        <EditIcon />
      </MaterialActionButton>
      <DeleteButton
        className='text-center text-2xl'
        type='Material'
        onClick={() => {
          removeMaterialById({ id: material.materialId })
            .then()
            .catch((e: Error) => {
              throw new Error(e.message);
            })
            .finally(() => navigate('/material-management'));
        }}
      />
    </div>
  );
}

export default MaterialItem;

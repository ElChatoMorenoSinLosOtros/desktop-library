import LibraryAPIService from '@api/LibraryAPI';
import GlobalList from '@common-components/GlobalList';
import Line from '@common-components/Line';
import { useEffect, useState } from 'react';
import MaterialFields from './components/fields/MaterialFields';
import MaterialHeader from './components/header/MaterialHeader';
import MaterialList from './components/list/MaterialList';

function MaterialManagementPage() {
  const { getMaterials } = LibraryAPIService();
  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    getMaterials()
      .then(res => setMaterials(res))
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }, []);

  return (
    <GlobalList title='Materials Management'>
      <MaterialHeader />
      <Line />
      <MaterialFields />
      <Line />
      <MaterialList materials={materials} />
    </GlobalList>
  );
}

export default MaterialManagementPage;

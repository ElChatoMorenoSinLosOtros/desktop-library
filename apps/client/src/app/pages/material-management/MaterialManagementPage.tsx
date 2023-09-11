import LibraryAPIService from '@api/LibraryAPI';
import GlobalList from '@common-components/GlobalList';
import Line from '@common-components/Line';
import { useEffect, useState } from 'react';
import MaterialFields from './components/fields/MaterialFields';
import MaterialHeader from './components/header/MaterialHeader';
import MaterialList from './components/list/MaterialList';

function MaterialManagementPage() {
  const { getMaterials } = LibraryAPIService();
  const [materials, setMaterials] = useState<Material[]>([] as Material[]);
  const [loading, setLoading] = useState<boolean>(true);
  const [initState, setInitState] = useState<Material[]>([] as Material[]);

  useEffect(() => {
    async function fetchData() {
      const resp = await getMaterials();
      setMaterials(resp);
      setInitState(resp);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <GlobalList title='Materials Management'>
      {!loading && (
        <>
          <MaterialHeader setMaterials={setMaterials} materials={initState} />
          <Line />
          <MaterialFields />
          <Line />
          <MaterialList materials={materials} />
        </>
      )}
    </GlobalList>
  );
}

export default MaterialManagementPage;

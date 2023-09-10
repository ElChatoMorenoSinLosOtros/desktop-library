import LibraryAPIService from '@api/LibraryAPI';
import GlobalInfoForm from '@common-components/GlobalInfoForm';
import GlobalText from '@common-components/GlobalText';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function InfoReservePage() {
  const { id } = useParams<InfoReservePageParams>();
  const { getReserveById, getMaterialById, getUserById } = LibraryAPIService();
  const [reserve, setReserve] = useState<Reserve>({} as Reserve);
  const [material, setMaterial] = useState<Material>({} as Material);
  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const reserveResponse = await getReserveById({ id: Number(id) });
      setReserve(reserveResponse);
      const materialResponse = await getMaterialById({
        id: reserveResponse.materialId
      });
      setMaterial(materialResponse);
      const userResponse = await getUserById({
        id: String(reserveResponse.clientId)
      });
      setUser(userResponse);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div>
      {!isLoading && (
        <GlobalInfoForm title='Reserves Management' subTitle='Reserve Info'>
          <div className='flex flex-col gap-7 h-full justify-center w-11/12 p-14 px-24 mb-28'>
            <GlobalText title='Client name:' text={String(user.name)} />
            <GlobalText title='Material Title:' text={String(material.title)} />
            <GlobalText
              title='Reserve Date:'
              text={String(reserve.reserveDate?.toString().substring(0, 10))}
            />
            <GlobalText
              title='Return Date:'
              text={String(reserve.returnDate?.toString().substring(0, 10))}
            />
          </div>
        </GlobalInfoForm>
      )}
    </div>
  );
}

export default InfoReservePage;

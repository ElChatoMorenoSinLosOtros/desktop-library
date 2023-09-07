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

  useEffect(() => {
    getReserveById({ id: Number(id) })
      .then(resp => {
        getMaterialById({ id: Number(resp[0].materialId) })
          .then(materialResponse => setMaterial(materialResponse))
          .catch((error: Error) => {
            throw new Error(error.message);
          });
        getUserById({ id: String(resp[0].clientId) })
          .then(userResponse => setUser(userResponse))
          .catch((error: Error) => {
            throw new Error(error.message);
          });
        setReserve(resp[0]);
      })
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }, []);

  return (
    <GlobalInfoForm title='Reserve Info'>
      <div className='flex flex-col gap-7 h-full justify-center w-11/12 p-14 px-24'>
        <GlobalText title='Reserve ID:' text={String(reserve.reserveId)} />
        <GlobalText title='Material Type:' text={String(material.type_material)} />
        <GlobalText title='Reserve Date:' text={String(reserve.reserveDate?.toString().substring(0, 10))} />
        <GlobalText
          title='Reserved By:'
          text={String(user.name)}
        />
      </div>
    </GlobalInfoForm>
  );
}

export default InfoReservePage;

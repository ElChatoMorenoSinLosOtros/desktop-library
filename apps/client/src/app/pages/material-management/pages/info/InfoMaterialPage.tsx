import LibraryAPIService from '@api/LibraryAPI';
import GlobalButton from '@common-components/GlobalButton';
import GlobalInfoForm from '@common-components/GlobalInfoForm';
import GlobalText from '@common-components/GlobalText';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function InfoMaterialPage() {
  const { id } = useParams<InfoMaterialPageParams>();
  const navigate = useNavigate();
  const { getMaterialById } = LibraryAPIService();
  const [material, setMaterial] = useState<Material>({} as Material);

  useEffect(() => {
    getMaterialById({ id: Number(id) })
      .then(resp => setMaterial(resp))
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }, []);

  return (
    <GlobalInfoForm title='Material Info'>
      <div className='flex flex-col p-14 px-24 gap-6 w-full h-full'>
        <div className='flex w-3/5 gap-5 justify-between'>
          <GlobalText
            title='Material Type:'
            text={material.type_material}
            className='w-full'
          />
          <GlobalText
            title='Available:'
            text={material.available ? 'True' : 'False'}
            className='w-full'
          />
        </div>
        <div className='grid w-full justify-between grid-cols-5'>
          <GlobalText
            title='Title:'
            text={material.title}
            className='col-span-3'
          />
          <GlobalText
            title='Page Count:'
            text={String(material.pageCount)}
            className='ml-5 col-span-2'
          />
        </div>
        <GlobalText title='Author:' text={material.author} className='w-3/5' />
        <GlobalText
          title='Category:'
          text={material.category}
          className='w-3/5'
        />
        <GlobalText title='ISBN:' text={material.isbn} className='w-3/5' />
        <GlobalText
          title='Publication Year:'
          text={String(material.publicationYear)}
          className='w-3/5'
        />
        <div className='flex flex-col absolute bottom-0 right-0 mr-16 mb-16 gap-6'>
          <GlobalButton
            onClick={() => {
              navigate('/loan-management/add');
            }}
          >
            Loan
          </GlobalButton>
          <GlobalButton
            onClick={() => {
              navigate('/reservations-management/add');
            }}
          >
            Reservation
          </GlobalButton>
        </div>
      </div>
    </GlobalInfoForm>
  );
}

export default InfoMaterialPage;

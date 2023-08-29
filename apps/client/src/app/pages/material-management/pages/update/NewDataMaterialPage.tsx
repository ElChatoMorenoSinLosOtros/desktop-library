import LibraryAPIService from '@api/LibraryAPI';
import GlobalForm from '@common-components/GlobalFrom';
import GlobalSubmitButton from '@common-components/GlobalSubmitButton';
import GlobalTextField from '@common-components/GlobalTextField';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import INIT_STATE from './states/NewDataMaterialStates';

function NewDataMaterialPage() {
  const { id } = useParams<NewDataMaterialPageParams>();
  const [material, setMaterial] = useState<Material>(INIT_STATE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getMaterialById, updateMaterialById } = LibraryAPIService();
  const navigate = useNavigate();

  useEffect(() => {
    getMaterialById({ id: Number(id) })
      .then(res => {
        setMaterial(res);
        setIsLoading(true);
      })
      .catch((error: Error) => {
        throw new Error(error.message);
      });
    setIsLoading(true);
  }, []);

  return (
    <div>
      {isLoading && (
        <GlobalForm title='Material Management' subTitle='New Material'>
          <Formik
            initialValues={{
              title: `${material.title}`,
              author: `${material.author}`,
              category: `${material.category}`,
              isbn: `${material.isbn}`,
              publicationYear: Number(String(material.publicationYear)),
              pageCount: Number(String(material.pageCount)),
              quantity: Number(String(material.quantity)),
              available: material.available,
              type_material: `${material.type_material}`
            }}
            enableReinitialize
            onSubmit={(values: MaterialWithOutID) => {
              updateMaterialById({ id: Number(id), material: values })
                .then()
                .catch((error: Error) => {
                  throw new Error(error.message);
                })
                .finally(() => {
                  navigate('/material-management');
                });
            }}
          >
            <Form className='mx-16 grid grid-cols-2 gap-16'>
              <GlobalTextField title='New Title:' name='title' />
              <GlobalTextField title='New Author:' name='author' />
              <GlobalTextField title='New Category:' name='category' />
              <GlobalTextField title='New ISBN:' name='isbn' />
              <GlobalTextField
                title='New Publication Year:'
                name='publicationYear'
                type='number'
              />
              <GlobalTextField
                title='New Page Count:'
                name='pageCount'
                type='number'
              />
              <GlobalTextField
                title='New Quantity:'
                name='quantity'
                type='number'
              />
              <GlobalTextField
                title='New Material Type:'
                name='type_material'
              />
              <GlobalSubmitButton className='absolute right-0 bottom-0 mb-12 mr-12'>
                Update
              </GlobalSubmitButton>
            </Form>
          </Formik>
        </GlobalForm>
      )}
    </div>
  );
}

export default NewDataMaterialPage;

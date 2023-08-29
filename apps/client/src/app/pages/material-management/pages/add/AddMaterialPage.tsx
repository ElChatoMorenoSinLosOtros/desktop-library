import LibraryAPIService from '@api/LibraryAPI';
import GlobalForm from '@common-components/GlobalFrom';
import GlobalSubmitButton from '@common-components/GlobalSubmitButton';
import GlobalTextField from '@common-components/GlobalTextField';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

function AddMaterialPage() {
  const { createMaterial } = LibraryAPIService();
  const navigate = useNavigate();

  return (
    <GlobalForm title='Material Management' subTitle='Add Material'>
      <Formik
        initialValues={{
          title: '',
          author: '',
          category: '',
          isbn: '',
          publicationYear: 0,
          pageCount: 0,
          quantity: 0,
          available: true,
          type_material: ''
        }}
        onSubmit={(values: MaterialWithOutID) => {
          createMaterial({ material: values })
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
          <GlobalTextField title='Title:' name='title' />
          <GlobalTextField title='Author:' name='author' />
          <GlobalTextField title='Category:' name='category' />
          <GlobalTextField title='ISBN:' name='isbn' />
          <GlobalTextField
            title='Publication Year:'
            name='publicationYear'
            type='number'
          />
          <GlobalTextField title='Page Count:' name='pageCount' type='number' />
          <GlobalTextField title='Quantity:' name='quantity' type='number' />
          <GlobalTextField title='Material Type:' name='type_material' />
          <GlobalSubmitButton className='absolute right-0 bottom-0 mb-12 mr-12'>
            Add
          </GlobalSubmitButton>
        </Form>
      </Formik>
    </GlobalForm>
  );
}

export default AddMaterialPage;

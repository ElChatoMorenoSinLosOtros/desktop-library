import GlobalForm from '@common-components/GlobalFrom';
import GlobalSubmitButton from '@common-components/GlobalSubmitButton';
import GlobalTextField from '@common-components/GlobalTextField';
import { Form, Formik } from 'formik';

function NewDataMaterialPage() {
  return (
    <GlobalForm title='Material Management' subTitle='New Material'>
      <Formik
        initialValues={{
          name: '',
          lastName: '',
          email: '',
          type: '',
          phone: '',
          address: ''
        }}
        onSubmit={() => {
          // TODO: Add new material data - endpoint
        }}
      >
        <Form className='mx-16 grid grid-cols-2 gap-16'>
          <GlobalTextField title='New Title:' name='title' />
          <GlobalTextField title='New Author:' name='author' />
          <GlobalTextField title='New Category:' name='category' />
          <GlobalTextField title='Update Material Type:' name='materialType' />
          <GlobalTextField
            title='New Publication Year:'
            name='publicationYear'
            type='date'
          />
          <GlobalTextField title='New Page Count:' name='pageCount' />
          <GlobalTextField title='New ISBN:' name='isbn' />
          <GlobalSubmitButton className='absolute right-0 bottom-0 mb-12 mr-12'>
            Update
          </GlobalSubmitButton>
        </Form>
      </Formik>
    </GlobalForm>
  );
}

export default NewDataMaterialPage;

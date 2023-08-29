import GlobalForm from '@common-components/GlobalFrom';
import GlobalSubmitButton from '@common-components/GlobalSubmitButton';
import GlobalTextField from '@common-components/GlobalTextField';
import { Form, Formik } from 'formik';

function AddMaterialPage() {
  return (
    <GlobalForm title='Material Management' subTitle='Add Material'>
      <Formik
        initialValues={{
          title: '',
          author: '',
          category: '',
          materialType: '',
          publicationYear: '',
          pageCount: '',
          isbn: ''
        }}
        onSubmit={() => {
          // TODO: Add new material - endpoint
        }}
      >
        <Form className='mx-16 grid grid-cols-2 gap-16'>
          <GlobalTextField title='Title:' name='title' />
          <GlobalTextField title='Author:' name='author' />
          <GlobalTextField title='Category:' name='category' />
          <GlobalTextField title='Material Type:' name='materialType' />
          <GlobalTextField
            title='Publication Year:'
            name='publicationYear'
            type='date'
          />
          <GlobalTextField title='Page Count:' name='pageCount' />
          <GlobalTextField title='ISBN:' name='isbn' />
          <GlobalSubmitButton className='absolute right-0 bottom-0 mb-12 mr-12'>
            Add
          </GlobalSubmitButton>
        </Form>
      </Formik>
    </GlobalForm>
  );
}

export default AddMaterialPage;

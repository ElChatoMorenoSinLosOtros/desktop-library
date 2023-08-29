import GlobalForm from '@common-components/GlobalFrom';
import GlobalSubmitButton from '@common-components/GlobalSubmitButton';
import GlobalTextField from '@common-components/GlobalTextField';
import { Form, Formik } from 'formik';

function MaterialInfoPage() {
  return (
    <GlobalForm title='Material Management' subTitle='Details'>
      <Formik
        initialValues={{
          materialType: '',
          availability: '',
          title: '',
          author: '',
          category: '',
          isbn: '',
          publicationYear: '',
          pageCount: ''
        }}
        onSubmit={() => {
          // TODO: Show material info - endpoint
        }}
      >
        <Form className=''>
          <div className='mx-16 grid grid-cols-2 gap-5'>
            <GlobalTextField title='MaterialType:' name='materialType' />
            <GlobalTextField title='Availability:' name='availability' />
            <GlobalTextField title='Title:' name='title' />
            <GlobalTextField title='Page Count:' name='pageCount' />
          </div>
          <div className='w-3/5 ml-16 flex flex-col gap-5'>
            <GlobalTextField title='Author:' name='author' />
            <GlobalTextField title='Category:' name='category' />
            <GlobalTextField title='ISBN:' name='isbn' />
            <GlobalTextField
              title='Publication Year:'
              name='publicationYear'
              type='date'
            />
          </div>
          <GlobalSubmitButton className='absolute right-0 bottom-130 mb-12 mr-12'>
            Loan
          </GlobalSubmitButton>
          <GlobalSubmitButton className='absolute right-0 bottom-0 mb-12 mr-12'>
            Reservation
          </GlobalSubmitButton>
        </Form>
      </Formik>
    </GlobalForm>
  );
}

export default MaterialInfoPage;

import GlobalForm from '@common-components/GlobalFrom';
import GlobalSubmitButton from '@common-components/GlobalSubmitButton';
import GlobalTextField from '@common-components/GlobalTextField';
import { Form, Formik } from 'formik';

function NewDataPersonPage() {
  return (
    <GlobalForm title='Person Management' subTitle='New Data'>
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
          // TODO: Update Person Data - endpoint
        }}
      >
        <Form className='w-3/5 ml-36 flex flex-col gap-5'>
          <GlobalTextField title='New Name:' name='name' />
          <GlobalTextField title='New Last Name:' name='lastName' />
          <GlobalTextField title='New Email:' name='email' type='email' />
          <GlobalTextField title='New Type:' name='type' />
          <GlobalTextField title='New Phone Number:' name='phone' />
          <GlobalTextField title='New Address:' name='address' />
          <GlobalSubmitButton className='absolute right-0 bottom-0 mb-12 mr-12'>
            Update
          </GlobalSubmitButton>
        </Form>
      </Formik>
    </GlobalForm>
  );
}

export default NewDataPersonPage;

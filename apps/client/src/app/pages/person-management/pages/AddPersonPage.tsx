import GlobalForm from '@common-components/GlobalFrom';
import GlobalSubmitButton from '@common-components/GlobalSubmitButton';
import GlobalTextField from '@common-components/GlobalTextField';
import { Form, Formik } from 'formik';

function AddPersonPage() {
  return (
    <GlobalForm title='Person Management' subTitle='Add Person'>
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
          // TODO: Add new person - endpoint
        }}
      >
        <Form className='w-3/5 ml-36 flex flex-col gap-5'>
          <GlobalTextField title='Name:' name='name' />
          <GlobalTextField title='Last Name:' name='lastName' />
          <GlobalTextField title='Email:' name='email' type='email' />
          <GlobalTextField title='Type:' name='type' />
          <GlobalTextField title='Phone Number:' name='phone' />
          <GlobalTextField title='Address:' name='address' />
          <GlobalSubmitButton className='absolute right-0 bottom-0 mb-12 mr-12'>
            Add
          </GlobalSubmitButton>
        </Form>
      </Formik>
    </GlobalForm>
  );
}

export default AddPersonPage;

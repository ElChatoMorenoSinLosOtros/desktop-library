import LibraryAPIService from '@api/LibraryAPI';
import GlobalForm from '@common-components/GlobalFrom';
import GlobalSubmitButton from '@common-components/GlobalSubmitButton';
import GlobalTextField from '@common-components/GlobalTextField';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

function AddPersonPage() {
  const { createUser } = LibraryAPIService();
  const navigate = useNavigate();

  return (
    <GlobalForm title='Person Management' subTitle='Add Person'>
      <Formik
        initialValues={{
          name: '',
          lastName: '',
          address: '',
          email: '',
          phoneNumber: 0,
          typeUser: ''
        }}
        onSubmit={(values: Client) => {
          createUser({ client: values })
            .then()
            .catch((error: Error) => {
              throw new Error(error.message);
            });
          navigate('/person-management');
        }}
      >
        <Form className='w-3/5 ml-36 flex flex-col gap-5'>
          <GlobalTextField title='Name:' name='name' />
          <GlobalTextField title='Last Name:' name='lastName' />
          <GlobalTextField title='Email:' name='email' type='email' />
          <GlobalTextField title='Type:' name='typeUser' />
          <GlobalTextField
            title='Phone Number:'
            name='phoneNumber'
            type='number'
          />
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

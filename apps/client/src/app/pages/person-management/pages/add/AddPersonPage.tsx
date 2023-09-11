import LibraryAPIService from '@api/LibraryAPI';
import ErrorPopup from '@common-components/ErrorPopup';
import GlobalForm from '@common-components/GlobalFrom';
import GlobalSubmitButton from '@common-components/GlobalSubmitButton';
import GlobalTextField from '@common-components/GlobalTextField';
import { validatePhoneNumber } from '@services/regexService';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddPersonPage() {
  const { createUser } = LibraryAPIService();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

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
        onSubmit={async (values: Client) => {
          try {
            if (
              values.typeUser !== 'Teacher' &&
              values.typeUser !== 'Student'
            ) {
              setError('Type user must be Teacher or Student');
              return;
            }
            await validatePhoneNumber(values.phoneNumber.toString());
            await createUser({ client: values });

            navigate('/person-management');
          } catch (err) {
            if (!(err instanceof Error)) return;
            setError(err.message);
          }
        }}
      >
        <Form className='w-3/5 ml-36 flex flex-col gap-5'>
          {error && <ErrorPopup error={error} />}
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

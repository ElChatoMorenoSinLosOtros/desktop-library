import LibraryAPIService from '@api/LibraryAPI';
import ErrorPopup from '@common-components/ErrorPopup';
import GlobalForm from '@common-components/GlobalFrom';
import GlobalSubmitButton from '@common-components/GlobalSubmitButton';
import GlobalTextField from '@common-components/GlobalTextField';
import { validatePhoneNumber } from '@services/regexService';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function NewDataPersonPage() {
  const { updateUserById, getUserById } = LibraryAPIService();
  const { id } = useParams<NewDataPersonPageParams>();
  const [client, setClient] = useState<Client>({} as Client);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getUserById({ id: String(id) })
      .then(resp => {
        setClient(resp);
        setIsLoaded(true);
      })
      .catch((err: Error) => {
        throw new Error(err.message);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      {isLoaded && (
        <GlobalForm title='Person Management' subTitle='New Data'>
          <Formik
            initialValues={{
              name: `${client.name}`,
              lastName: `${client.lastName}`,
              address: `${client.address}`,
              email: `${client.email}`,
              phoneNumber: Number(client.phoneNumber),
              typeUser: `${client.typeUser}`
            }}
            enableReinitialize
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
                await updateUserById({ id: Number(id), client: values });
                navigate('/person-management');
              } catch (err) {
                if (!(err instanceof Error)) return;
                setError(err.message);
              }
            }}
          >
            <Form className='w-3/5 ml-36 flex flex-col gap-5'>
              {error && <ErrorPopup error={error} />}
              <GlobalTextField title='New Name:' name='name' />
              <GlobalTextField title='New Last Name:' name='lastName' />
              <GlobalTextField title='New Email:' name='email' type='email' />
              <GlobalTextField title='New Type:' name='typeUser' />
              <GlobalTextField
                title='New Phone Number:'
                name='phoneNumber'
                type='number'
              />
              <GlobalTextField title='New Address:' name='address' />
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

export default NewDataPersonPage;

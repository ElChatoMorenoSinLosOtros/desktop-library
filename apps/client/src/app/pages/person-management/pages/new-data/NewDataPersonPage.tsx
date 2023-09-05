import LibraryAPIService from '@api/LibraryAPI';
import GlobalForm from '@common-components/GlobalFrom';
import GlobalSubmitButton from '@common-components/GlobalSubmitButton';
import GlobalTextField from '@common-components/GlobalTextField';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function NewDataPersonPage() {
  const { updateUserById, getUserById } = LibraryAPIService();
  const { id } = useParams<NewDataPersonPageParams>();
  const [client, setClient] = useState<Client>({} as Client);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getUserById({ id: String(id) })
      .then(resp => {
        setClient(resp);
        setIsLoaded(true);
      })
      .catch((error: Error) => {
        throw new Error(error.message);
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
            onSubmit={(values: Client) => {
              updateUserById({ id: Number(id), client: values })
                .then()
                .catch((error: Error) => {
                  throw new Error(error.message);
                })
                .finally(() => {
                  navigate('/person-management');
                });
            }}
          >
            <Form className='w-3/5 ml-36 flex flex-col gap-5'>
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

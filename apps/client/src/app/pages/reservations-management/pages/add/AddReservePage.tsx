import LibraryAPIService from '@api/LibraryAPI';
import ErrorPopup from '@common-components/ErrorPopup';
import GlobalForm from '@common-components/GlobalFrom';
import GlobalSubmitButton from '@common-components/GlobalSubmitButton';
import GlobalTextField from '@common-components/GlobalTextField';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddReservePage() {
  const { createReserve } = LibraryAPIService();
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  return (
    <GlobalForm title='Reserves Management' subTitle='Add Reserve'>
      <Formik
        initialValues={{
          clientId: 0,
          materialId: 0,
          executeDate: new Date(),
          returnDate: new Date()
        }}
        onSubmit={async values => {
          try {
            if (values.returnDate < values.executeDate) {
              setError('Return date can not be before execute date');
              return;
            }
            await createReserve({
              reserve: {
                clientId: values.clientId,
                materialId: values.materialId,
                executeDate: new Date(values.executeDate).toISOString(),
                returnDate: new Date(values.returnDate).toISOString()
              }
            });
            navigate('/reservations-management');
          } catch (err) {
            if (!(err instanceof AxiosError)) return;
            const response = err as ApiError;
            setError(response.response.data.message);
          }
        }}
      >
        <Form className='w-3/5 ml-36 flex flex-col gap-5 h-2/3 justify-center mb-32'>
          {error && <ErrorPopup error={error} />}
          <GlobalTextField title='User ID:' name='clientId' type='number' />
          <GlobalTextField
            title='Material ID:'
            name='materialId'
            type='number'
          />
          <GlobalTextField
            title='Execute Date:'
            name='executeDate'
            type='date'
          />
          <GlobalTextField title='Return Date:' name='returnDate' type='date' />

          <GlobalSubmitButton className='absolute right-0 bottom-0 mb-12 mr-12'>
            Add
          </GlobalSubmitButton>
        </Form>
      </Formik>
    </GlobalForm>
  );
}

export default AddReservePage;

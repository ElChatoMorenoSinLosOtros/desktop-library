import LibraryAPIService from '@api/LibraryAPI';
import GlobalForm from '@common-components/GlobalFrom';
import GlobalSubmitButton from '@common-components/GlobalSubmitButton';
import GlobalTextField from '@common-components/GlobalTextField';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

function AddReservePage() {
  const { createReserve } = LibraryAPIService();
  const navigate = useNavigate();

  return (
    <GlobalForm title='Reserve Management' subTitle='Add Reserve'>
      <Formik
        initialValues={{
          clientId: 0,
          materialId: 0,
          reserveDate: new Date(),
          returnDate: new Date(),
          executed: false
        }}
        onSubmit={(values: ReserveWithOutID) => {
          createReserve({
            reserve: {
              clientId: values.clientId,
              materialId: values.materialId,
              reserveDate: new Date(values.reserveDate).toISOString(),
              returnDate: new Date(values.returnDate).toISOString(),
              executed: values.executed
            }
          })
            .then()
            .catch((error: Error) => {
              throw new Error(error.message);
            })
            .finally(() => {
              navigate('/reservations-management');
            });
        }}
      >
        <Form className='w-3/5 ml-36 flex flex-col gap-5'>
          <GlobalTextField title='User ID:' name='clientId' type='number' />
          <GlobalTextField
            title='Material ID:'
            name='materialId'
            type='number'
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

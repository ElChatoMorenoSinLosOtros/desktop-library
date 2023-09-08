import LibraryAPIService from '@api/LibraryAPI';
import GlobalForm from '@common-components/GlobalFrom';
import GlobalSubmitButton from '@common-components/GlobalSubmitButton';
import GlobalTextField from '@common-components/GlobalTextField';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateReservePage() {
  const { updateReserveById, getReserveById } = LibraryAPIService();
  const { id } = useParams<UpdateReservePageParams>();
  const [reserve, setReserve] = useState<Reserve>({} as Reserve);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getReserveById({ id: Number(id) })
      .then(resp => {
        setReserve(resp);
      })
      .catch((error: Error) => {
        throw new Error(error.message);
      })
      .finally(() => setIsLoaded(true));
  }, []);

  const navigate = useNavigate();

  return (
    <div className='h-full'>
      {isLoaded && (
        <GlobalForm title='Reserve Management' subTitle='Update Reserve'>
          <Formik
            initialValues={{
              reserveId: reserve.reserveId,
              clientId: Number(reserve.clientId),
              materialId: Number(reserve.materialId),
              returnDate: `${reserve.returnDate.toString().slice(0,10)}`,
              executed: reserve.executed
            }}
            enableReinitialize
            onSubmit={values => {
              updateReserveById({
                id: Number(id),
                reserve: {
                  reserveId: reserve.reserveId,
                  clientId: reserve.clientId,
                  materialId: values.materialId,
                  checkDate: reserve.checkDate,
                  returnDate: new Date(values.returnDate).toISOString(),
                  executed: reserve.executed
                }
              })
                .then()
                .catch((error: Error) => {
                  throw new Error(error.message);
                })
                .finally(() => navigate('/reservations-management'));
            }}
          >
            <Form className='w-3/5 ml-36 flex flex-col gap-5'>
              <GlobalTextField
                title='Material Id:'
                name='materialId'
                type='number'
              />
              <GlobalTextField
                title='Return Date:'
                name='returnDate'
                type='date'
              />
              <GlobalSubmitButton className='absolute bottom-0 right-0 mr-12 mb-12'>
                Update
              </GlobalSubmitButton>
            </Form>
          </Formik>
        </GlobalForm>
      )}
    </div>
  );
}

export default UpdateReservePage;

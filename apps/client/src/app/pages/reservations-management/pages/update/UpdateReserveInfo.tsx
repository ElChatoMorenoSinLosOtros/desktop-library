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
        setReserve(resp[0]);
      })
      .catch((error: Error) => {
        throw new Error(error.message);
      })
      .finally(() => setIsLoaded(true));
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      {isLoaded && (
        <GlobalForm title='Reserve Management' subTitle='Update Reserve'>
          <Formik
            initialValues={{
              reserveId: Number(reserve.reserveId),
              clientId: Number(reserve.clientId),
              materialId: Number(reserve.materialId),
              reserveDate: `${reserve.reserveDate.toString().slice(0, 10)}`,
              returned: reserve.returned ? 'true' : 'false'
            }}
            enableReinitialize
            onSubmit={values => {
              updateReserveById({
                id: Number(id),
                reserve: {
                  reserveId: values.reserveId,
                  clientId: values.clientId,
                  materialId: values.materialId,
                  reserveDate: values.reserveDate,
                  returnDate: values.reserveDate,
                  returned: JSON.parse(values.returned)
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
              <GlobalTextField title='Reserve Id:' name='reserveId' type='number' />
              <GlobalTextField
                title='ClientId:'
                name='clientId'
                type='number'
              />
              <GlobalTextField
                title='MaterialId:'
                name='materialId'
                type='number'
              />
              <GlobalTextField title='ReserveDate:' name='reserveDate' type='date' />
              <GlobalTextField
                title='Return Date:'
                name='returnDate'
                type='date'
              />
              <GlobalTextField title='Returned:' name='returned' />
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

export default UpdateReservePage;

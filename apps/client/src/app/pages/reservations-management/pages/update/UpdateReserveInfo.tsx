import LibraryAPIService from '@api/LibraryAPI';
import GlobalButton from '@common-components/GlobalButton';
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
    async function fetchData() {
      const reserveResponse = await getReserveById({ id: Number(id) });
      setReserve(reserveResponse);
      setIsLoaded(true);
    }

    fetchData();
  }, []);

  const navigate = useNavigate();

  return (
    <div className='h-full'>
      {isLoaded && (
        <GlobalForm title='Reserves Management' subTitle='Update Reserve'>
          <Formik
            initialValues={{
              reserveId: reserve.reserveId,
              clientId: Number(reserve.clientId),
              materialId: Number(reserve.materialId),
              reserveDate: `${reserve.reserveDate.toString().slice(0, 10)}`,
              executeDate: `${reserve.executeDate.toString().slice(0, 10)}`,
              returnDate: `${reserve.returnDate.toString().slice(0, 10)}`,
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
                  reserveDate: new Date(values.reserveDate).toISOString(),
                  executeDate: new Date(values.executeDate).toISOString(),
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
                title='Reserve ID:'
                name='reserveId'
                type='number'
                disabled
              />
              <GlobalTextField
                title='Client ID:'
                name='clientId'
                type='number'
              />
              <GlobalTextField
                title='Material Id:'
                name='materialId'
                type='number'
              />
              <GlobalTextField
                title='Reserve Date:'
                name='reserveDate'
                type='date'
                disabled
              />
              <GlobalTextField
                title='Execute Date:'
                name='executeDate'
                type='date'
              />
              <GlobalTextField
                title='Return Date:'
                name='returnDate'
                type='date'
              />
              <div className='absolute bottom-0 right-0 mr-12 mb-20 flex gap-5 flex-col'>
                <GlobalSubmitButton>Update</GlobalSubmitButton>
                <GlobalButton
                  onClick={() => {
                    updateReserveById({
                      id: Number(id),
                      reserve: {
                        ...reserve,
                        executed: true
                      }
                    })
                      .then()
                      .finally(() => {
                        navigate('/reservations-management');
                      });
                  }}
                  disabled={reserve.executed}
                >
                  Execute
                </GlobalButton>
              </div>
            </Form>
          </Formik>
        </GlobalForm>
      )}
    </div>
  );
}

export default UpdateReservePage;

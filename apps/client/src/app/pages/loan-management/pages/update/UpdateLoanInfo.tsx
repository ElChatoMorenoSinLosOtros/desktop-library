import LibraryAPIService from '@api/LibraryAPI';
import ErrorPopup from '@common-components/ErrorPopup';
import GlobalForm from '@common-components/GlobalFrom';
import GlobalSubmitButton from '@common-components/GlobalSubmitButton';
import GlobalTextField from '@common-components/GlobalTextField';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateReturnLoan from './components/UpdateReturnLoan';

function UpdateLoanPage() {
  const { updateLoanById, getLoanById } = LibraryAPIService();
  const [error, setError] = useState<string>('');
  const { id } = useParams<UpdateLoanPageParams>();
  const [loan, setLoan] = useState<Loan>({} as Loan);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getLoanById({ id: Number(id) })
      .then(resp => {
        setLoan(resp[0]);
      })
      .catch((err: Error) => {
        throw new Error(err.message);
      })
      .finally(() => setIsLoaded(true));
  }, []);

  const navigate = useNavigate();

  return (
    <div className='h-full'>
      {isLoaded && (
        <GlobalForm title='Loan Management' subTitle='Update Loan'>
          <Formik
            initialValues={{
              loanId: Number(loan.loanId),
              clientId: Number(loan.clientId),
              materialId: Number(loan.materialId),
              loanDate: `${loan.loanDate.toString().slice(0, 10)}`,
              returnDate: `${loan.returnDate.toString().slice(0, 10)}`,
              returned: loan.returned ? 'true' : 'false'
            }}
            enableReinitialize
            onSubmit={async values => {
              try {
                if (values.returnDate < values.loanDate) {
                  setError('Return date can not be before loan date');
                  return;
                }
                await updateLoanById({
                  loan: {
                    loanId: values.loanId,
                    clientId: values.clientId,
                    materialId: values.materialId,
                    loanDate: new Date(values.loanDate).toISOString(),
                    returnDate: new Date(values.returnDate).toISOString(),
                    returned: values.returned === 'true'
                  },
                  id: Number(id)
                });
                navigate('/loan-management');
              } catch (err) {
                if (!(err instanceof AxiosError)) return;
                const response = err as ApiError;
                setError(response.response.data.message);
              }
            }}
          >
            <Form className='w-3/5 ml-36 flex flex-col gap-5'>
              {error && <ErrorPopup error={error} />}
              <GlobalTextField
                title='Loan Id:'
                name='loanId'
                type='number'
                disabled
              />
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
              <GlobalTextField title='LoanDate:' name='loanDate' type='date' />
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
          <UpdateReturnLoan
            className='absolute left-0 bottom-0 ml-36 mb-12'
            isReturned={loan.returned}
            loanId={loan.loanId}
          />
        </GlobalForm>
      )}
    </div>
  );
}

export default UpdateLoanPage;

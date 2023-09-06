import LibraryAPIService from '@api/LibraryAPI';
import GlobalForm from '@common-components/GlobalFrom';
import GlobalSubmitButton from '@common-components/GlobalSubmitButton';
import GlobalTextField from '@common-components/GlobalTextField';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateReturnLoan from './components/UpdateReturnLoan';

function UpdateLoanPage() {
  const { updateLoanById, getLoanById } = LibraryAPIService();
  const { id } = useParams<UpdateLoanPageParams>();
  const [loan, setLoan] = useState<Loan>({} as Loan);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getLoanById({ id: Number(id) })
      .then(resp => {
        setLoan(resp[0]);
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
            onSubmit={values => {
              updateLoanById({
                id: Number(id),
                loan: {
                  loanId: Number(values.loanId),
                  clientId: Number(values.clientId),
                  materialId: Number(values.materialId),
                  loanDate: new Date(values.loanDate).toISOString(),
                  returnDate: new Date(values.returnDate).toISOString(),
                  returned: values.returned.toLowerCase() === 'true'
                }
              })
                .then()
                .catch((error: Error) => {
                  throw new Error(error.message);
                })
                .finally(() => navigate('/loan-management'));
            }}
          >
            <Form className='w-3/5 ml-36 flex flex-col gap-5'>
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

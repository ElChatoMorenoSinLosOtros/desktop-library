import LibraryAPIService from '@api/LibraryAPI';
import ErrorPopup from '@common-components/ErrorPopup';
import GlobalForm from '@common-components/GlobalFrom';
import GlobalSubmitButton from '@common-components/GlobalSubmitButton';
import GlobalTextField from '@common-components/GlobalTextField';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddLoanPage() {
  const { createLoan } = LibraryAPIService();
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  return (
    <GlobalForm title='Loan Management' subTitle='Add Loan'>
      <Formik
        initialValues={{
          clientId: 0,
          materialId: 0,
          loanDate: new Date(),
          returnDate: new Date(),
          returned: false
        }}
        onSubmit={async (values: LoanWithOutID) => {
          try {
            if (values.returnDate < values.loanDate) {
              setError('Return date can not be before loan date');
              return;
            }
            await createLoan({
              loan: {
                clientId: values.clientId,
                materialId: values.materialId,
                loanDate: new Date(values.loanDate).toISOString(),
                returnDate: new Date(values.returnDate).toISOString(),
                returned: values.returned
              }
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
          <GlobalTextField title='User ID:' name='clientId' type='number' />
          <GlobalTextField
            title='Material ID:'
            name='materialId'
            type='number'
          />
          <GlobalTextField title='Loan Date:' name='loanDate' type='date' />
          <GlobalTextField title='Return Date:' name='returnDate' type='date' />

          <GlobalSubmitButton className='absolute right-0 bottom-0 mb-12 mr-12'>
            Add
          </GlobalSubmitButton>
        </Form>
      </Formik>
    </GlobalForm>
  );
}

export default AddLoanPage;

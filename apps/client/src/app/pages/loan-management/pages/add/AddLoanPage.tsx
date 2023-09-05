import LibraryAPIService from '@api/LibraryAPI';
import GlobalForm from '@common-components/GlobalFrom';
import GlobalSubmitButton from '@common-components/GlobalSubmitButton';
import GlobalTextField from '@common-components/GlobalTextField';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

function AddLoanPage() {
  const { createLoan } = LibraryAPIService();
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
        onSubmit={(values: LoanWithOutID) => {
          createLoan({
            loan: {
              clientId: values.clientId,
              materialId: values.materialId,
              loanDate: new Date(values.loanDate).toISOString(),
              returnDate: new Date(values.returnDate).toISOString(),
              returned: values.returned
            }
          })
            .then()
            .catch((error: Error) => {
              throw new Error(error.message);
            })
            .finally(() => {
              navigate('/loan-management');
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

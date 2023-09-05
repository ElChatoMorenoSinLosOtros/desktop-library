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
          returned: false,
          adminID: 0
        }}
        onSubmit={(values: LoanWithOutID) => {
          createLoan({ loan: values })
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
          <GlobalTextField title='User ID' name='client_id' type='number' />
          <GlobalTextField
            title='Material ID'
            name='material_id'
            type='number'
          />
          <GlobalTextField title='New Date' name='new_date' type='date' />
          <GlobalTextField title='Return Date' name='return_date' type='date' />

          <GlobalSubmitButton className='absolute right-0 bottom-0 mb-12 mr-12'>
            Add
          </GlobalSubmitButton>
        </Form>
      </Formik>
    </GlobalForm>
  );
}

export default AddLoanPage;

import GlobalForm from '@common-components/GlobalFrom';
import GlobalSubmitButton from '@common-components/GlobalSubmitButton';
import GlobalTextField from '@common-components/GlobalTextField';
import { Form, Formik } from 'formik';
//import { useState } from 'react';
//import { useParams } from 'react-router-dom';

function UpdateLoanPage() {
  // Comentar lógica de obtención de datos y llamadas a API
  // const { updateLoanById, getLoanById } = LibraryAPIService();
  //const { loanId } = useParams<UpdateLoanPageParams>();
  // const [loan, setLoan] = useState<Loan>({} as Loan);
  // const [isLoaded, setIsLoaded] = useState(false);

  // To Do: Get data
  // useEffect(() => {
  //   getLoanById({ id: Number(loanId) })
  //     .then(resp => {
  //       setLoan(resp);
  //       setIsLoaded(true);
  //     })
  //     .catch((error: Error) => {
  //       throw new Error(error.message);
  //     });
  // }, []);

  // Comentar la lógica de navegación
  // const navigate = useNavigate();

  return (
    <div>
      {/* {isLoaded && ( */}
      <GlobalForm title='Loan Management' subTitle='Update Loan'>
        <Formik
          initialValues={{
            // To Do: Show values
            loanId: 1,
            clientId: 'exampleClientId',
            materialId: 'exampleMaterialId',
            loanDate: '2023-09-04',
            returnDate: '2023-09-11',
            returned: false
          }}
          enableReinitialize
          onSubmit={() => {
            // To Do: Update loan data
            // updateLoanById({ id: Number(loanId), loan: loan })
            //   .then()
            //   .catch((error: Error) => {
            //     throw new Error(error.message);
            //   });
            // To Do: Navigate to Page
            // navigate('/loan-management/update/');
          }}
        >
          <Form className='w-3/5 ml-36 flex flex-col gap-5'>
            <GlobalTextField title='Loan Id:' name='loanId' />
            <GlobalTextField title='ClientId:' name='clientId' />
            <GlobalTextField title='LoanDate:' name='loanDate' />
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
      {/* )} */}
    </div>
  );
}

export default UpdateLoanPage;


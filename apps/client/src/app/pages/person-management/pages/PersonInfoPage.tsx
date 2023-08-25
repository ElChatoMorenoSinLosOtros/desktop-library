import GlobalForm from '@common-components/GlobalFrom';
import GlobalTextField from '@common-components/GlobalTextField';
import { Form, Formik } from 'formik';

function PersonInfoPage() {
  return (
    <GlobalForm title='Person Info' subTitle='Details'>
      <Formik
        initialValues={{
          name: '',
          lastName: '',
          email: '',
          type: '',
          phone: '',
          address: ''
        }}
        onSubmit={() => {
          // TODO: Show person info - endpoint
        }}
      >
        <Form className='w-3/5 ml-36 flex flex-col gap-5'>
          <GlobalTextField title='Name:' name='name' />
          <GlobalTextField title='Last Name:' name='lastName' />
          <GlobalTextField title='Email:' name='email' type='email' />
          <GlobalTextField title='Type:' name='type' />
          <GlobalTextField title='Phone Number:' name='phone' />
          <GlobalTextField title='Address:' name='address' />
        </Form>
      </Formik>
      <div className='flex flex-col justify-center items-center ml-10 absolute top-20 right-20 h-full'>
        <div className='mb-4' style={{ marginBottom: '5rem' }}>
          <div className='font-bold text-xl mb-2'>Readed</div>
          <div className='font-russo text-6xl text-center'>10</div>
        </div>
        <div className='mb-4' style={{ marginBottom: '5rem' }}>
          <div className='font-bold text-xl mb-2'>Loans</div>
          <div className='font-russo text-6xl text-center'>5</div>
        </div>
        <div className='mb-4' style={{ marginBottom: '5rem' }}>
          <div className='font-bold text-xl mb-2'>Reservations</div>
          <div className='font-russo text-6xl text-center'>2</div>
        </div>
        <div style={{ marginBottom: '5rem' }}>
          <div className='font-bold text-xl mb-2'>Total Fine</div>
          <div className='font-russo text-6xl text-center'>0.00</div>
        </div>
      </div>
    </GlobalForm>
  );
}

export default PersonInfoPage;

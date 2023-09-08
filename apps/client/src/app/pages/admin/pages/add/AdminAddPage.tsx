import LibraryAPIService from '@api/LibraryAPI';
import GlobalForm from '@common-components/GlobalFrom';
import GlobalSubmitButton from '@common-components/GlobalSubmitButton';
import GlobalTextField from '@common-components/GlobalTextField';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionsChecked from '../components/ActionsChecked';
import AdminPermissions from '../components/AdminPermissions';

function AddAdminPage() {
  const { createAdmin } = LibraryAPIService();
  const navigate = useNavigate();
  const [actions, setActions] = useState<ActionChecked[]>(ActionsChecked);
  const [error, setError] = useState<string>('');

  return (
    <GlobalForm title='Admin Management' subTitle='Add Admin'>
      <Formik
        initialValues={{
          email: '',
          password: '',
          name: '',
          role: '',
          actions: {
            menu: []
          }
        }}
        onSubmit={(values: SubAdminWithOutId) => {
          if (values.role === 'admin') {
            setError('You can not add admin');
            return;
          }
          const uploadActions: AdminActions = {
            menu: []
          };
          uploadActions.menu = actions
            .filter(item => item.checked)
            .map(item => item.action);

          createAdmin({
            subAdmin: {
              ...values,
              actions: uploadActions
            }
          })
            .then()
            .catch((err: Error) => {
              throw new Error(err.message);
            })
            .finally(() => {
              navigate('/admin');
            });
        }}
      >
        <Form className='flex flex-col h-full pb-12 gap-16 w-full'>
          {error && (
            <div
              className=' text-white text-center font-bold rounded-lg absolute
            left-0 right-0 top-0 mt-40 flex justify-center font-roboto'
            >
              <div className='bg-red-500 px-5 py-3 rounded-xl'>{error}</div>
            </div>
          )}
          <div className='w-full gap-12 flex px-24 justify-between'>
            <GlobalTextField
              title='Email:'
              name='email'
              type='email'
              className='w-full'
            />
            <GlobalTextField
              title='Password:'
              name='password'
              type='password'
              className='w-full'
            />
          </div>
          <div className='w-full gap-12 flex px-24 justify-between'>
            <GlobalTextField title='Name:' name='name' className='w-full' />
            <GlobalTextField title='Role:' name='role' className='w-full' />
          </div>
          <div
            className='px-44 font-roboto-mono flex flex-col gap-10 justify-center
          place-items-center h-full mb-20'
          >
            <h2 className='col-span-3 text-center text-4xl font-russo'>
              Permissions
            </h2>

            <AdminPermissions actions={actions} setActions={setActions} />
          </div>

          <GlobalSubmitButton className='absolute right-0 bottom-0 mb-12 mr-12'>
            Add
          </GlobalSubmitButton>
        </Form>
      </Formik>
    </GlobalForm>
  );
}

export default AddAdminPage;
